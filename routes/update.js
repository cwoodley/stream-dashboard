var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {

  var emitters = req.body;

  for(var i=0; i < emitters.length; i++) {
    console.log('firing: ' + emitters[i].emitter);
    res.io.emit(emitters[i].emitter, emitters[i].data);
  }

  res.end();
});

module.exports = router;
