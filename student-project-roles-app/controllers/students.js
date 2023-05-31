const Class = require('../models/class')
const Project = require('../models/project')
const Student = require('../models/student')

const newStudent = async (req, res) => {
  const theClass = await Class.findById(req.params.id)
  res.render(`students/new`, { theClass })
}

const create = async (req, res) => {
  console.log('Hitting the Controller')
  const theClass = await Class.findById(req.params.id)
  const student = await Student.create(req.body)
  let newClass = {
    class: theClass._id
  }
  try {
    student.classes.push(newClass)
    await student.save()
    theClass.students.push(student._id)
    await theClass.save()
  } catch (err) {
    console.log(err)
    res.render(`classes/${theClass._id}/students/new`, {
      errorMsg: err.message
    })
  }
  res.redirect(`/classes/${theClass._id}/`)
}

module.exports = {
  new: newStudent,
  create
  //show
}
