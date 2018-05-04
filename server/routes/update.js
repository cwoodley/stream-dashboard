const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {

  // res.io.emit("currentGame", 'can you hear me?', 1, 2, 'abc')
  
  res.end();
});

router.post('/', function(req, res, next) {
  const formData = req.body
  const emitters = []

  /** 
   * Converts form data into array of objects
   */
  for (var i in formData) {
    if (formData.hasOwnProperty(i)) {
      emitters.push({label: i, data: formData[i]})
    }
  }

  /**
   * Send data to client
   */
  emitters.map(emitter => {
    res.io.emit(emitter.label, emitter.data)
  })
  
  res.redirect('./dashboard');
})

module.exports = router;
