const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      }
    ],
    roles: [],
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', projectSchema)
