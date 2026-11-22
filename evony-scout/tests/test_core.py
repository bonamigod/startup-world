"""Testes com imagens sinteticas (sem o jogo).  Rodar: python -m pytest tests"""
import sys
import time
from pathlib import Path

import cv2
import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from scout.coords import IsoMap, parse_coords, parse_level  # noqa: E402
from scout.detector import Detector  # noqa: E402
from scout.tracker import Tracker, is_priority  # noqa: E402


def _sprite(seed, size=48):
    rng = np.random.default_rng(seed)
    img = np.zeros((size, size, 3), np.uint8)
    for _ in range(6):
        p1 = tuple(int(v) for v in rng.integers(0, size, 2))
        p2 = tuple(int(v) for v in rng.integers(0, size, 2))
        color = tuple(int(v) for v in rng.integers(60, 255, 3))
        cv2.rectangle(img, p1, p2, color, -1)
    return img


def test_detector_finds_sprites(tmp_path):
    boss, mob = _sprite(1), _sprite(2)
    cv2.imwrite(str(tmp_path / "boss.png"), boss)
    cv2.imwrite(str(tmp_path / "monstro.png"), mob)

    rng = np.random.default_rng(0)
    frame = rng.integers(0, 60, (720, 1280, 3), dtype=np.uint8)
    places = {"boss": [(100, 200), (900, 500)], "monstro": [(400, 100)]}
    for kind, pts in places.items():
        for x, y in pts:
            frame[y:y + 48, x:x + 48] = boss if kind == "boss" else mob

    det = Detector(tmp_path, threshold=0.8)
    t0 = time.time()
    found = det.detect(frame)
    elapsed = time.time() - t0

    got = sorted((m.kind, m.x, m.y) for m in found)
    want = sorted((k, x + 24, y + 24) for k, pts in places.items() for x, y in pts)
    assert got == want
    assert elapsed < 1.0


def test_detector_downscale(tmp_path):
    cv2.imwrite(str(tmp_path / "boss.png"), _sprite(1))
    frame = np.zeros((720, 1280, 3), np.uint8)
    frame[300:348, 600:648] = _sprite(1)
    found = Detector(tmp_path, threshold=0.7, downscale=0.5).detect(frame)
    assert len(found) == 1
    assert abs(found[0].x - 624) <= 2 and abs(found[0].y - 324) <= 2


def test_iso_conversion():
    iso = IsoMap(128, 64)
    c, cpx = (500, 500), (640, 360)
    assert iso.to_map(c, cpx, (640, 360)) == (500, 500)
    assert iso.to_map(c, cpx, (704, 392)) == (501, 500)   # 1 tile baixo-direita
    assert iso.to_map(c, cpx, (576, 392)) == (500, 501)   # 1 tile baixo-esquerda
    assert iso.to_map(c, cpx, (640, 424)) == (501, 501)   # 1 tile para baixo
    assert IsoMap(128, 64, True).to_map(c, cpx, (704, 392)) == (500, 501)


def test_parsers():
    assert parse_coords("X:512 Y:738") == (512, 738)
    assert parse_coords("(12, 1034)") == (12, 1034)
    assert parse_coords("abc") is None
    assert parse_level("Lv.12") == 12
    assert parse_level("Nível 7") == 7


def test_priority_and_tracker():
    rules = [{"tipo": "boss", "nivel_min": 10}, {"tipo": "inimigo"}]
    assert is_priority("boss", 12, rules)
    assert not is_priority("boss", 5, rules)
    assert not is_priority("boss", None, rules)
    assert is_priority("inimigo", None, rules)
    assert not is_priority("monstro", 30, rules)

    tr = Tracker((500, 500), rules)
    a, new = tr.update("boss", 12, (510, 500), 0.9)
    assert new and a.priority and a.dist == 10
    _, new = tr.update("boss", 12, (511, 500), 0.9)   # mesmo alvo (erro de 1 tile)
    assert not new
    tr.update("monstro", 3, (501, 500), 0.9)
    assert [t.kind for t in tr.sorted()] == ["boss", "monstro"]


def test_server_and_uploader(tmp_path):
    import json
    import threading
    import urllib.error
    import urllib.request

    sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))
    import server as srv
    from scout.tracker import Target
    from scout.uploader import Uploader

    httpd = srv.serve(0, str(tmp_path / "t.db"), "segredo")
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{port}"

    def get(path, key="segredo"):
        req = urllib.request.Request(base + path, headers={"X-Scout-Key": key})
        return json.loads(urllib.request.urlopen(req, timeout=5).read())

    up = Uploader(base, "segredo", "ana", interval=3600)
    up.queue(Target("boss", 12, (510, 500), 10, True, 0.9))
    up.queue(Target("monstro", 3, (700, 700), 280, False, 0.9))
    assert up.flush()
    up2 = Uploader(base, "segredo", "bia", interval=3600)
    up2.queue(Target("boss", None, (511, 500), 11, False, 0.9))  # mesmo boss
    assert up2.flush()

    all_ = get("/api/targets?cx=500&cy=500")
    assert [t["kind"] for t in all_["alvos"]] == ["boss", "monstro"]
    boss = all_["alvos"][0]
    assert boss["level"] == 12 and boss["reports"] == 2 and boss["reporter"] == "bia"
    assert all_["tipos"] == ["boss", "monstro"]
    assert len(get("/api/targets?cx=500&cy=500&radius=50")["alvos"]) == 1
    assert len(get("/api/targets?level_min=10")["alvos"]) == 1
    assert len(get("/api/targets?kind=monstro")["alvos"]) == 1

    try:
        get("/api/targets", key="errada")
        assert False, "deveria recusar"
    except urllib.error.HTTPError as e:
        assert e.code == 401

    bad = Uploader(base, "errada", "x", interval=3600)
    bad.queue(Target("boss", 1, (1, 1), 0, False, 0.9))
    assert not bad.flush() and bad.pending          # fica na fila para reenviar

    assert b"Scout" in urllib.request.urlopen(base + "/", timeout=5).read()
    httpd.shutdown()
