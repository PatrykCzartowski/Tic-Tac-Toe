import { useState } from "react";

import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import LoginButton from "./components/LoginButton.jsx";
import CreateAccountButton from "./components/CreateAccountButton.jsx";
import LoginPanel from "./components/LoginPanel.jsx";
import RegisterPanel from "./components/RegisterPanel.jsx";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};
 
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = 
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = 
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const [loginButtonState, setLoginButtonState] = useState(false);
  const [CreateAccountButtonState, setCreateAccountButtonState] = useState(false);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  }

  const handleLoginClick = () => {
    setLoginButtonState(true);
  }

  const handleCancelLogin = () => {
    setLoginButtonState(false);
  }

  const handleCreateAccount = () => {
    setCreateAccountButtonState(true);
  }

  const handleCancelCreateAccount = () => {
    setCreateAccountButtonState(false);
  }

  return (
    <main>
      { loginButtonState && <LoginPanel onLoginCancelButton={handleCancelLogin}/> }
      <div id="buttons-containter">
        <LoginButton onLoginButtonClicked={handleLoginClick}/>
        <p className="buttons-divider"> or </p>
        <CreateAccountButton onCreateAccountButton={handleCreateAccount}/>
        { CreateAccountButtonState && <RegisterPanel onCancelCreateAccount={handleCancelCreateAccount}/>}
      </div>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (<GameOver winner={winner} onRestart={handleRestart}/>)}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
