var express = require('express')
var router = express.Router()
const passport = require('passport')
const projectCtrl = require('../controllers/projects')
const ensureLoggedIn = require('../config/ensureLoggedIn')

router.get('/classes/:id/projects/new', ensureLoggedIn, projectCtrl.new)
router.post('/classes/:id/projects', ensureLoggedIn, projectCtrl.create)
router.get(
  '/classes/:classId/projects/:projectId',
  ensureLoggedIn,
  projectCtrl.show
)
router.get(
  '/classes/:classId/projects/:projectId/edit',
  ensureLoggedIn,
  projectCtrl.edit
)

router.delete(
  '/classes/:classId/projects/:projectId',
  ensureLoggedIn,
  projectCtrl.delete
)
module.exports = router
