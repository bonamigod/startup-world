"""Envia os alvos vistos para o servidor da alianca (opcional)."""
from __future__ import annotations

import json
import threading
import time
import urllib.request

from .tracker import Target

RESEND_S = 60   # reenvia um alvo ainda visivel no maximo 1x por minuto


class Uploader:
    def __init__(self, url: str, key: str = "", reporter: str = "", interval: float = 5):
        self.url = url.rstrip("/") + "/api/sightings"
        self.key, self.reporter, self.interval = key, reporter, interval
        self.pending: dict[tuple, dict] = {}
        self.sent_at: dict[tuple, float] = {}
        self.lock = threading.Lock()
        self.last_error = ""
        threading.Thread(target=self._loop, daemon=True).start()

    def queue(self, t: Target):
        now = time.time()
        with self.lock:
            # reenvia tambem quando o nivel passou a ser conhecido
            if now - self.sent_at.get(t.key, 0) < RESEND_S and \
                    self.pending.get(t.key, {}).get("level") == t.level:
                return
            self.pending[t.key] = {"kind": t.kind, "level": t.level, "x": t.pos[0],
                                   "y": t.pos[1], "reporter": self.reporter}
            self.sent_at[t.key] = now

    def flush(self) -> bool:
        with self.lock:
            batch, self.pending = self.pending, {}
        if not batch:
            return True
        req = urllib.request.Request(
            self.url, json.dumps(list(batch.values())).encode(),
            {"Content-Type": "application/json", "X-Scout-Key": self.key})
        try:
            urllib.request.urlopen(req, timeout=5).read()
            self.last_error = ""
            return True
        except Exception as e:
            self.last_error = str(e)
            with self.lock:            # devolve para tentar de novo
                for k, v in batch.items():
                    self.pending.setdefault(k, v)
            return False

    def _loop(self):
        while True:
            time.sleep(self.interval)
            self.flush()
