import express from "express"
import * as db from 'webscaledb'
import * as path from 'path'

const router = express.Router();

const DB_NAME = path.join(process.cwd(), 'data.json')

const saveData = (name, value) => {
  db.set(name,value)
  db.backup(DB_NAME)
  console.log('saving:',`${name}: ${value}`)
}

router.get('/', function(req, res, next) {  
  res.end();
});

router.post('/', function(req, res, next) {
  const formData = req.body
  const emitting = []

  for (const i in formData) {
    if (!formData[i].value) {
      return
    }
    
    console.log('emitting =>', `${formData[i].name}: ${formData[i].value}`)
    res.io.emit(formData[i].name, formData[i].value)
    saveData(formData[i].name, formData[i].value)
  }

  res.end()
})

module.exports = router;
