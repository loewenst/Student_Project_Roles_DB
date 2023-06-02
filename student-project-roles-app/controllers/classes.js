const Class = require('../models/class')

const index = async (req, res) => {
  const classes = await Class.find({ creator: req.user._id }).populate(
    'students'
  )
  const enrolledClasses = await Class.find({
    students: req.user.studentId
  }).populate('students')
  console.log(req.user.avatar)
  res.render('classes/index', {
    classes,
    enrolledClasses
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

const show = async (req, res) => {
  const theClass = await Class.findById(req.params.id)
    .populate('projects')
    .populate('students')
  //console.log(theClass)
  //theClass.populate('students', 'projects')
  res.render('classes/show', {
    theClass
  })
}

module.exports = {
  index,
  new: newClass,
  create,
  show
}
