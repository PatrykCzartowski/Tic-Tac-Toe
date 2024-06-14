import { useState, useEffect } from 'react';
import sha256 from 'crypto-js/sha256';

export default function AdminPanel({ onAdminPanelCancelButton }) {

    const [accounts, setAccounts] = useState();
    const [players, setPlayers] = useState();
    const [games, setGames] = useState();
    const [tournaments, setTournaments] = useState();
    const [playersInTournaments, setPlayersInTournaments] = useState();

    const [isAddAccountClicked, setIsAddAccountClicked] = useState(false);
    const [isAddPlayerClicked, setIsAddPlayerClicked] = useState(false);
    const [isAddGameClicked, setIsAddGameClicked] = useState(false);
    const [isAddTournamentClicked, setIsAddTournamentClicked] = useState(false);
    const [isAddPlayerInTournamentClicked, setIsAddPlayerInTournamentClicked] = useState(false);
    const [isUpdateAccountClicked, setIsUpdateAccountClicked] = useState(false);
    const [isUpdatePlayerClicked, setIsUpdatePlayerClicked] = useState(false);
    const [isUpdateGameClicked, setIsUpdateGameClicked] = useState(false);
    const [isUpdateTournamentClicked, setIsUpdateTournamentClicked] = useState(false);
    const [isUpdatePlayerInTournamentClicked, setIsUpdatePlayerInTournamentClicked] = useState(false);
    const [isDeleteAccountClicked, setIsDeleteAccountClicked] = useState(false);
    const [isDeletePlayerClicked, setIsDeletePlayerClicked] = useState(false);
    const [isDeleteGameClicked, setIsDeleteGameClicked] = useState(false);
    const [isDeleteTournamentClicked, setIsDeleteTournamentClicked] = useState(false);
    const [isDeletePlayerInTournamentClicked, setIsDeletePlayerInTournamentClicked] = useState(false);

    function generateSalt() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 5; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    function createAccount(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const password = sha256(event.target[1].value).toString();
        const passwd_salt = generateSalt();
        const is_admin = event.target[2].value;;

        fetch('http://localhost:3001/accounts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, passwd_salt, is_admin })
        })
        .then(response => {
            if (response.status === 200) {
                setIsAddAccountClicked(false);
            }
        });
    }

    function createPlayer(event) {
        event.preventDefault();
        const name = event.target[0].value;
        const surname = event.target[1].value;
        const ranking = event.target[2].value;
        const id_account = event.target[3].value;
        fetch('http://localhost:3001/players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, ranking, id_account })
        })
        .then(response => {
            if (response.status === 200) {
                setIsAddPlayerClicked(false);
            }
        });
    }

    function createGame(event) {
        event.preventDefault();
        const id_player1 = event.target[0].value;
        const id_player2 = event.target[1].value;
        const id_tournament = event.target[2].value;
        const result = event.target[3].value;
        fetch('http://localhost:3001/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_player1, id_player2, id_tournament, result })
        })
        .then(response => {
            if (response.status === 200) {
                setIsAddGameClicked(false);
            }
        });
    }

    function createTournament(event) {
        event.preventDefault();
        const name = event.target[0].value;
        const prize = event.target[1].value;
        const is_active = event.target[2].value;
        fetch('http://localhost:3001/tournaments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, prize, is_active })
        })
        .then(response => {
            if (response.status === 200) {
                setIsAddTournamentClicked(false);
            }
        });
    }

    function createPlayerInTournament(event) {
        event.preventDefault();
        const id_player = event.target[0].value;
        const id_tournament = event.target[1].value;
        fetch('http://localhost:3001/tournament_has_players', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_player, id_tournament })
        })
        .then(response => {
            if (response.status === 200) {
                setIsAddPlayerInTournamentClicked(false);
            }
        });
    }

    function deleteAccount(event) {
        event.preventDefault();
        const id = event.target[0].value;
        fetch(`http://localhost:3001/accounts/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                setIsDeleteAccountClicked(false);
            }
        });
    }

    function deletePlayer(event) {
        event.preventDefault();
        const id = event.target[0].value;
        fetch(`http://localhost:3001/players/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                setIsDeletePlayerClicked(false);
            }
        });
    }

    function deleteGame(event) {
        event.preventDefault();
        const id = event.target[0].value;
        fetch(`http://localhost:3001/games/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Game deleted');
            }
        });
    }

    function deleteTournament(event) {
        event.preventDefault();
        const id = event.target[0].value;
        fetch(`http://localhost:3001/tournaments/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                setIsDeleteTournamentClicked(false);
            }
        });
    }

    function deletePlayerInTournament(event) {
        event.preventDefault();
        const id = event.target[0].value;
        fetch(`http://localhost:3001/tournament_has_players/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.status === 200) {
                setIsDeletePlayerInTournamentClicked(false);
            }
        });
    }

    function updateAccount(event) {
        event.preventDefault();
        const id = event.target[0].value;
        const username = event.target[1].value;
        const password = sha256(event.target[2].value).toString();
        const passwd_salt = generateSalt();
        const is_admin = event.target[3].value;
        fetch(`http://localhost:3001/accounts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, passwd_salt, is_admin })
        })
        .then(response => {
            if (response.status === 200) {
                setIsUpdateAccountClicked(false);
            }
        });
    }

    function updatePlayer(event) {
        event.preventDefault();
        const id = event.target[0].value;
        const name = event.target[1].value;
        const surname = event.target[2].value;
        const ranking = event.target[3].value;
        const id_account = event.target[4].value;
        fetch(`http://localhost:3001/players/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, ranking, id_account })
        })
        .then(response => {
            if (response.status === 200) {
                setIsUpdatePlayerClicked(false);
            }
        });
    }

    function updateGame(event) {
        event.preventDefault();
        const id = event.target[0].value;
        const id_player1 = event.target[1].value;
        const id_player2 = event.target[2].value;
        const id_tournament = event.target[3].value;
        const result = event.target[4].value;
        fetch(`http://localhost:3001/games/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_player1, id_player2, id_tournament, result })
        })
        .then(response => {
            if (response.status === 200) {
                setIsUpdateGameClicked(false);
            }
        });
    }

    function updateTournament(event) {
        event.preventDefault();
        const id = event.target[0].value;
        const name = event.target[1].value;
        const prize = event.target[2].value;
        const is_active = event.target[3].value;
        fetch(`http://localhost:3001/tournaments/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, prize, is_active })
        })
        .then(response => {
            if (response.status === 200) {
                setIsDeleteTournamentClicked(false);
            }
        });
    }

    function updatePlayerInTournament(event) {
        event.preventDefault();
        const id = event.target[0].value;
        const id_player = event.target[1].value;
        const id_tournament = event.target[2].value;
        fetch(`http://localhost:3001/tournament_has_players/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_player, id_tournament })
        })
        .then(response => {
            if (response.status === 200) {
                setIsUpdatePlayerInTournamentClicked(false);
            }
        });
    }

    function getAccounts() {
        fetch('http://localhost:3001/accounts')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setAccounts(data);
        });
    }

    function getPlayers() {
        fetch('http://localhost:3001/players')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setPlayers(data);
        });
    }

    function getGames() {
        fetch('http://localhost:3001/games')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setGames(data);
        });
    }

    function getTournaments() {
        fetch('http://localhost:3001/tournaments')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTournaments(data);
        });
    }

    function getT_has_P() {
        fetch('http://localhost:3001/tournament_has_players')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setPlayersInTournaments(data);
        });
    }

    const handleAddAccount = () => {
        setIsAddAccountClicked(true);
    }

    const handleAddPlayer = () => {
        setIsAddPlayerClicked(true);
    }

    const handleAddGame = () => {
        setIsAddGameClicked(true);
    }

    const handleAddTournament = () => {
        setIsAddTournamentClicked(true);
    }

    const handleAddPlayerInTournament = () => {
        setIsAddPlayerInTournamentClicked(true);
    }

    const handleUpdateAccount = () => {
        setIsUpdateAccountClicked(true);
    }

    const handleUpdatePlayer = () => {
        setIsUpdatePlayerClicked(true);
    }

    const handleUpdateGame = () => {
        setIsUpdateGameClicked(true);
    }

    const handleUpdateTournament = () => {
        setIsUpdateTournamentClicked(true);
    }

    const handleUpdatePlayerInTournament = () => {
        setIsUpdatePlayerInTournamentClicked(true);
    }

    const handleDeleteAccount = () => {
        setIsDeleteAccountClicked(true);
    }

    const handleDeletePlayer = () => {
        setIsDeletePlayerClicked(true);
    }

    const handleDeleteGame = () => {
        setIsDeleteGameClicked(true);
    }

    const handleDeleteTournament = () => {
        setIsDeleteTournamentClicked(true);
    }

    const handleDeletePlayerInTournament = () => {
        setIsDeletePlayerInTournamentClicked(true);
    }

    useEffect(() => {
        getAccounts();
        getPlayers();
        getGames();
        getTournaments();
        getT_has_P();
      }, []);

    return (
        <div id="admin-panel-background">
            <div id="admin-panel">
                <h2>Admin Panel</h2>

                <div id="admin-panel-tables">
                    <div className="table-box">
                        <h3>Accounts</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className="th-first">Id</th>
                                    <th>Username</th>
                                    <th className="th-last">Is Admin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts && accounts.map(account => 
                                    <tr key={account.id}>
                                        <td>{account.id}</td>
                                        <td>{account.username}</td>
                                        <td>{account.is_admin.toString()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p>number of Accounts: {accounts && accounts.length}</p>
                        {isAddAccountClicked &&
                            <form onSubmit={createAccount}>
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required />
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                                <label htmlFor="is_admin">Is Admin</label>
                                <input type="checkbox" id="is_admin" name="is_admin" />
                                <button type="submit">Add Account</button>
                            </form>
                        }
                        {isUpdateAccountClicked && 
                            <form onSubmit={updateAccount}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required />
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required />
                                <label htmlFor="is_admin">Is Admin</label>
                                <input type="checkbox" id="is_admin" name="is_admin" />
                                <button type="submit">Update Account</button>
                            </form>
                        }
                        {isDeleteAccountClicked && 
                            <form onSubmit={deleteAccount}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <button type="submit">Delete Account</button>
                            </form>
                        }
                        <div className="admin-buttons">
                            <button className="admin-button" onClick={handleAddAccount}>Add Account</button>
                            <button className="admin-button" onClick={handleUpdateAccount}>Update Account</button>
                            <button className="admin-button" onClick={handleDeleteAccount}> Delete Account</button>
                        </div>
                    </div>
                    <div className="table-box">
                        <h3>Players</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th className="th-last">Ranking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players && players.map(player => 
                                    <tr key={player.id}>
                                        <td>{player.id}</td>
                                        <td>{player.name}</td>
                                        <td>{player.surname}</td>
                                        <td>{player.ranking}</td>
                                    </tr>
                                )}
                            </tbody>
                            
                        </table>
                        <p>number of Players: {players && players.length}</p>
                        {isAddPlayerClicked && 
                            <form onSubmit={createPlayer}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                                <label htmlFor="surname">Surname</label>
                                <input type="text" id="surname" name="surname" required />
                                <label htmlFor="ranking">Ranking</label>
                                <input type="number" id="ranking" name="ranking" required />
                                <label htmlFor="id_account">Account id</label>
                                <input type="number" id="id_account" name="id_account" required />
                                <button type="submit">Add Player</button>
                            </form>
                        }
                        {isUpdatePlayerClicked && 
                            <form onSubmit={updatePlayer}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                                <label htmlFor="surname">Surname</label>
                                <input type="text" id="surname" name="surname" required />
                                <label htmlFor="ranking">Ranking</label>
                                <input type="number" id="ranking" name="ranking" required />
                                <label htmlFor="id_account">Account id</label>
                                <input type="number" id="id_account" name="id_account" required />
                                <button type="submit">Update Player</button>
                            </form>
                        }
                        {isDeletePlayerClicked && 
                            <form onSubmit={deletePlayer}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <button type="submit">Delete Player</button>
                            </form>
                        }
                        <div className="admin-buttons">
                            <button className="admin-button" onClick={handleAddPlayer}>Add Player</button>
                            <button className="admin-button" onClick={handleUpdatePlayer}>Update Player</button>
                            <button className="admin-button"onClick={handleDeletePlayer}>Delete Player</button>
                        </div>
                    </div>
                    <div className="table-box">
                        <h3>Games</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Player 1</th>
                                    <th>Player 2</th>
                                    <th>Tournament id</th>
                                    <th className="th-last">Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {games && games.map(game => 
                                    <tr key={game.id}>
                                        <td>{game.id}</td>
                                        <td>{game.id_player1}</td>
                                        <td>{game.id_player2}</td>
                                        <td>{game.id_tournament}</td>
                                        <td>{game.result}</td>
                                    </tr>
                                )}
                            </tbody>
                            
                        </table>
                        <p>number of Games: {games && games.length}</p>
                        {isAddGameClicked && 
                            <form onSubmit={createGame}>
                                <label htmlFor="id_player1">Player 1</label>
                                <input type="number" id="id_player1" name="id_player1" required />
                                <label htmlFor="id_player2">Player 2</label>
                                <input type="number" id="id_player2" name="id_player2" required />
                                <label htmlFor="id_tournament">Tournament id</label>
                                <input type="number" id="id_tournament" name="id_tournament" required />
                                <label htmlFor="result">Result</label>
                                <input type="text" id="result" name="result" required />
                                <button type="submit">Add Game</button>
                            </form>
                        }
                        {isUpdateGameClicked && 
                            <form onSubmit={updateGame}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <label htmlFor="id_player1">Player 1</label>
                                <input type="number" id="id_player1" name="id_player1" required />
                                <label htmlFor="id_player2">Player 2</label>
                                <input type="number" id="id_player2" name="id_player2" required />
                                <label htmlFor="id_tournament">Tournament id</label>
                                <input type="number" id="id_tournament" name="id_tournament" required />
                                <label htmlFor="result">Result</label>
                                <input type="text" id="result" name="result" required />
                                <button type="submit">Update Game</button>
                            </form>
                        }
                        {isDeleteGameClicked && 
                            <form onSubmit={deleteGame}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <button type="submit">Delete Game</button>
                            </form>
                        }
                        <div className="admin-buttons">
                            <button className="admin-button" onClick={handleAddGame}>Add Game</button>
                            <button className="admin-button" onClick={handleUpdateGame}>Update Game</button>
                            <button className="admin-button" onClick={handleDeleteGame}>Delete Game</button>
                        </div>
                    </div>
                    <div className="table-box">
                        <h3>Tournaments</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Prize</th>
                                    <th className="th-last">is active</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tournaments && tournaments.map(tournament => 
                                    <tr key={tournament.id}>
                                        <td>{tournament.id}</td>
                                        <td>{tournament.name}</td>
                                        <td>{tournament.prize.toString()}</td>
                                        <td>{tournament.is_active.toString()}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p>number of Tournaments: {tournaments && tournaments.length}</p>
                        {isAddTournamentClicked && 
                            <form onSubmit={createTournament}>
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                                <label htmlFor="prize">Prize</label>
                                <input type="number" id="prize" name="prize" required />
                                <label htmlFor="is_active">Is Active</label>
                                <input type="checkbox" id="is_active" name="is_active" />
                                <button type="submit">Add Tournament</button>
                            </form>
                        }
                        {isUpdateTournamentClicked && 
                            <form onSubmit={updateTournament}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required />
                                <label htmlFor="prize">Prize</label>
                                <input type="number" id="prize" name="prize" required />
                                <label htmlFor="is_active">Is Active</label>
                                <input type="checkbox" id="is_active" name="is_active" />
                                <button type="submit">Update Tournament</button>
                            </form>
                        }
                        {isDeleteTournamentClicked && 
                            <form onSubmit={deleteTournament}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <button type="submit">Delete Tournament</button>
                            </form>
                        }
                        <div className="admin-buttons">
                            <button className="admin-button" onClick={handleAddTournament}>Add Tournament</button>
                            <button className="admin-button"onClick={handleUpdateTournament}>Update Tournament</button>
                            <button className="admin-button" onClick={handleDeleteTournament}>Delete Tournament</button>
                        </div>
                    </div>
                    <div className="table-box">
                        <h3>Players in Tournaments</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className="th-first">Id</th>
                                    <th>Player id</th>
                                    <th>Tournament id</th>
                                    <th className="th-last">Ranking</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playersInTournaments && playersInTournaments.map(playerInTournament =>
                                    <tr key={playerInTournament.id}>
                                        <td>{playerInTournament.id}</td>
                                        <td>{playerInTournament.id_player}</td>
                                        <td>{playerInTournament.id_tournament}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <p>number of Players in Tournaments: {playersInTournaments && playersInTournaments.length}</p>
                        {isAddPlayerInTournamentClicked && 
                            <form onSubmit={createPlayerInTournament}>
                                <label htmlFor="id_player">Player id</label>
                                <input type="number" id="id_player" name="id_player" required />
                                <label htmlFor="id_tournament">Tournament id</label>
                                <input type="number" id="id_tournament" name="id_tournament" required />
                                <button type="submit">Add Player to Tournament</button>
                            </form>
                        }
                        {isUpdatePlayerInTournamentClicked && 
                            <form onSubmit={updatePlayerInTournament}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <label htmlFor="id_player">Player id</label>
                                <input type="number" id="id_player" name="id_player" required />
                                <label htmlFor="id_tournament">Tournament id</label>
                                <input type="number" id="id_tournament" name="id_tournament" required />
                                <button type="submit">Update Player in Tournament</button>
                            </form>
                        }
                        {isDeletePlayerInTournamentClicked && 
                            <form onSubmit={deletePlayerInTournament}>
                                <label htmlFor="id">Id</label>
                                <input type="number" id="id" name="id" required />
                                <button type="submit">Delete Player from Tournament</button>
                            </form>
                        }
                        <div className="admin-buttons">
                            <button className="admin-button" onClick={handleAddPlayerInTournament}>Add Player to Tournament</button>
                            <button className="admin-button" onClick={handleUpdatePlayerInTournament}>Update Player in Tournament</button>
                            <button className="admin-button" onClick={handleDeletePlayerInTournament}>Delete Player from Tournament</button>
                        </div>
                    </div>
                </div>
                <button id="cancel-button" onClick={() => onAdminPanelCancelButton()}>Exit panel</button>
            </div>
        </div>
    );
}