'use strict';
const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('series', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    
    if (user.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
    {    
       user.id = uuid();
       userstore.addUser(user);
       logger.info(`registering ${user.email}`);
    response.redirect('/');
    }
    else {
       response.redirect('/start');
      }
    
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email) && userstore.getUserByPassword(request.body.password);
    if (user) {
      response.cookie('series', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/start');
    } else {
      response.redirect('/login');
      //response.alert('Sorry You have entered the wrong details, Please Try Again!!')
       //title: 'Login to the Service'
    }
  },

  getCurrentUser (request) {
    const userEmail = request.cookies.series;
    return userstore.getUserByEmail(userEmail);
  }
}

module.exports = accounts;