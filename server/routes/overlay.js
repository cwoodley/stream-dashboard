var express = require('express');
var path = require('path');
var router = express.Router();

/* GET overlay page. */
router.get('/', function(req, res, next) {

  var theme = process.env.OVERLAY_THEME;

  if (!theme) {
    theme = "default"
  }

  res.render(
    path.join(__dirname, '../../client/overlay/themes/' + theme + '/overlay.html'),{
      title: 'Overlay'
    }

  );
});

module.exports = router;
