import express from "express"
import path from "path"
import { db } from "../db";

const router = express.Router()

router.get('/', function(req, res, next) {
  
  res.render(
    path.join(__dirname, '../views/dashboard/dashboard.html'),{
      title: 'Dashboard',
      deadline: getData('deadline'),
      donationTotal: getData('donationTotal'),
      tickerItems: getTickerItems()
    }
  )
})

function getTickerItems() {
  const items = db.get('tickerItems').value()

  if (!items) {
    return
  }

  return items.join('\n')
}

function getData(key) {
  if (!key) {
    return
  }

  const value = db.get(key).value()
  
  return value

}

export default router
