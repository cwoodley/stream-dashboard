import express from "express"
import * as db from 'webscaledb'
import * as path from 'path'

const router = express.Router();

const DB_NAME = path.join(process.cwd(), 'data.json')

function saveData(data) {
  db.backup(DB_NAME)
}

router.get('/', function(req, res, next) {  
  res.end();
});

router.post('/', function(req, res, next) {
  const formData = req.body
  const emitters = []

  /** 
   * Converts form data into array of objects
   */
  for (var i in formData) {
    if (formData[i]) {
      emitters.push({label: i, data: formData[i]})
    }
  }

  /**
   * Send data to client & webascaledb
   */
  emitters.map(emitter => {
    res.io.emit(emitter.label, emitter.data)
    
    saveData(db.set(emitter.label, emitter.data))
    console.log(emitter.label,emitter.data);

    console.log("sending", emitter.label, emitter.data);
  })
  
  res.redirect('./dashboard');
})

module.exports = router;
