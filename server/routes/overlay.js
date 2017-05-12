var express = require('express');
var path = require('path');
var router = express.Router();

/* GET overlay page. */
router.get('/', function(req, res, next) {

  res.render(
    path.join(__dirname, '../../client/overlay/themes/' + process.env.OVERLAY_THEME + '/overlay.html'),{
      title: 'Overlay'
    }

  );
});

module.exports = router;
