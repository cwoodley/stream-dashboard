import dotenv from "dotenv";
dotenv.config()

import http from 'http';
import express from "express"
import path from "path"
import logger from "morgan"
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import colors from 'colors'

import routes from "./routes/index"
import dashboard from './routes/dashboard'
import update from './routes/update'
import SocketIO from 'socket.io'

import { db } from './db'
import { getAmount } from "./helpers/getDonationAmount";

const app = express();
app.server = http.createServer(app);
const io = new SocketIO(app.server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({credentials: true, origin: process.env.CORS_ORIGIN}))

app.use(function(req, res, next){
  res.io = io;
  next();
});

io.on('connect', (socket) => {
  console.log(('Client connected, sending data.'))
  retrieveData()

  socket.on('disconnect', () => {
    const time = new Date()
    console.log(colors.red('CLIENT DISCONNECT at', time.toLocaleTimeString('en-US')))
  })
})

getDonations()
setInterval(getDonations, process.env.DONATIONS_REFRESH)

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

function retrieveData() {
  sendData(db.getState())
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

function getDonations() {
  getAmount()
  .then((result) => {
    db.set('donationTotal',result).write()
    io.emit('donationTotal', result)
  })
  .catch((error) => {
    console.log(colors.red(error))
  })
}

module.exports = {app: app, server: app.server};
