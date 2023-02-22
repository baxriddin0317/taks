const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  email: {
    type: String,
  },
  password: String,
  createdAt: String,
  role: {
    type: String,
    default: "user"
  }
})

module.exports = model("Users", userSchema)