"""Deteccao de alvos por template matching (OpenCV).

Cada template e um recorte PNG feito pelo proprio usuario a partir da tela
dele (veja tools/recortar_template.py). O nome do arquivo define o tipo do
alvo:  templates/<tipo>.png   ou   templates/<tipo>__<variacao>.png
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path

import cv2
import numpy as np


@dataclass
class Match:
    kind: str      # tipo do alvo (nome do template)
    score: float   # 0..1
    x: int         # centro, em pixels do frame
    y: int
    w: int
    h: int


class Detector:
    def __init__(self, templates_dir: str | Path, threshold: float = 0.80,
                 scales: tuple[float, ...] = (1.0,), downscale: float = 1.0):
        """
        scales:    escalas testadas para cada template (zoom do mapa diferente
                   do zoom em que o recorte foi feito).
        downscale: reduz frame e templates antes de comparar (0.5 = 4x mais
                   rapido, com alguma perda de precisao).
        """
        self.threshold = threshold
        self.downscale = downscale
        self.templates: list[tuple[str, np.ndarray]] = []
        for path in sorted(Path(templates_dir).glob("*.png")):
            img = cv2.imread(str(path), cv2.IMREAD_GRAYSCALE)
            if img is None:
                continue
            kind = path.stem.split("__")[0]
            for s in scales:
                f = s * downscale
                t = img if f == 1.0 else cv2.resize(
                    img, None, fx=f, fy=f, interpolation=cv2.INTER_AREA)
                if t.shape[0] >= 8 and t.shape[1] >= 8:
                    self.templates.append((kind, t))

    def detect(self, frame_bgr: np.ndarray) -> list[Match]:
        gray = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2GRAY)
        d = self.downscale
        if d != 1.0:
            gray = cv2.resize(gray, None, fx=d, fy=d, interpolation=cv2.INTER_AREA)

        found: list[Match] = []
        for kind, t in self.templates:
            th, tw = t.shape
            if th > gray.shape[0] or tw > gray.shape[1]:
                continue
            res = cv2.matchTemplate(gray, t, cv2.TM_CCOEFF_NORMED)
            ys, xs = np.where(res >= self.threshold)
            for x, y in zip(xs, ys):
                found.append(Match(kind, float(res[y, x]),
                                   int((x + tw / 2) / d), int((y + th / 2) / d),
                                   int(tw / d), int(th / d)))
        return _nms(found)


def _nms(matches: list[Match]) -> list[Match]:
    """Remove deteccoes sobrepostas, mantendo a de maior score."""
    kept: list[Match] = []
    for m in sorted(matches, key=lambda m: -m.score):
        if all(abs(m.x - k.x) > min(m.w, k.w) / 2 or
               abs(m.y - k.y) > min(m.h, k.h) / 2 for k in kept):
            kept.append(m)
    return kept
