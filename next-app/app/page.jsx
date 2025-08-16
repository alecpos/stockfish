'use client';

import { useEffect, useState } from 'react';
import Stockfish from '@lichess-org/stockfish.wasm';

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let engine;
    Stockfish().then((sf) => {
      engine = sf;
      engine.onmessage = (event) => {
        if (event.data === 'uciok') {
          setReady(true);
        }
      };
      engine.postMessage('uci');
    });
    return () => engine?.terminate();
  }, []);

  return (
    <main>
      <h1>Stockfish Trainer</h1>
      <p>{ready ? 'Engine ready' : 'Initializing engine...'}</p>
    </main>
  );
}
