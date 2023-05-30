const Class = require('../models/class')

const index = async (req, res) => {
  const classes = await Class.find()
  res.render('classes/index', {
    classes
  })
}

const newClass = (req, res) => {
  res.render('classes/new')
}

const create = async (req, res) => {
  req.body.creator = req.user._id
  try {
    await Class.create(req.body)
    res.redirect('classes/')
  } catch (err) {
    console.log(err)
    res.render('classes/new', { errorMsg: err.message })
  }
}

module.exports = {
  index,
  new: newClass,
  create
}
