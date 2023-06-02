const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    admin: { type: Boolean, default: false },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student' }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
