'use strict';

const logger = require('../utils/logger');
const seriesLibrary = require('../models/series-store');
const accounts = require ('./accounts.js');

const series = {
  index(request, response) {
    const seriesId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);  
    logger.debug('series id = ', seriesId);
        if (loggedInUser) {
    const viewData = {
      title: 'series',
      series: seriesLibrary.getSeries(seriesId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
    };
    response.render('series', viewData);
      }
    else response.redirect('/');
  },


  deleteGame(request, response) {
    const seriesId = request.params.id;
    const gameId = request.params.gameId;
    logger.debug(`Deleting game ${seriesId} from series ${seriesId}`);
    seriesLibrary.removeGame(seriesId, gameId);
    response.redirect('/Series/' + seriesId);
  },
  
    addGame(request, response) {
    const seriesId = request.params.id;
    const series = seriesLibrary.getSeries(seriesId);
    const uuid = require('uuid');
    const newGame = {
       id: uuid(),
      title: request.body.title,
      publisher: request.body.publisher,
      release: request.body.release,
      rating: request.body.rating,
    };
    seriesLibrary.addGame(seriesId, newGame);
    response.redirect('/series/' + seriesId);
  },
  
  
  
    updateGame(request, response) {
    const seriesId = request.params.id;
    const gameId = request.params.gameid;
    logger.debug("updating game " + gameId);
    const alterGame = {
      title: request.body.title,
      publisher: request.body.publisher,
        release: request.body.release,
      rating: request.body.rating,
    };
    seriesLibrary.editGame(seriesId, gameId, alterGame);
    response.redirect('/series/' + seriesId);
  },
  
};

module.exports = series;