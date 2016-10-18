var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render(
    'dashboard',
    {
      title : 'Dashboard',
    }
  );
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  res.io.emit("currentGame", req.body.currentGame);
});

module.exports = router;
