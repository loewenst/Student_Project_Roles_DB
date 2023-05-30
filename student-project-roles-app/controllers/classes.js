const Class = require('../models/class')

const index = async (req, res) => {
  const classes = await Class.find()
  //const classes = []
  console.log(classes)
  res.render('classes/index', {
    classes
  })
}

const newClass = (req, res) => {
  res.render('classes/new')
}

const create = (req, res) => {}

module.exports = {
  index,
  new: newClass,
  create
}
