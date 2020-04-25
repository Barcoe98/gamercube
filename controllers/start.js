'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const seriesStore = require ('../models/series-store');
const usersStore = require ('../models/user-store');
const pictureStore = require ('../models/picture-store');

const start = {
  index(request, response) {
    
    const usercollections = usersStore.getAllUsers();
    const picturecollections = pictureStore.getAlbum();
    const seriescollections = seriesStore.getAllSeries();
    let totalgames = 0;
    let avggames = 0;
    for (let i in seriescollections) {
      totalgames = totalgames + seriescollections[i].games.length;
      avggames = totalgames / seriescollections.length;
      
    }

      const loggedInUser = accounts.getCurrentUser(request);  
    logger.info('start rendering');
     if (loggedInUser) {
       
    const viewData = {
      title: 'GamerCube',
       fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
       totalSeries: seriescollections.length,
       totalGames : totalgames,
       totalSignUps : usercollections.length,
       avgGames: avggames,
       //totalPictures: picturecollections.length
    };
    response.render('start', viewData);
      }
    else response.redirect('/');
  },
};

module.exports = start;
