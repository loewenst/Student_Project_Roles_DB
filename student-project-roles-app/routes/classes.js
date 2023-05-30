var express = require('express')
var router = express.Router()
const passport = require('passport')
const classCtrl = require('../controllers/classes')

router.get('/', classCtrl.index)
router.get('/new', classCtrl.new)
router.post('/', classCtrl.create)

module.exports = router
