'use strict';

const logger = require('../utils/logger');
const seriesStore = require ('../models/series-store');

const index = {
  index(request, response) {
    
    const seriescollections = seriesStore.getAllSeries();
    let totalgames = 0;
    for (let i in seriescollections) {
      totalgames = totalgames + seriescollections[i].games.length;
    }
    
    
    logger.info('index rendering');
     
    const viewData = {
       title: 'GamerCube',
       totalSeries: seriescollections.length,
       totalGames : totalgames,
    };
    response.render('index', viewData);
  },
};

module.exports = index;
