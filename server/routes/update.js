import express from "express"
import * as db from 'webscaledb'
import * as path from 'path'

const router = express.Router();

const DB_NAME = path.join(process.cwd(), 'data.json')

const saveData = (label, value) => {
  db.set(label,value)
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
  for (const i in formData) {
    if (formData[i]) {
      emitters.push({label: i, content: formData[i]})
    }
  }

  /**
   * Send data to client & webascaledb
   */
  emitters.map(emitter => {
    res.io.emit(emitter.label, emitter.content)
    saveData(emitter.label, emitter.content)
  })
  
  res.redirect('./dashboard');
})

module.exports = router;
