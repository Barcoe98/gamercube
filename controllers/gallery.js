'use strict';

const logger = require('../utils/logger');
const accounts = require('./accounts.js');
const pictureStore = require('../models/picture-store.js');

const gallery = {
  index(request, response) {
    logger.info('gallery rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'PictureStore gallery',
      user: loggedInUser,
      album: pictureStore.getAlbum(loggedInUser.id),
    };
    response.render('gallery', viewData);
  },

  uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/gallery');
    });
  },
  
    deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/gallery');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/gallery');
  },
  
};

module.exports = gallery;