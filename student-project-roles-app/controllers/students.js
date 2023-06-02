const Class = require('../models/class')
const Project = require('../models/project')
const Student = require('../models/student')
const User = require('../models/user')

const newStudent = async (req, res) => {
  const theClass = await Class.findById(req.params.id)
  res.render(`students/new`, { theClass })
}

const create = async (req, res) => {
  console.log('Hitting the Controller')
  const theClass = await Class.findById(req.params.id)
  let existingStudent = await Student.findOne({ email: req.body.email })
  console.log(existingStudent)
  //let existingUser = await User.findOne({ email: req.body.email })
  if (existingStudent) {
    theClass.students.push(existingStudent._id)
    let newClass = {
      class: theClass._id
    }
    existingStudent.classes.push(newClass)
    console.log(theClass._id)
    console.log(existingStudent.classes)
    try {
      await existingStudent.save()
      await theClass.save()
    } catch (err) {
      console.log(err)
      res.render(`classes/${theClass._id}/students/new`, {
        errorMsg: err.message
      })
    }
    //} else if (existingUser) {
    //  const student = await Student.create(req.body)
    //  let newClass = {
    //    class: theClass._id
    //  }
    //  student.classes.push(newClass)
    //  theClass.students.push(student._id)
    //  try {
    //    await student.save()
    //    existingUser.studentId = student._id
    //    await existingUser.save()
    //    await theClass.save()
    //  } catch (err) {
    //    console.log(err)
    //    res.render(`classes/${theClass._id}/students/new`, {
    //      errorMsg: err.message
    //    })
    //  }
  } else {
    //need to search for a student with req.body.email, create a student if none, add
    //the class to the student and the student to the class if yes
    const student = await Student.create(req.body)
    let newClass = {
      class: theClass._id
    }
    student.classes.push(newClass)
    theClass.students.push(student._id)
    try {
      await student.save()
      await theClass.save()
    } catch (err) {
      console.log(err)
      res.render(`classes/${theClass._id}/students/new`, {
        errorMsg: err.message
      })
    }
  }
  res.redirect(`/classes/${theClass._id}/`)
}

const classShow = async (req, res) => {
  const theClass = await Class.findById(req.params.id)
    .populate('students')
    .populate('projects')
  console.log(req.params.id)
  console.log(theClass)
  console.log(theClass.students)
  const email = req.user.email
  //make a function that takes in a user student id, returns an array of projects that contain the student id,
  //and then displays information for each of those projects in divs
  const getProjects = async (email) => {
    const student = await Student.find({ email: req.user.email })
    const studentId = student._id
    const projectArray = await Project.find({
      class: theClass._id,
      students: studentId
    })
    console.log(projectArray)
    return projectArray
  }
  //projectArray = getProjects(email)
  //console.log(projectArray)
  res.render('students/classShow', { theClass, getProjects, email })
}

module.exports = {
  new: newStudent,
  create,
  classShow
  //show
}
