const mongoose = require('mongoose')

const Schema = mongoose.Schema

const adviceSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 50,
    },
    body: {
      type: String,
      required: true,
      maxLength: 500,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Advice', adviceSchema)
