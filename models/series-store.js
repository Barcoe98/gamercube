'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const seriesLibrary = {

  store: new JsonStore('./models/series-store.json', { seriesCollection: [] }),
  collection: 'seriesCollection',

  getAllSeries() {
    return this.store.findAll(this.collection);
  },

  getSeries(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addSeries(series) {
    this.store.add(this.collection, series);
  },

  removeSeries(id) {
    const series = this.getSeries(id);
    this.store.remove(this.collection, series);
  },

  removeAllSeries(id) {
    this.store.removeAll(this.collection);
  },

  addGame(id, game) {
    const series = this.getSeries(id);
    series.games.push(game);
  },

  removeGame(id, gameId) {
    const series = this.getSeries(id);
    const games = series.games;
    _.remove(games, { id: gameId});
  },
  
    editGame(id, gameId, gameDetails) {
    const series = this.getSeries(id);
    const games = series.games;
    const thepos = games.findIndex(field=> field.id === gameId);
    games[thepos].title=gameDetails.title;
    games[thepos].publisher=gameDetails.publisher;
    games[thepos].release=gameDetails.release;
    games[thepos].rating=gameDetails.rating;
  },
  
    getUserSeries(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  
};

module.exports = seriesLibrary;