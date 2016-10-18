var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render(
    'dashboard',
    {
    }
  );
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.io.emit("currentGame", req.body.currentGame);
  res.io.emit("nextGame", req.body.nextGame);
  res.io.emit("timerFinish", req.body.timerFinish)

  res.render('dashboard',{
    title : 'Dashboard',
    currentGame: req.body.currentGame,
    nextGame: req.body.nextGame,
    timeEnd: req.body.timeEnd,
    dateEnd: req.body.dateEnd,
    timerFinish: req.body.timerFinish,
  });
});

module.exports = router;
