var express = require('express')
var router = express.Router()
const passport = require('passport')
const classCtrl = require('../controllers/classes')

router.get('/', classCtrl.index)

module.exports = router
