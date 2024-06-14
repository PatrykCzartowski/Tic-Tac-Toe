import { useState, useEffect } from 'react';

export default function UserPanel({ onUserPanelCancelButton, userId }) {
  
    const [isChangeInfoClicked, setIsChangeInfoClicked] = useState(false);
    const [isDeleteAccountClicked, setIsDeleteAccountClicked] = useState(false);
    const [isJoinTournamentClicked, setIsJoinTournamentClicked] = useState(false);
    const [isSignOutFromTournamentClicked, setIsSignOutFromTournamentClicked] = useState(false);

    const [player, setPlayer] = useState(null);
    const [tournaments, setTournaments] = useState(null);
    const [games, setGames] = useState(null);

    function getPlayerById(userId) {
        fetch(`http://localhost:3001/players/${userId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setPlayer(data);
        });
    }

    function getTournamentsById(UserId) {
        fetch(`http://localhost:3001/tournaments/${userId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTournaments(data);
        });
    }

    function getGamesById(UserId) {
        fetch(`http://localhost:3001/games/${userId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setGames(data);
        });
    }

    useEffect(() => {
        getPlayerById(userId);
      }, []);

    return (
    <div id="user-panel-background">
        <div id="user-panel">
            <h2>User Panel</h2>
            <h3>Player Info:</h3>
            <ul id="user-info">
                <li>name: {player.name}</li>
                <li>surname: {player.surname}</li>
                <li>ranking: {player.ranking}</li>
            </ul>
            <button>Change info</button>
            <div class="table-box">
                <h3>My Games:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Game ID</th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {games && games.map(game => (
                            <tr>
                                <td>{game.id}</td>
                                <td>{game.id_player1}</td>
                                <td>{game.id_player2}</td>
                                <td>{game.result}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div class="table-box">
                <h3>MY Tournaments:</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Tournament ID</th>
                            <th>Name</th>
                            <th>Prize</th>
                            <th>is active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tournaments && tournaments.map(tournament => (
                            <tr>
                                <td>{tournament.id}</td>
                                <td>{tournament.name}</td>
                                <td>{tournament.prize}</td>
                                <td>{tournament.is_active}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div class="user-buttons">
                    <button>Join Tournament</button>
                    <button>Sign out from Tournament</button>
                </div>
            </div>
        <button>delete account</button>
        <button onClick={onUserPanelCancelButton}>Exit panel</button>
        </div>
    </div>
  );
}