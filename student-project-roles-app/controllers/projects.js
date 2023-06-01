const Class = require('../models/class')
const Project = require('../models/project')
const Student = require('../models/student')

const create = async (req, res) => {
  //console.log('Hitting the Controller')
  let roles = req.body.roles.split(' ').join('').split(',')
  let properRoles = []
  roles.forEach((role) => {
    let properRole = role.charAt(0).toUpperCase() + role.slice(1)
    properRoles.push(properRole)
  })
  //console.log(properRoles)
  req.body.roles = properRoles
  console.log(req.params.id)
  const theClass = await Class.findById(req.params.id)
  req.body.class = theClass._id
  console.log(req.body)
  const project = await Project.create(req.body)
  req.body.students.forEach(async (ObjectId) => {
    let student = await Student.findById(ObjectId)
    let classIdx = student.classes.findIndex((o) =>
      o['class'].equals(req.params.id)
    )
    let newProject = {
      project: project._id
    }
    student.classes[classIdx].projects.push(newProject)
    await student.save()
    console.log(student)
  })
  try {
    await project.save()
    theClass.projects.push(project._id)
    await theClass.save()
    //req.body.students.forEach(async (ObjectId) => {
    //  let student = await Student.findById(ObjectId)
    //  await student.save()
    //})
  } catch (err) {
    console.log(err)
    res.render(`classes/${theClass._id}/projects/new`, {
      errorMsg: err.message
    })
  }
  res.redirect(`/classes/${theClass._id}/`)
}

const newProject = async (req, res) => {
  const theClass = await Class.findById(req.params.id).populate('students')
  const students = theClass.students
  console.log(theClass)
  res.render(`projects/new`, { theClass, students })
}

const show = async (req, res) => {
  console.log('Hitting Controller')
  const theClass = await Class.findById(req.params.classId)
  //console.log(theClass)
  const project = await Project.findById(req.params.projectId)
  //console.log(project)
  //const students = []
  const students = await Student.find({
    'classes.projects.project': project._id
  })
  console.log(students)
  const classIndex = (student) => {
    let idx = student.classes.findIndex((o) =>
      o['class'].equals(req.params.classId)
    )
    return idx
  }
  const projectIndex = (student) => {
    let idx = student.classes[classIndex(student)].projects.findIndex((o) =>
      o['project'].equals(req.params.projectId)
    )
    return idx
  }
  res.render('projects/show', {
    project,
    theClass,
    students,
    classIndex,
    projectIndex
  })
}

const edit = async (req, res) => {
  const theClass = await Class.findById(req.params.id)
  res.render(`projects/new`, { theClass })
}

module.exports = {
  new: newProject,
  create,
  show,
  edit
}
