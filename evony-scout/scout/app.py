"""Janela do Scout: lista de alvos ao lado do jogo, com alerta sonoro.

Uso:  python -m scout.app
O programa apenas LE a tela. Ele nao clica, nao digita e nao move o mapa:
voce arrasta o mapa no jogo e ele registra o que aparecer.
"""
from __future__ import annotations

import sys
import threading
import time
import tkinter as tk
from tkinter import filedialog, ttk

from .capture import Capture
from .engine import Engine, load_config


def beep():
    if sys.platform.startswith("win"):
        import winsound
        winsound.Beep(1200, 180)
        winsound.Beep(1600, 260)
    else:
        print("\a", end="", flush=True)


class App:
    def __init__(self):
        self.cfg = load_config()
        self.engine = Engine(self.cfg)
        self.capture = Capture(self.cfg["janela"]["titulo"], self.cfg["janela"].get("regiao"))
        self.running = True
        self.status = "iniciando..."
        self.lock = threading.Lock()

        self.root = tk.Tk()
        self.root.title("Evony Scout")
        self.root.geometry("460x600")
        self.root.attributes("-topmost", True)

        top = ttk.Frame(self.root, padding=6)
        top.pack(fill="x")
        self.btn = ttk.Button(top, text="Pausar", command=self.toggle)
        self.btn.pack(side="left")
        ttk.Button(top, text="Exportar CSV", command=self.export).pack(side="left", padx=4)
        ttk.Button(top, text="Limpar", command=self.clear).pack(side="left")

        # Centro manual (caso o OCR das coordenadas nao esteja configurado)
        man = ttk.Frame(self.root, padding=(6, 0))
        man.pack(fill="x")
        ttk.Label(man, text="Centro da tela X,Y (manual):").pack(side="left")
        self.manual = ttk.Entry(man, width=12)
        self.manual.pack(side="left", padx=4)

        cols = ("tipo", "nv", "coord", "dist", "visto")
        self.tree = ttk.Treeview(self.root, columns=cols, show="headings")
        for c, t, w in zip(cols, ("Alvo", "Nv", "Coordenada", "Dist.", "Visto"),
                           (130, 40, 110, 60, 80)):
            self.tree.heading(c, text=t)
            self.tree.column(c, width=w, anchor="center")
        self.tree.tag_configure("prio", background="#ffd54a", foreground="#000")
        self.tree.pack(fill="both", expand=True, padx=6, pady=6)
        self.tree.bind("<Double-1>", self.copy_coord)

        self.status_var = tk.StringVar()
        ttk.Label(self.root, textvariable=self.status_var, padding=6).pack(fill="x")

        threading.Thread(target=self.loop, daemon=True).start()
        self.refresh()
        self.root.protocol("WM_DELETE_WINDOW", self.close)
        self.root.mainloop()

    # ---- thread de captura -------------------------------------------------
    def loop(self):
        interval = 1.0 / self.cfg["deteccao"].get("fps", 4)
        while True:
            t0 = time.time()
            if self.running:
                try:
                    self.step()
                except Exception as e:  # nao derruba o loop
                    self.status = f"erro: {e}"
            time.sleep(max(0.0, interval - (time.time() - t0)))

    def step(self):
        frame = self.capture.grab()
        if frame is None:
            self.status = "janela do jogo nao encontrada (abra o Evony)"
            return
        from .coords import parse_coords
        manual = parse_coords(self.manual_text)
        t0 = time.time()
        with self.lock:
            results = self.engine.process(frame, manual)
            center = self.engine.center_map
        ms = (time.time() - t0) * 1000
        if center is None:
            self.status = "sem coordenada do centro: configure o OCR ou digite X,Y acima"
            return
        if any(new and tgt.priority for _, tgt, new in results):
            beep()
        self.status = f"centro {center[0]},{center[1]} | {len(results)} na tela | {ms:.0f} ms"

    # ---- UI ----------------------------------------------------------------
    manual_text = ""

    def refresh(self):
        self.manual_text = self.manual.get()
        with self.lock:
            targets = self.engine.tracker.sorted()
        sel = self.tree.selection()
        self.tree.delete(*self.tree.get_children())
        for t in targets:
            iid = f"{t.kind}|{t.pos[0]}|{t.pos[1]}"
            self.tree.insert("", "end", iid=iid, tags=("prio",) if t.priority else (),
                             values=(("★ " if t.priority else "") + t.kind,
                                     t.level or "?", f"{t.pos[0]}, {t.pos[1]}",
                                     f"{t.dist:.0f}",
                                     time.strftime("%H:%M:%S", time.localtime(t.last_seen))))
        for s in sel:
            if self.tree.exists(s):
                self.tree.selection_add(s)
        self.status_var.set(self.status + f" | {len(targets)} alvos")
        self.root.after(500, self.refresh)

    def copy_coord(self, _):
        sel = self.tree.selection()
        if sel:
            _, x, y = sel[0].split("|")
            self.root.clipboard_clear()
            self.root.clipboard_append(f"{x},{y}")
            self.status = f"coordenada {x},{y} copiada"

    def toggle(self):
        self.running = not self.running
        self.btn.config(text="Pausar" if self.running else "Continuar")

    def clear(self):
        with self.lock:
            self.engine.tracker.targets.clear()

    def export(self):
        path = filedialog.asksaveasfilename(defaultextension=".csv",
                                            initialfile="alvos.csv")
        if path:
            with self.lock:
                self.engine.tracker.export_csv(path)

    def close(self):
        self.root.destroy()


if __name__ == "__main__":
    App()
