const express = require('express');
const router = express.Router();
const { generateJWT } = require('../utils/auth');

router.get('/', function(req, res, next) {
  res.json(res.locals.user);
});

module.exports = router;