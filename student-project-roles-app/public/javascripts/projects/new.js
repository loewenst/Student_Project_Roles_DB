const Student = require('../../../models/student')

const add = async (studentId, classId, projectId) => {
  const student = await Student.findById(studentId)
  const classIndex = student.classes.indexOf(classId)
  const newProject = { project: projectId }
  student.classes[classIndex].projects.push(newProject)
}
