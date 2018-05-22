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

const setTickerItems = (data) => {
  saveData('tickerItems',data)
}

router.get('/', (req, res, next) => {  
  res.end()
})

router.post('/', (req, res, next) => {
  const formData = req.body
  const emitting = []

  for (const i in formData) {
    const name = formData[i].name
    const value = formData[i].value
    const isTickerItem = name === 'tickerItems' && value !== ''

    if (isTickerItem) {
      const string = value
      // format textarea data into array
      const formattedValue = string.replace(/\r\n/g,"\n").split("\n")
      res.io.emit(name, formattedValue)
      setTickerItems(formattedValue)
    } else if (value) {
      console.log('emitting =>', `${name}: ${value}`)
      res.io.emit(name, value)
      saveData(name, value)
    }
  }

  res.end()
})

export default router
