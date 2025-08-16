# Stockfish Trainer Next.js App

This directory contains a minimal Next.js application that loads the
Stockfish chess engine in the browser. It uses the `stockfish` npm
package and runs the engine inside a web worker.

The main page lets you enter a FEN string and request an engine search.
After analysing to depth 10, the app displays the best move returned by
Stockfish.

To try the app locally, run `npm install` followed by `npm run dev`.
