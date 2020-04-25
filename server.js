'use strict';

const express = require('express');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();
app.use(cookieParser());
const exphbs = require('express-handlebars');
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(express.static('public'));
app.use(fileUpload());
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  
  helpers:{
    formatDate: function (commentdate) {
      let d = new Date(commentdate);
      let daynum = d.getDate();
      let month = d.getMonth();
      let thisYear = d.getFullYear();
      
      let months = ['january', 'February', 'march', 
                    'April', 'May', 'June', 'July',
                    'August', 'September', 'October',
                    'November', 'December'];
      
      let monthname = months[month];
      return monthname + "" + daynum + ","+ thisYear;
    }
  }
      
  }));

const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info(`GamerCube started on port ${listener.address().port}`);
});