# Stockfish Trainer Next.js App

This directory contains a minimal Next.js application that loads the
Stockfish chess engine in the browser. It uses the `@lichess-org/stockfish.wasm`
package and runs the engine inside a web worker.

To try the app locally, run `npm install` followed by `npm run dev`.

## Troubleshooting

If you encounter the error "No Next.js version detected. Make sure your
package.json has 'next' in either 'dependencies' or 'devDependencies'. Also
check your Root Directory setting matches the directory of your project," ensure
you run commands inside `next-app` and have installed dependencies.
