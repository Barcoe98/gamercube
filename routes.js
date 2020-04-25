'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start.js');
const index = require ('./controllers/index.js');
const dashboard = require('./controllers/dashboard.js');
const gallery = require('./controllers/gallery.js');
const about = require('./controllers/about.js');
const series = require('./controllers/series.js');
const accounts = require ('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);

router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/index', index.index);
router.get('/dashboard', dashboard.index);
router.get('/gallery', gallery.index);
router.get('/about', about.index);
router.get('/series/:id', series.index);

router.get('/series/:id/deleteGame/:gameId', series.deleteGame);
router.post('/series/:id/updategame/:gameid', series.updateGame);
router.post('/series/:id/addgame', series.addGame);

router.post('/dashboard/addseries', dashboard.addSeries);
router.get('/dashboard/deleteSeries/:id',  dashboard.deleteSeries);

router.get('/about/:id', about.index);
router.post('/about/addcomment',about.addcomment);

router.post('/gallery/uploadpicture', gallery.uploadPicture);
router.get('/gallery/deleteallpictures', gallery.deleteAllPictures);
router.get('/gallery/deletepicture', gallery.deletePicture);

module.exports = router;