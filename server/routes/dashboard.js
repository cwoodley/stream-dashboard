import express from "express"
import path from "path"

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render(
    path.join(__dirname, '../views/dashboard/dashboard.html'),{
      title: 'Dashboard'
    }
  );
});

module.exports = router;
