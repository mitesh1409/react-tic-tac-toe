import { useState } from 'react';

import Square from './Square';

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

function Board({ player, squares, onPlay, historyMode }) {
  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares) || historyMode) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = player;

    onPlay(newSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${player}`;

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onClick={() => handleSquareClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onClick={() => handleSquareClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onClick={() => handleSquareClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
