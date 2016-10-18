var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  // console.log(req.body)
  res.io.emit("socketToMe", req.body.currentGame);
});

module.exports = router;
