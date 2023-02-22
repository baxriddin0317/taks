const commentModel = require("../../models/commentModel");
const checkAuth = require("../../util/check-auth");

const CommentResolver = {
  // comment queryes
  Query: {
    getComment: async (_, {taskId}, context) => {
      const commnets = await commentModel.find({taskId}).sort({createdAt: -1});
      return commnets
    },
    commentCount: async (_, {taskId}, context) => {
      const commnets = await commentModel.find({taskId});
      return commnets.length
    }
  }, 
  // comment mutations
  Mutation: {
    // create commit
    addComment: async (_, {CommentInput: {body, taskId}}, context) => {
      const user = checkAuth(context);
      
      const newComment = new commentModel({
        body,
        username: user.username,
        createdAt: new Date().toISOString(),
        taskId
      })

      const res = newComment.save();

      return res
    },

    // delete commit
    deleteComment: async(_, {commentId}, context) => {
      const user = checkAuth(context);
      
      try {
        const fundComment = await commentModel.findById(commentId);
        if(user.username === fundComment.username || user.role == 'admin'){
          await fundComment.delete();
          return "delete succesfull"
        }else {
          throw new AuthenticationError("You are not an admin :)")
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    // edit comment
    editComment: async(_, {editCommentInput: {commentId, body}}, context) => {
      await commentModel.findByIdAndUpdate(commentId, {body});
      return "edit succesfull" 
    }
  }
}

module.exports = CommentResolver