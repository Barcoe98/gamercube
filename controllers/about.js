'use strict';

const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const commentsLibrary = require ('../models/comments-store.js');
const uuid = require('uuid');


const about = {
 index(request, response) {
   
  const loggedInUser = accounts.getCurrentUser(request);  
  logger.info('about rendering');
     if (loggedInUser) {
     const viewData = {
      title: 'about Series',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        comments: commentsLibrary.getAllComments(),
    };
  response.render('about', viewData);
  logger.info('about to render', commentsLibrary.getAllComments());
      }
    else response.redirect('/');
},
    addcomment(request, response) {
    const now = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newComment = {
      id: uuid(),
      userid: loggedInUser.id,
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      comment: request.body.comment,
      now: request.body.now,
    };
    logger.debug('Creating a new Comment', newComment);
    commentsLibrary.addComment(newComment);
    response.redirect('/about');
  },
    
};

module.exports = about;