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
      return this._getTeamsByIds(teamIds);
    } catch (e) {
      console.log('getTeamsByLeagueName Error:', e);
      throw e;
    }
  }

  async getPlayersByIds(stringList) {
    try {
      const playerIds = stringList.split(',').map(id => new ObjectID(id));
      console.log('playerIds', playerIds);
      const query = { _id: { $in: playerIds } };
      return this.db.collection('players').find(query).toArray();
    } catch (e) {
      console.log('getPlayersByIds Error:', e);
      throw e;
    }
  }

  _getLeaguesByName(search) {
    const query = { name: new RegExp(search, 'i') };
    return this.db.collection('leagues').find(query).toArray();
  }

  _getTeamsByIds(ids) {
    const query = { _id: { $in: ids } };
    console.log('ids', ids);
    return this.db.collection('teams').find(query).toArray();
  }
}

module.exports = new DatabaseService();