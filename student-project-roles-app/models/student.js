const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studentSchema = new Schema(
  {
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    classes: [
      {
        class: { type: Schema.Types.ObjectId, ref: 'Class' },
        projects: [
          {
            project: { type: Schema.Types.ObjectId, ref: 'Project' },
            role: { type: String, default: 'Unassigned' },
            group: { type: Number }
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Student', studentSchema)
