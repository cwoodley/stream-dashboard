import express from "express"
import * as path from 'path'
import colors from "colors";
import { db } from '../db'

const router = express.Router();

const saveData = (name, value) => {
  db.set(name,value).write()
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
      console.log(colors.blue('emitting =>', `${name}: ${formattedValue}`))
      
    } else if (value) {
      console.log(colors.blue('emitting =>', `${name}: ${value}`))
      res.io.emit(name, value)
      saveData(name, value)
    }
  }

  res.end()
})

export default router
