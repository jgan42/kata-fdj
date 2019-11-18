'use strict';
const express = require('express');
const app = express();
const config = require('./config');
const dbHelper = require('./services/database.service');

app.get('/teams', async (req, res) => {
  console.log('req.query', req.query);
  const search = req.query.leagueName || '';
  try {
    const teams = await dbHelper.getTeamsByLeagueName(search);
    res.send(teams);
  } catch (e) {
    res.status(520).send(e);
  }
});

app.get('/team-players', async (req, res) => {
  const teamId = req.query.teamId || '';
  try {
    const players = await dbHelper.getPlayersByTeamId(teamId);
    res.send(players);
  } catch (e) {
    res.status(520).send(e);
  }
});

app.listen(config.httpPort, async () => {
  await dbHelper.initConnexion();
  console.log('listening on ', config.httpPort);
});