'use client';

import { useEffect, useState } from 'react';
import Stockfish from 'stockfish';

export default function Home() {
  const [engine, setEngine] = useState(null);
  const [ready, setReady] = useState(false);
  const [fen, setFen] = useState('startpos');
  const [bestMove, setBestMove] = useState('');

  useEffect(() => {
    let sfInstance;
    Stockfish().then((sf) => {
      sfInstance = sf;
      setEngine(sf);
      sf.onmessage = (event) => {
        if (event.data === 'uciok') {
          setReady(true);
        } else if (
          typeof event.data === 'string' &&
          event.data.startsWith('bestmove')
        ) {
          const move = event.data.split(' ')[1];
          setBestMove(move);
        }
      };
      sf.postMessage('uci');
    });
    return () => sfInstance?.terminate();
  }, []);

  const analyze = () => {
    if (!engine) return;
    setBestMove('');
    engine.postMessage('ucinewgame');
    if (fen === 'startpos') {
      engine.postMessage('position startpos');
    } else {
      engine.postMessage(`position fen ${fen}`);
    }
    engine.postMessage('go depth 10');
  };

  return (
    <main>
      <h1>Stockfish Trainer</h1>
      <p>{ready ? 'Engine ready' : 'Initializing engine...'}</p>
      {ready && (
        <>
          <label>
            FEN or "startpos":
            <input
              type="text"
              value={fen}
              onChange={(e) => setFen(e.target.value)}
            />
          </label>
          <button onClick={analyze}>Analyze</button>
          {bestMove && <p>Best move: {bestMove}</p>}
        </>
      )}
    </main>
  );
}
