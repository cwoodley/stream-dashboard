var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Block = mongoose.model('blocks');

router.get('/', function(req, res) {

  Block.find(function(err, blocks){
    // console.log(blocks)
    res.render(
      'dashboard',
      {title : 'Dashboard', blocks : blocks}
    );
  });
});

router.post('/', function(req, res) {
  new Block({name : req.body.name})
  .save(function(err, block) {
    // console.log(block)
    res.redirect('/dashboard');
  });
});

router.get('/block/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Block.findOne(query, function(err, block){
    console.log('rendering ' + block.name)
    res.redirect('/dashboard');
    // res.render(
    //   'block',
    //   {title : 'Block - ' + superhero.name, superhero : superhero}
    // );
  });
});

router.put('/block/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name, position: req.body.position};
  var options = {new: true};
  Block.findOneAndUpdate(query, update, options, function(err, block){
    console.log('updating ' + block.name)
    res.redirect('/dashboard');
  });
});

router.delete('/block/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Block.findOneAndRemove(query, function(err, block){
    console.log('deleting ' + block.name)
    res.redirect('/dashboard');
  });
});

router.post('/', function(req, res) {
  console.log(req.body.name);
  res.redirect('/dashboard');
});

module.exports = router;
