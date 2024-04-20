import React, { useState } from 'react';
import style from '../src/TicTacToe.css'

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (board[index] === '' && winner === null) {
      const updatedBoard = [...board];
      updatedBoard[index] = currentPlayer;
      setBoard(updatedBoard);
      checkWinner(updatedBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell !== '')) {
      setWinner('tie');
    }
  };

  const renderCell = (index) => {
    return (
      <div
        className={`cell ${winner !== null ? 'disabled' : ''}`}
        onClick={() => handleCellClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div className="tic-tac-toe">
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner !== null && (
        <div className="result">
          {winner === 'tie' ? 'It\'s a tie!' : `Player ${winner} wins!`}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;