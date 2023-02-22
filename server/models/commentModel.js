const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  taskId: {
    type: Schema.Types.ObjectId,
    ref: "Tasks"
  },
})

module.exports = model("Comment", CommentSchema);