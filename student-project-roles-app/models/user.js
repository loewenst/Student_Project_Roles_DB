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
    teacher: { type: Boolean, default: false },
    student: { type: Boolean, default: false },
    admin: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
