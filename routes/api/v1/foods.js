var express = require('express');
var router = express.Router();

/* GET all foods. */
router.get('/', function(req, res, next) {
  return res.sendStatus(200);
});

module.exports = router;
