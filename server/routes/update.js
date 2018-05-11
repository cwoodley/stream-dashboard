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
    const name = formData[i].name
    const value = formData[i].value

    if (value) {
      console.log('emitting =>', `${name}: ${value}`)
      res.io.emit(name, value)
      saveData(name, value)
    }
  }

  res.end()
})

module.exports = router;
