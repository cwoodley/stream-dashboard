require('dotenv').config()

import express from "express"
import path from "path"
import logger from "morgan"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'

import routes from "./routes/index"
import dashboard from './routes/dashboard'
import update from './routes/update'

import * as db from 'webscaledb'

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);

const DB_NAME = path.join(process.cwd(), 'data.json')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static( path.join(__dirname, '../bower_components')));

app.use(cors({credentials: true, origin: 'http://cale.localdev:1234'}))

function retrieveData(store) {
  if (!store) {
    return
  }

  db.restore(store, () => {
    sendData(db.get())
  })
}

function sendData(data) {
  const emitters = []

  for (const i in data) {
    if (data[i]) {
      emitters.push({label: i, content: data[i]})
    }
  }

  emitters.map(emitter => {
    io.emit(emitter.label, emitter.content)
  })
}

app.use(function(req, res, next){
  res.io = io;
  next();
});

io.on('connect', (socket) => {
  retrieveData(DB_NAME)
})

app.use('/', routes);
app.use('/update', update);
app.use('/dashboard', dashboard);

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
