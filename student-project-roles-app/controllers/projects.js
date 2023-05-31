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
  console.log(properRoles)
  req.body.roles = properRoles
  const theClass = await Class.findById(req.params.id)
  req.body.class = theClass._id
  //console.log(req.body)
  const project = await Project.create(req.body)
  try {
    await project.save()
    console.log(project)
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
  const theClass = await Class.findById(req.params.id)
  res.render(`projects/new`, { theClass })
}

module.exports = {
  new: newProject,
  create
}
