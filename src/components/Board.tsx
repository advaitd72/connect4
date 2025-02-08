import React, { useState } from "react";

import Slot from "./Slot";

const Board = () => {
  const [board, setBoard] = useState<string[][]>([
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ]);
  const [currPlayer, setCurrPlayer] = useState("X");
  const [oppPlayer, setOppPlayer] = useState("O");
  const [gameOver, setgameOver] = useState(false);

  const updateBoard = (row: number, column: number, currPlayer: string) => {
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[row][column] = currPlayer;
      return newBoard;
    });

    //temp TODO
    return null;
  };

  const checkWin = (row: number, col: number, currPlayer: string): boolean => {
    const rows = board.length;
    const cols = board[0].length;

    const directions = [
      [0, 1], // Right
      [1, 0], // Down
      [1, 1], // Diagonal Down-Right
      [1, -1], // Diagonal Down-Left
    ];

    for (let [dr, dc] of directions) {
      let count = 1;

      // Check in both directions
      for (let sign of [-1, 1]) {
        let r = row + dr * sign;
        let c = col + dc * sign;

        while (r >= 0 && r < rows && c >= 0 && c < cols) {
          if (board[r][c] === currPlayer) {
            count++;
            if (count === 4) return true; // Found sequence of 4
            r += dr * sign;
            c += dc * sign;
          } else {
            break;
          }
        }
      }
    }
    return false; // No sequence of 4 found
  };

  const handleClick = (e: any) => {
    //I have the column where user has clicked
    const column = e.target.getAttribute("data-x");
    if (!column) {
      return;
    }

    //logic to find row and column of slot to add new token
    let row = board.findIndex((rowArr) => {
      return rowArr[column] !== "";
    });
    if (row === -1) {
      row = board.length - 1;
    } else if (row === 0) {
      return;
    } else {
      row = row - 1; //go up on row of the found row
    }
    updateBoard(row, column, currPlayer);
    const didPlayerWin = checkWin(row, Number(column), currPlayer);
    console.log(didPlayerWin);
    setgameOver(didPlayerWin);

    // Swap players
    const currPlayerCopy = currPlayer;
    setCurrPlayer(oppPlayer);
    setOppPlayer(currPlayerCopy);
  };

  const resetGame = () => {
    setBoard(() => [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
    ]);
    setgameOver(false);
  };

  return (
    <>
      <div className="subTitle">
        {gameOver ? (
          <h2
            className={`playerDisplay ${oppPlayer === "X" ? "red" : "yellow"}`}
          >
            {oppPlayer === "X" ? "Red won!" : "Yellow won!"}
          </h2>
        ) : (
          <h2
            className={`playerDisplay ${currPlayer === "X" ? "red" : "yellow"}`}
          >
            {currPlayer === "X" ? "Red's move" : "Yellow's move"}
          </h2>
        )}
        <button onClick={resetGame}>Reset</button>
      </div>
      <div id="board" onClick={gameOver ? () => {} : handleClick}>
        {board.map((row, i) => {
          return row.map((slotToken, j) => (
            <Slot key={`${i}${j}`} token={slotToken} x={j} y={i} />
          ));
        })}
      </div>
    </>
  );
};

export default Board;
