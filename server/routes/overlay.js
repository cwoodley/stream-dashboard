var express = require('express');
var path = require('path');
var router = express.Router();

/* GET overlay page. */
router.get('/', function(req, res, next) {

  var theme;

  if (!process.env.OVERLAY_THEME) {
    theme = "default"
  } else {
    theme = process.env.OVERLAY_THEME
  }

  res.render(
    path.join(__dirname, '../../client/overlay/themes/' + theme + '/overlay.html'),{
      title: 'Overlay'
    }

  );
});

module.exports = router;
