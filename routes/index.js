var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Block = mongoose.model('blocks');

/* GET home page. */
router.get('/', function(req, res, next) {
  Block.find(function(err, blocks){
    console.log(blocks)
    res.render(
      'index',
      {title : 'Dashboard', blocks : blocks}
    );
  });
});

module.exports = router;
