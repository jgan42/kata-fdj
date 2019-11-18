'use strict';
const config = require('../config');
const { MongoClient, ObjectID } = require('mongodb');

class DatabaseService {
  async initConnexion() {
    const connexion = await MongoClient.connect(config.dbUrl, { useUnifiedTopology: true });
    this.db = connexion.db();
  }

  async getTeamsByLeagueName(search) {
    try {
      const leagues = await this._getLeaguesByName(search);
      const teamIds = leagues.reduce((ids, league) => ids.concat(league.teams), []);
      return this._getTeams(teamIds);
    } catch (e) {
      console.log('getTeamsByLeagueName Error:', e);
      throw e;
    }
  }

  async getPlayersByTeamId(teamId) {
    try {
      const team = await this._getTeam(teamId);
      const players = await this._getPlayers(team.players);
      return { name: team.name, players };
    } catch (e) {
      console.log('getPlayersByIds Error:', e);
      throw e;
    }
  }

  _getLeaguesByName(search) {
    const query = { name: new RegExp(search, 'i') };
    return this.db.collection('leagues').find(query).toArray();
  }

  _getTeam(id) {
    return this.db.collection('teams').findOne(new ObjectID(id));
  }

  _getTeams(ids) {
    const query = { _id: { $in: ids } };
    return this.db.collection('teams').find(query).toArray();
  }

  _getPlayers(ids) {
    const query = { _id: { $in: ids } };
    return this.db.collection('players').find(query).toArray();
  }
}

module.exports = new DatabaseService();