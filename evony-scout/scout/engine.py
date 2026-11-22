"""Pipeline de um frame: detectar -> ler nivel -> converter coordenada -> registrar."""
from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from .coords import IsoMap, ocr, parse_coords, parse_level
from .detector import Detector, Match
from .tracker import Target, Tracker

ROOT = Path(__file__).resolve().parent.parent


def load_config(path: str | Path | None = None) -> dict:
    path = Path(path) if path else ROOT / "config.json"
    if not path.exists():
        path = ROOT / "config.example.json"
    return json.loads(path.read_text(encoding="utf-8"))


class Engine:
    def __init__(self, cfg: dict):
        self.cfg = cfg
        d = cfg["deteccao"]
        self.detector = Detector(ROOT / "templates", d["limiar"],
                                 tuple(d["escalas"]), d["reducao"])
        m = cfg["mapa"]
        self.iso = IsoMap(m["tile_largura_px"], m["tile_altura_px"],
                          m.get("inverter_eixos", False))
        self.tracker = Tracker(tuple(cfg["minha_cidade"]), cfg["prioridades"])
        self.center_map: tuple[int, int] | None = None

    def process(self, frame: np.ndarray, center_map: tuple[int, int] | None = None
                ) -> list[tuple[Match, Target, bool]]:
        """Retorna [(match, alvo, e_novo)] dos alvos visiveis neste frame.

        center_map: coordenada do centro da tela. Se None, tenta ler por OCR
        da regiao configurada; se falhar, reaproveita a ultima leitura.
        """
        m = self.cfg["mapa"]
        if center_map is None:
            center_map = parse_coords(ocr(frame, m.get("regiao_coordenadas"), True))
        if center_map is not None:
            self.center_map = center_map
        if self.center_map is None:
            return []

        h, w = frame.shape[:2]
        center_px = tuple(m.get("centro_px") or (w // 2, h // 2))
        lab = self.cfg["deteccao"].get("rotulo_nivel")  # [dx, dy, w, h] relativo ao alvo

        out = []
        for match in self.detector.detect(frame):
            level = None
            if lab:
                level = parse_level(ocr(frame, [match.x + lab[0], match.y + lab[1],
                                                lab[2], lab[3]]))
            pos = self.iso.to_map(self.center_map, center_px, (match.x, match.y))
            target, new = self.tracker.update(match.kind, level, pos, match.score)
            out.append((match, target, new))
        self.tracker.prune()
        return out
