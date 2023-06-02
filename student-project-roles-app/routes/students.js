var express = require('express')
var router = express.Router()
const passport = require('passport')
const studentCtrl = require('../controllers/students')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/classes/:id/students/new', ensureLoggedIn, studentCtrl.new)
router.post('/classes/:id/students', ensureLoggedIn, studentCtrl.create)
router.get('/classes/s/:id', ensureLoggedIn, studentCtrl.classShow)
//router.get('/classes/:classId/projects/:projectId', ensureLoggedIn, projectCtrl.show)

module.exports = router
