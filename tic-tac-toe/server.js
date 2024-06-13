import express from 'express';

const app = express()
const port = 3001

import { getAccounts, createAccount, deleteAccount, updateAccount } from './src/models/accountsModel.js';
import { getPlayers, createPlayer, deletePlayer, updatePlayer } from './src/models/playersModel.js';
import { getTournaments, createTournament, deleteTournament, updateTournament } from './src/models/tournamentsModel.js';
import { getGames, createGame, deleteGame, updateGame } from './src/models/gamesModel.js';

app.use(express.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/accounts', (req, res) => {
  getAccounts()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/players', (req, res) => {
  getPlayers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/tournaments', (req, res) => {
  getTournaments()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/games', (req, res) => {
  getGames()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/accounts', (req, res) => {
  createAccount(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/players', (req, res) => {
  createPlayer(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/tournaments', (req, res) => {
  createTournament(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/games', (req, res) => {
  createGame(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/accounts/:id', (req, res) => {
  deleteAccount(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/players/:id', (req, res) => {
  deletePlayer(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/tournaments/:id', (req, res) => {
  deleteTournament(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/games/:id', (req, res) => {
  deleteGame(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/accounts/:id', (req, res) => {
  updateAccount(req.params.id, req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/players/:id', (req, res) => {
  updatePlayer(req.params.id, req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/tournaments/:id', (req, res) => {
  updateTournament(req.params.id, req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put('/games/:id', (req, res) => {
  updateGame(req.params.id, req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})