const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Project'
      }
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student'
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Class', classSchema)
