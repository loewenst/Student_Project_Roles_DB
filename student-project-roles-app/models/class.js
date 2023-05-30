const mongoose = require('mongoose')
const Schema = mongoose.Schema

const classSchema = new Schema(
  {
    name: { type: String, required: true },
    description: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Class', classSchema)
