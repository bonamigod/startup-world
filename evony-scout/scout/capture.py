"""Captura da janela do jogo (somente leitura de pixels da tela)."""
from __future__ import annotations

import sys

import mss
import numpy as np


def find_window(title_part: str) -> dict | None:
    """Area cliente da primeira janela visivel cujo titulo contem title_part
    (apenas Windows). Retorna None se nao achar."""
    if not sys.platform.startswith("win"):
        return None
    import ctypes
    from ctypes import wintypes

    user32 = ctypes.windll.user32
    try:
        user32.SetProcessDPIAware()
    except Exception:
        pass
    result: list[dict] = []

    @ctypes.WINFUNCTYPE(ctypes.c_bool, wintypes.HWND, wintypes.LPARAM)
    def cb(hwnd, _):
        if not user32.IsWindowVisible(hwnd) or user32.IsIconic(hwnd):
            return True
        buf = ctypes.create_unicode_buffer(256)
        user32.GetWindowTextW(hwnd, buf, 256)
        if title_part.lower() in buf.value.lower():
            rect = wintypes.RECT()
            user32.GetClientRect(hwnd, ctypes.byref(rect))
            pt = wintypes.POINT(0, 0)
            user32.ClientToScreen(hwnd, ctypes.byref(pt))
            if rect.right > 0 and rect.bottom > 0:
                result.append({"left": pt.x, "top": pt.y,
                               "width": rect.right, "height": rect.bottom})
                return False
        return True

    user32.EnumWindows(cb, 0)
    return result[0] if result else None


class Capture:
    def __init__(self, window_title: str = "Evony", region: list[int] | None = None):
        """region = [left, top, width, height] fixa (opcional). Sem region,
        procura a janela pelo titulo a cada frame (acompanha se voce mover)."""
        self.title = window_title
        self.region = ({"left": region[0], "top": region[1],
                        "width": region[2], "height": region[3]} if region else None)
        self.sct = mss.mss()

    def grab(self) -> np.ndarray | None:
        box = self.region or find_window(self.title)
        if box is None:
            return None
        return np.asarray(self.sct.grab(box))[:, :, :3].copy()  # BGR
