"""Servidor central da alianca: recebe avistamentos dos Scouts e oferece busca.

Sem dependencias (so a biblioteca padrao do Python).

Uso:
    set SCOUT_KEY=uma-senha-da-alianca      (Linux/Mac: export SCOUT_KEY=...)
    python server/server.py --port 8000

Pagina de busca: http://<ip-do-servidor>:8000/
"""
from __future__ import annotations

import argparse
import json
import math
import os
import sqlite3
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

HERE = Path(__file__).resolve().parent
MERGE_RADIUS = 1          # avistamentos do mesmo tipo a ate 1 tile = mesmo alvo
MAX_BODY = 256 * 1024


class Store:
    def __init__(self, path: str):
        self.db = sqlite3.connect(path, check_same_thread=False)
        self.db.row_factory = sqlite3.Row
        self.lock = threading.Lock()
        self.db.execute("""CREATE TABLE IF NOT EXISTS targets(
            id INTEGER PRIMARY KEY, kind TEXT NOT NULL, level INTEGER,
            x INTEGER NOT NULL, y INTEGER NOT NULL,
            first_seen REAL NOT NULL, last_seen REAL NOT NULL,
            reporter TEXT, reports INTEGER NOT NULL DEFAULT 1)""")
        self.db.execute("CREATE INDEX IF NOT EXISTS ix_seen ON targets(last_seen)")
        self.db.commit()

    def add(self, items: list[dict], now: float | None = None) -> int:
        now = now or time.time()
        n = 0
        with self.lock:
            for it in items:
                try:
                    kind = str(it["kind"])[:40]
                    x, y = int(it["x"]), int(it["y"])
                    level = int(it["level"]) if it.get("level") is not None else None
                except (KeyError, TypeError, ValueError):
                    continue
                reporter = str(it.get("reporter") or "")[:40]
                row = self.db.execute(
                    "SELECT id, level FROM targets WHERE kind=? AND "
                    "x BETWEEN ? AND ? AND y BETWEEN ? AND ? "
                    "ORDER BY last_seen DESC LIMIT 1",
                    (kind, x - MERGE_RADIUS, x + MERGE_RADIUS,
                     y - MERGE_RADIUS, y + MERGE_RADIUS)).fetchone()
                if row:
                    self.db.execute(
                        "UPDATE targets SET last_seen=?, reporter=?, "
                        "reports=reports+1, level=COALESCE(?, level) WHERE id=?",
                        (now, reporter, level, row["id"]))
                else:
                    self.db.execute(
                        "INSERT INTO targets(kind, level, x, y, first_seen, "
                        "last_seen, reporter) VALUES(?,?,?,?,?,?,?)",
                        (kind, level, x, y, now, now, reporter))
                n += 1
            self.db.commit()
        return n

    def search(self, kind=None, level_min=None, level_max=None, cx=None, cy=None,
               radius=None, max_age_min=60, limit=500) -> list[dict]:
        q = "SELECT * FROM targets WHERE last_seen >= ?"
        args: list = [time.time() - max_age_min * 60]
        if kind:
            q += " AND kind LIKE ?"
            args.append(f"%{kind}%")
        if level_min is not None:
            q += " AND level >= ?"
            args.append(level_min)
        if level_max is not None:
            q += " AND level <= ?"
            args.append(level_max)
        with self.lock:
            rows = [dict(r) for r in self.db.execute(q, args)]
        now = time.time()
        for r in rows:
            r["age_s"] = int(now - r["last_seen"])
            r["dist"] = (round(math.hypot(r["x"] - cx, r["y"] - cy), 1)
                         if cx is not None and cy is not None else None)
        if radius is not None and cx is not None and cy is not None:
            rows = [r for r in rows if r["dist"] <= radius]
        rows.sort(key=lambda r: (r["dist"] if r["dist"] is not None else 0, r["age_s"]))
        return rows[:limit]

    def kinds(self) -> list[str]:
        with self.lock:
            return [r[0] for r in self.db.execute(
                "SELECT DISTINCT kind FROM targets ORDER BY kind")]


def _num(qs, name, cast=int):
    try:
        return cast(qs[name][0]) if qs.get(name, [""])[0] != "" else None
    except ValueError:
        return None


def make_handler(store: Store, key: str):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *a):
            pass

        def _send(self, code, body, ctype="application/json"):
            data = body if isinstance(body, bytes) else json.dumps(body).encode()
            self.send_response(code)
            self.send_header("Content-Type", ctype + "; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)

        def _authed(self):
            if key and self.headers.get("X-Scout-Key") != key:
                self._send(401, {"erro": "chave invalida"})
                return False
            return True

        def do_GET(self):
            u = urlparse(self.path)
            if u.path == "/":
                return self._send(200, (HERE / "index.html").read_bytes(), "text/html")
            if u.path == "/api/targets":
                if not self._authed():
                    return
                qs = parse_qs(u.query)
                return self._send(200, {
                    "tipos": store.kinds(),
                    "alvos": store.search(
                        kind=qs.get("kind", [""])[0] or None,
                        level_min=_num(qs, "level_min"), level_max=_num(qs, "level_max"),
                        cx=_num(qs, "cx"), cy=_num(qs, "cy"),
                        radius=_num(qs, "radius", float),
                        max_age_min=_num(qs, "max_age_min", float) or 60)})
            self._send(404, {"erro": "nao encontrado"})

        def do_POST(self):
            if urlparse(self.path).path != "/api/sightings":
                return self._send(404, {"erro": "nao encontrado"})
            if not self._authed():
                return
            n = int(self.headers.get("Content-Length") or 0)
            if n <= 0 or n > MAX_BODY:
                return self._send(413, {"erro": "tamanho invalido"})
            try:
                items = json.loads(self.rfile.read(n))
                assert isinstance(items, list)
            except Exception:
                return self._send(400, {"erro": "json invalido"})
            self._send(200, {"gravados": store.add(items[:1000])})

    return Handler


def serve(port: int, db: str, key: str) -> ThreadingHTTPServer:
    return ThreadingHTTPServer(("0.0.0.0", port), make_handler(Store(db), key))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--port", type=int, default=8000)
    ap.add_argument("--db", default=str(HERE / "scout.db"))
    a = ap.parse_args()
    key = os.environ.get("SCOUT_KEY", "")
    if not key:
        print("AVISO: SCOUT_KEY nao definida; qualquer pessoa com o endereco "
              "podera ler e gravar.")
    print(f"Servidor em http://0.0.0.0:{a.port}/")
    serve(a.port, a.db, key).serve_forever()
