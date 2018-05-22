import express from "express"
import path from "path"
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

const router = express.Router()

const DB_NAME = path.join(process.cwd(), 'data.json')
const adapter = new FileSync(DB_NAME)
const db = low(adapter)

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(getData('currentGame'))

  res.render(
    path.join(__dirname, '../views/dashboard/dashboard.html'),{
      title: 'Dashboard'
    }
  )
})

function getData(key) {
  return db.get(key).value()
}

export default router
