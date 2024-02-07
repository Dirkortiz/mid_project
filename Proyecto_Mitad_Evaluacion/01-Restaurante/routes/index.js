var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');

//localhost:3000
router.get('/', indexControllers.viewHome);

module.exports = router;
