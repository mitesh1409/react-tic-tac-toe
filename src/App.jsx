function Square() {
  function markSquare() {
    console.log('markSquare is called...');
  }

  return (
    <button
      className="square"
      onClick={markSquare}
    >
      X
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
