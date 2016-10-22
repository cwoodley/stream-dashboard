var express = require('express');
var path = require('path');
var router = express.Router();

/* GET overlay page. */
router.get('/', function(req, res, next) {

  res.render(
    'overlay',{
      title: 'Overlay'
    }

  );
});

module.exports = router;
