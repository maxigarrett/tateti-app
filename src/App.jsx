import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
const TURNS = {
  X: "x",
  O: "o",
};
const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  //null es que no hay ganador,false es que hay empate
  const [winner, setWinner] = useState(null);
  const restarGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  };

  //si estan todas las casillas llenas pero no hay ganador
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const checkWinner = (boardToCheck) => {
    //revisamos todas las combinaciones ganadoras para ver si X u O gano
    for (let combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    //si no hay ganador
    return null;
  };

  const updateBoard = (idx) => {
    //obtenemos el nuevo turn cada un clic si es 'X o O'
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //hacemos una copia del estado y la acualizamos con lo que haga clic y traiga X o O
    const newBoard = [...board];

    //si no existe agregamos. si ay existe solo que actualice con lo que ya habia
    if (!newBoard[idx] || !winner) newBoard[idx] = turn;
    else setBoard(newBoard);

    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      console.log(newWinner);
    } //ha hacer: chequear empate y que tire false
    else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

    // forma mas simple de hacerlo
    // turn === TURNS.X ? setTurn(TURNS.O) : setTurn(TURNS.X);
  };

  return (
    <main className="board">
      <h1>tic tac toe</h1>
      <section className="game">
        {board.map((_, idx) => {
          return (
            <Square key={idx} idx={idx} updateBoard={updateBoard}>
              {board[idx]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>{winner === false ? "Empate" : "Gano"}</h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
              {!winner && <Square className="square-empate">🤬</Square>}
            </header>

            <button onClick={restarGame}> restar</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
