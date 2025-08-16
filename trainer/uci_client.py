"""Simple UCI client for Stockfish engine.

This module starts the Stockfish binary and exposes basic methods to send
commands using the Universal Chess Interface (UCI) protocol. It also provides a
helper to limit engine strength via the ``UCI_Elo`` option.
"""

from __future__ import annotations

import subprocess
import threading
from pathlib import Path
from queue import Queue
from typing import Optional


class StockfishEngine:
    """Minimal wrapper around the Stockfish chess engine."""

    def __init__(self, path: Optional[str] = None, elo: Optional[int] = None):
        binary = Path(path) if path else Path("stockfish/src/stockfish")
        self.process = subprocess.Popen(
            [str(binary)],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            universal_newlines=True,
            bufsize=1,
        )
        self._queue: Queue[str] = Queue()
        threading.Thread(target=self._reader, daemon=True).start()
        self.send("uci")
        self._wait_for("uciok")
        self.send("isready")
        self._wait_for("readyok")
        if elo is not None:
            self.set_elo(elo)

    def _reader(self) -> None:
        for line in self.process.stdout:
            self._queue.put(line.strip())

    def _wait_for(self, token: str) -> None:
        while True:
            if self._queue.get() == token:
                return

    def send(self, command: str) -> None:
        self.process.stdin.write(command + "\n")
        self.process.stdin.flush()

    def set_elo(self, elo: int) -> None:
        self.send("setoption name UCI_LimitStrength value true")
        self.send(f"setoption name UCI_Elo value {elo}")

    def position(self, fen: str) -> None:
        self.send(f"position fen {fen}")

    def go(self, movetime: int = 1000) -> str:
        self.send(f"go movetime {movetime}")
        while True:
            line = self._queue.get()
            if line.startswith("bestmove"):
                return line.split()[1]

    def quit(self) -> None:
        self.send("quit")
        self.process.wait()
