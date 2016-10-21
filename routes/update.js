var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  var emitters = req.body;

  for (var i in emitters) {
    if (emitters.hasOwnProperty(key)) {
      console.log('setting ' + i + " => " + emitters[i]);
      res.io.emit(i, emitters[i])
    }
  }


  res.end();
});

module.exports = router;
