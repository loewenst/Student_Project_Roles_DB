var express = require('express')
var router = express.Router()
const passport = require('passport')
const classCtrl = require('../controllers/classes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, classCtrl.index)
router.get('/new', ensureLoggedIn, classCtrl.new)
router.post('/', ensureLoggedIn, classCtrl.create)
router.get('/:id', ensureLoggedIn, classCtrl.show)

module.exports = router
