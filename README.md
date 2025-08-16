## Stockfish Training App

This repository contains a personal chess training tool powered by the official
Stockfish engine.

### Engine wrapper

A minimal UCI client is available in `trainer/uci_client.py`. It can start the
engine, set up positions and limit strength via the `UCI_Elo` option.

Run it with:

```bash
python -m trainer.uci_client
```

Ensure a compiled Stockfish binary exists at `stockfish/src/stockfish` or
provide the path when creating `StockfishEngine`.

### Web interface

A starter Next.js app lives in `next-app`. It loads the Stockfish engine in the
browser through a WebAssembly build and serves as the base for a training UI.
Run `npm install` and `npm run dev` inside that directory to start the server.
