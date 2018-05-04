require('dotenv').config()

var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var dashboard = require('./routes/dashboard');
var update = require('./routes/update');
var overlay = require('./routes/overlay');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static( path.join(__dirname, '../bower_components')));

app.use(cors({credentials: true, origin: 'http://dev.com:1234'}))

app.use(function(req, res, next){
  res.io = io;
  next();
});

io.on('connect', (socket) => console.log("client connected:",socket.id))

app.use('/', routes);
app.use('/update', update);
app.use('/overlay', overlay);
app.use('/dashboard', dashboard);
app.use('/dashboard/build', express.static(path.join(__dirname, '../client/dashboard/build')));
app.use('/themes', express.static(path.join(__dirname, '../client/overlay/themes')));


// app.use('/dashboard', express.static(__dirname + '/views/dashboard.html'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = {app: app, server: server};
