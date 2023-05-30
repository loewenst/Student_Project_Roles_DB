var express = require('express')
var router = express.Router()
const passport = require('passport')
const classCtrl = require('../controllers/classes')

router.get('/', classCtrl.index)
router.get('/new', classCtrl.new)

module.exports = router
