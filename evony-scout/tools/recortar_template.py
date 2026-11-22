"""Cria um template a partir da sua tela.

Uso:  python tools/recortar_template.py boss
Captura a janela do jogo, voce arrasta um retangulo em volta do alvo e
aperta ENTER. Salva em templates/boss.png (ou boss__2.png, boss__3.png...).
Recorte so o corpo do monstro, sem o rotulo de nivel e com pouco fundo.
"""
import sys
from pathlib import Path

import cv2

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from scout.capture import Capture  # noqa: E402
from scout.engine import load_config  # noqa: E402


def main():
    if len(sys.argv) < 2:
        sys.exit("uso: python tools/recortar_template.py <tipo>")
    kind = sys.argv[1]
    cfg = load_config()
    frame = Capture(cfg["janela"]["titulo"], cfg["janela"].get("regiao")).grab()
    if frame is None:
        sys.exit("janela do jogo nao encontrada")
    x, y, w, h = cv2.selectROI("Selecione o alvo e aperte ENTER", frame)
    cv2.destroyAllWindows()
    if w == 0 or h == 0:
        sys.exit("nada selecionado")
    out = ROOT / "templates" / f"{kind}.png"
    n = 2
    while out.exists():
        out = ROOT / "templates" / f"{kind}__{n}.png"
        n += 1
    cv2.imwrite(str(out), frame[y:y + h, x:x + w])
    print(f"salvo: {out}  ({w}x{h}px)")


if __name__ == "__main__":
    main()
