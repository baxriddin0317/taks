const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  status: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  deadline: Number 
})

module.exports = model("Tasks", TaskSchema);