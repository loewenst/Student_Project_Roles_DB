var express = require('express')
var router = express.Router()
const passport = require('passport')
const classCtrl = require('../controllers/classes')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index')
})
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/')
  })
})
module.exports = router
