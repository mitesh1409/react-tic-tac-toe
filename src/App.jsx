import { useState } from "react";

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(selectPlayerAtStart());

  function selectPlayerAtStart() {
    return Math.floor(Math.random() * 2) ? 'X' : 'O';
  }

  function handleSquareClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[i] = currentPlayer === 'X' ? 'X' : 'O';
    setSquares(updatedSquares);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  function calculateWinner(squares) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line = 0; line < winningLines.length; line++) {
      const [ one, two, three ] = winningLines[line];

      if (squares[one] && squares[one] === squares[two] && squares[two] === squares[three]) {
        return squares[one];
      }
    }

    return null;
  }

  function restartGame() {
    // Unset all the squares.
    setSquares(Array(9).fill(null));

    // Select the player to start with.
    setCurrentPlayer(selectPlayerAtStart());
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `* Winner: ${winner} *`;
  } else {
    status = `Next Player: ${currentPlayer === 'X' ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleSquareClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleSquareClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleSquareClick(8)} />
      </div>

      <div className="restart">
        <button onClick={restartGame}>Restart</button>
      </div>
    </>
  );
}

export default Board;
