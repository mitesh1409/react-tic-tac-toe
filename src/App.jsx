import { useState } from "react";

function Square() {
  const [value, setValue] = useState(null);

  function markSquare() {
    setValue('X');
  }

  return (
    <button
      className="square"
      onClick={markSquare}
    >
      {value}
    </button>
  );
}

function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>

      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}

export default Board;
