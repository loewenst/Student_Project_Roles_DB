const Class = require('../models/class')
const Project = require('../models/project')
const Student = require('../models/student')

const create = async (req, res) => {
  //formatting the roles
  let roles = req.body.roles.split(' ').join('').split(',')
  let properRoles = []
  roles.forEach((role) => {
    let properRole = role.charAt(0).toUpperCase() + role.slice(1)
    properRoles.push(properRole)
  })
  req.body.roles = properRoles
  //creating an array of groups
  let groups = []
  for (let i = 0; i < req.body.groups; i++) {
    groups.push(i + 1)
  }
  req.body.groups = groups
  const theClass = await Class.findById(req.params.id)
  req.body.class = theClass._id
  const project = await Project.create(req.body)
  //updating the student models with the project ids
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
  res.render(`projects/new`, { theClass, students })
}

const show = async (req, res) => {
  console.log('Hitting Show Controller')
  const theClass = await Class.findById(req.params.classId)
  const project = await Project.findById(req.params.projectId)
  const students = await Student.find({
    'classes.projects.project': project._id
  })
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
  const theClass = await Class.findById(req.params.classId).populate('students')
  const project = await Project.findById(req.params.projectId)
  const students = theClass.students
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
  res.render(`projects/edit`, {
    theClass,
    students,
    project,
    classIndex,
    projectIndex
  })
}

const deleteProject = async (req, res) => {
  console.log('Hitting the Controller')
  //remove the project
  await Project.findByIdAndRemove(req.params.projectId)
  //remove the project from the class schema
  const theClass = await Class.findById(req.params.classId)
  const projectIdx = theClass.projects.findIndex((id) =>
    id.equals(req.params.projectId)
  )
  theClass.projects.splice([projectIdx], 1)
  await theClass.save()
  //remove the project from the student schema
  const students = await Student.find({
    'classes.projects.project': req.params.projectId
  })
  students.forEach(async (student) => {
    let classIdx = student.classes.findIndex((o) =>
      o['class'].equals(req.params.classId)
    )
    let projectIdx = student.classes[classIdx].projects.findIndex((o) =>
      o['project'].equals(req.params.projectId)
    )
    student.classes[classIdx].projects.splice([projectIdx], 1)
    await student.save()
    console.log(student)
  })
  res.redirect(`/classes/${theClass._id}/`)
}

const update = async (req, res) => {
  const theClass = await Class.findById(req.params.classId).populate('students')
  const project = await Project.findById(req.params.projectId)
  const students = theClass.students
  //formatting the new roles
  let roles = req.body.roles.split(' ').join('').split(',')
  let properRoles = []
  roles.forEach((role) => {
    let properRole = role.charAt(0).toUpperCase() + role.slice(1)
    properRoles.push(properRole)
  })
  req.body.roles = properRoles
  //making the new groups number into an array
  let groups = []
  for (let i = 0; i < req.body.groups; i++) {
    groups.push(i + 1)
  }
  req.body.groups = groups
  //getting rid of the project id from all students who have it in their models
  const currentStudents = await Student.find({
    'classes.projects.project': req.params.projectId
  })
  currentStudents.forEach(async (student) => {
    let classIdx = student.classes.findIndex((o) =>
      o['class'].equals(req.params.classId)
    )
    let projectIdx = student.classes[classIdx].projects.findIndex((o) =>
      o['project'].equals(req.params.projectId)
    )
    student.classes[classIdx].projects.splice([projectIdx], 1)
    await student.save()
  })
  //adding the project id to all students currently selected
  req.body.students.forEach(async (ObjectId) => {
    let student = await Student.findById(ObjectId)
    let classIdx = student.classes.findIndex((o) =>
      o['class'].equals(req.params.classId)
    )
    let studentRole = `${student._id}_role`
    let studentGroup = `${student._id}_group`
    let newProject = {
      project: project._id,
      role: req.body[studentRole],
      group: req.body[studentGroup]
    }
    student.classes[classIdx].projects.push(newProject)
    await student.save()
  })
  try {
    await Project.findOneAndUpdate({ _id: req.params.projectId }, req.body)
    await project.save()
  } catch (err) {
    console.log(err)
    res.render(`classes/${theClass._id}/projects/${project._id}/edit`, {
      errorMsg: err.message
    })
  }
  res.redirect(
    `/classes/${req.params.classId}/projects/${req.params.projectId}/edit`
  )
}

module.exports = {
  new: newProject,
  create,
  show,
  edit,
  delete: deleteProject,
  update
}
