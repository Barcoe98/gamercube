'use strict';

const logger = require('../utils/logger');
const seriesLibrary= require('../models/series-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const seriesStore = require ('../models/series-store');

const dashboard = {
  index(request, response) {
    
      const loggedInUser = accounts.getCurrentUser(request);
    
   
    const seriescollections = seriesStore.getUserSeries(loggedInUser.id)
    let totalusergames = 0;
    for (let i in seriescollections) {
      totalusergames = totalusergames + seriescollections[i].games.length;
    }
  

    logger.info('dashboard rendering');
  
    if (loggedInUser) {
      
    const viewData = {
      title: 'Dashboard',
      series: seriesLibrary.getUserSeries(loggedInUser.id),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      totalUserSeries: seriescollections.length,
      totalUserGames : totalusergames,
     
    };
    logger.info('about to render', seriesLibrary.getAllSeries());
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteSeries(request, response) {
    const seriesId = request.params.id;
    logger.debug(`Deleting Series ${seriesId}`);
    seriesLibrary.removeSeries(seriesId);
    response.redirect('/dashboard/');
  },
  
  addSeries(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newSeries= {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      genre: request.body.genre,
      games: [],
    };
    logger.debug('Creating a new Series', newSeries);
    seriesLibrary.addSeries(newSeries);
    response.redirect('/dashboard');
  },
    
};

module.exports = dashboard;