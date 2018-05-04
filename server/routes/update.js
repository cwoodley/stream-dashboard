var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var emitters = [
    {text: "hi"}
  ]

  for (var i in emitters) {
    if (emitters.hasOwnProperty(i)) {
      console.log('sending ' + "text" + " => " + emitters[i].text);
      res.io.emit("text", emitters[i])
    }
  }


  res.end();
});

module.exports = router;
