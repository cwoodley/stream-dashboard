var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  // res.io.emit("currentGame", req.body.currentGame);
  // res.io.emit("nextGame", req.body.nextGame);
  // res.io.emit("timerFinish", req.body.timerFinish)
  // res.io.emit("tickerItems", req.body.tickerItem)

  console.log(req.body);

  res.end();
});

module.exports = router;
