"""Lista de alvos conhecidos + regras de prioridade."""
from __future__ import annotations

import csv
import time
from dataclasses import dataclass, field

from .coords import distance


@dataclass
class Target:
    kind: str
    level: int | None
    pos: tuple[int, int]
    dist: float
    priority: bool
    score: float
    first_seen: float = field(default_factory=time.time)
    last_seen: float = field(default_factory=time.time)

    @property
    def key(self):
        return (self.kind, self.pos)


def is_priority(kind: str, level: int | None, rules: list[dict]) -> bool:
    """Regra: {"tipo": "boss", "nivel_min": 10, "nivel_max": 15} (niveis opcionais)."""
    for r in rules:
        if r.get("tipo") not in (kind, "*"):
            continue
        lo, hi = r.get("nivel_min"), r.get("nivel_max")
        if lo is None and hi is None:
            return True
        if level is None:
            continue
        if (lo is None or level >= lo) and (hi is None or level <= hi):
            return True
    return False


class Tracker:
    def __init__(self, my_city: tuple[int, int], rules: list[dict],
                 merge_radius: int = 1, expire_s: float = 1800):
        self.my_city = my_city
        self.rules = rules
        self.merge_radius = merge_radius
        self.expire_s = expire_s
        self.targets: dict[tuple, Target] = {}

    def update(self, kind: str, level: int | None, pos: tuple[int, int],
               score: float) -> tuple[Target, bool]:
        """Registra uma deteccao. Retorna (alvo, e_novo)."""
        now = time.time()
        for t in self.targets.values():
            if t.kind == kind and distance(t.pos, pos) <= self.merge_radius:
                t.last_seen = now
                t.score = max(t.score, score)
                if level is not None and t.level is None:
                    t.level = level
                    t.priority = is_priority(kind, level, self.rules)
                return t, False
        t = Target(kind, level, pos, distance(pos, self.my_city),
                   is_priority(kind, level, self.rules), score)
        self.targets[t.key] = t
        return t, True

    def prune(self):
        now = time.time()
        for k in [k for k, t in self.targets.items()
                  if now - t.last_seen > self.expire_s]:
            del self.targets[k]

    def sorted(self) -> list[Target]:
        """Prioridades primeiro, depois os mais proximos da sua cidade."""
        return sorted(self.targets.values(), key=lambda t: (not t.priority, t.dist))

    def export_csv(self, path: str):
        with open(path, "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["tipo", "nivel", "x", "y", "distancia", "prioridade", "visto"])
            for t in self.sorted():
                w.writerow([t.kind, t.level or "", t.pos[0], t.pos[1],
                            f"{t.dist:.0f}", "sim" if t.priority else "",
                            time.strftime("%H:%M:%S", time.localtime(t.last_seen))])
