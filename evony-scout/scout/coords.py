"""Conversao pixel -> coordenada do mapa, e leitura (OCR) de textos da tela."""
from __future__ import annotations

import math
import re

import cv2
import numpy as np

try:
    import pytesseract
except ImportError:  # OCR e opcional
    pytesseract = None


def parse_coords(text: str) -> tuple[int, int] | None:
    """Extrai (x, y) de textos como 'X:512 Y:738', '512,738', '(512 738)'."""
    nums = re.findall(r"\d{1,4}", text)
    if len(nums) < 2:
        return None
    return int(nums[0]), int(nums[1])


def parse_level(text: str) -> int | None:
    m = re.search(r"(?:lv|nv|n[ií]vel|level)?\.?\s*(\d{1,2})", text, re.I)
    return int(m.group(1)) if m else None


def ocr(frame_bgr: np.ndarray, region: list[int] | None, digits_only=False) -> str:
    """OCR de uma regiao [x, y, w, h] do frame. Retorna '' se indisponivel."""
    if pytesseract is None or not region:
        return ""
    x, y, w, h = region
    H, W = frame_bgr.shape[:2]
    x, y = max(0, x), max(0, y)
    crop = frame_bgr[y:min(H, y + h), x:min(W, x + w)]
    if crop.size == 0:
        return ""
    gray = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)
    gray = cv2.resize(gray, None, fx=3, fy=3, interpolation=cv2.INTER_CUBIC)
    _, bw = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    cfg = "--psm 7"
    if digits_only:
        cfg += " -c tessedit_char_whitelist=0123456789:,XYxy "
    try:
        return pytesseract.image_to_string(bw, config=cfg).strip()
    except Exception:
        return ""


class IsoMap:
    """Mapa isometrico: converte deslocamento em pixels para tiles.

    tile_w / tile_h = largura e altura, em pixels, do losango de UM tile no
    zoom em que voce joga (calibrar uma vez; veja o README).
    Convencao: +x do mapa aponta para baixo-direita, +y para baixo-esquerda.
    Se no seu jogo for o contrario, use "swap_axes": true no config.
    """

    def __init__(self, tile_w: float, tile_h: float, swap_axes: bool = False):
        self.hw, self.hh = tile_w / 2, tile_h / 2
        self.swap = swap_axes

    def to_map(self, center_map: tuple[int, int], center_px: tuple[int, int],
               px: tuple[int, int]) -> tuple[int, int]:
        dx, dy = px[0] - center_px[0], px[1] - center_px[1]
        a = (dx / self.hw + dy / self.hh) / 2
        b = (dy / self.hh - dx / self.hw) / 2
        if self.swap:
            a, b = b, a
        return center_map[0] + round(a), center_map[1] + round(b)


def distance(a: tuple[int, int], b: tuple[int, int]) -> float:
    return math.hypot(a[0] - b[0], a[1] - b[1])
