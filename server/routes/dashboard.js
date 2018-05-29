import express from "express"
import path from "path"
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const router = express.Router()

const DB_NAME = path.join(process.cwd(), 'data.json')
const adapter = new FileSync(DB_NAME)
const db = low(adapter)

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

  return db.get(key).value()
}

export default router
