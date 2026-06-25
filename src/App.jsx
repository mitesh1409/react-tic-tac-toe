import { useState } from 'react';

import Board from './Board';

export default function Game() {
  const [player, setPlayer] = useState('X');
  const [history, setHistory] = useState([]);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [historyMode, setHistoryMode] = useState(false);

  function handlePlay(newSquares) {
    setSquares(newSquares);
    setHistory([...history, newSquares]);
    setPlayer(player === 'X' ? 'O' : 'X');
  }

  function jumpTo(moveId) {
    setSquares(history[moveId]);
    setHistoryMode(moveId === (history.length - 1) ? false : true);
  }

  function startNewGame() {
    setPlayer('X');
    setHistory([]);
    setSquares(Array(9).fill(null));
    setHistoryMode(false);
  }

  const moves = history.map((squares, index) => {
    const description = `Go to move # ${index + 1}`;

    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board player={player} squares={squares} onPlay={handlePlay} historyMode={historyMode} />
        <div className="new-game">
          <button onClick={startNewGame}>Start a new Game</button>
        </div>
      </div>
      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}
