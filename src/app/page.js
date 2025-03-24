"use client";
import { useState } from "react";

function Square({value, onClick}) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  )
}

function Board({squares, xIsNext, onPlay}) {
 
  function onSquareClick(idx) {
    if(squares[idx] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[idx] = xIsNext ? "X" : "O";
    onPlay(newSquares);
  }                                                               /*if statement to check if square has already been slected | if(true) return, if(false) continue 
                                                                    squares.slice to create a current copy of the array, update selected square based on idx number, 
                                                                    update xIsNext to opposite of previous state(true/false), update squares with new value added */
  const winner =calculateWinner(squares);

  return (
  <>
    {winner ? 
    (<p>Winner is: {winner}</p>) : 
    (<p>Next Player: {xIsNext ? "X" : "O"}</p>)
    }
    <div className="board-row">
    <Square value={squares[0]} onClick={() => onSquareClick(0)} />    
    <Square value={squares[1]} onClick={() => onSquareClick(1)} />
    <Square value={squares[2]} onClick={() => onSquareClick(2)} />
    </div>
    <div className="board-row">
    <Square value={squares[3]} onClick={() => onSquareClick(3)} />
    <Square value={squares[4]} onClick={() => onSquareClick(4)} />
    <Square value={squares[5]} onClick={() => onSquareClick(5)} />
    </div>
    <div className="board-row">
    <Square value={squares[6]} onClick={() => onSquareClick(6)} />
    <Square value={squares[7]} onClick={() => onSquareClick(7)} />
    <Square value={squares[8]} onClick={() => onSquareClick(8)} />
    </div>
  </>
  )
}                                                    /* is there a winner? show winner, if not show whos turn is next,
                                                        set the values of each square to a unique squares variable based on idx number in array (0-8) */

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}                                               /* determine idx's that create 3 in a row, deconstruct arrays using for statement, then use if statement to check 1: there is 
                                                   a value at idx a 2: check a=b and b=c, return squares[idx] to show winner, either x or o, return null if no winner*/

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const move = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move # " + move;
    } else {
      description = "Go to start";
    }
    return (
    <li key = {move + Math.random()}>
      <button onClick={() => jumpTo(move)}>{description}</button>  
    </li>
    );
  });
  
  return (
    <div className="game">
      <h1>TIC-TAC-TOE</h1>
      <div className="game-board">
      <Board squares = {currentSquares} xIsNext={xIsNext} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </div>
  );
}