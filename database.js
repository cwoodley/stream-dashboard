var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Block = new Schema(
  {
    name : String,
    position: String
  }
);

mongoose.model('blocks', Block);

mongoose.connect('mongodb://localhost/node-block');
