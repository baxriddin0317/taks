const { AuthenticationError } = require("apollo-server-express");
const Task = require("../../models/taskModel");
const checkAuth = require("../../util/check-auth")

const changeStatus = (Tasks) => {
  Tasks.forEach(async task => {
    let result = new Date(task.createdAt);
    result.setDate(result.getDate() + task.deadline);
    let endDate = result.getDate();
    let todayDate = new Date().getDate();
    if((task.status !== "LATEEND" && task.status !== "ENDED") && (endDate === todayDate || endDate <= todayDate) ){
      await Task.findByIdAndUpdate(task.id, {
        status: "LATE"
      } );
    }
    
    // if((endDate + 2 <= todayDate)){
    //   const findTask = await Task.findById(task.id);
        
    //   await findTask.delete();
    // }

  })
}

const TasksResolvers = {
  Query: {
    // get all tasks
    getTasks: async (_,{first = null, skip = null},context) => {
      try {
        const Tasks = await Task.find().sort({createdAt: -1}).limit(first).skip(skip); 
       return Tasks
      } catch (error) {
        throw new Error(error)
      }
    },

    // get one task
    getTask: async (_, {taskId}, context) => {
      try {
        const foundTask = await Task.findById(taskId);
        if(foundTask){
          return foundTask
        }else {
          throw new Error("task not found");
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    
    //  get personal tasks
    getPersonalTask: async (_, {username}, context) => {
      try {
        const Tasks = await Task.find({username}).sort({createdAt: -1});
        if(Tasks){
          changeStatus(Tasks)
          return Tasks
        }else {
          throw new Error("task not found");
        }
      } catch (error) {
        throw new Error(error)
      }
    },
  },

  // Mutation functions for task
  Mutation: {
    // this is function for create task
    createTask: async (_, {body, deadline}, context) => {
      const user = checkAuth(context);
      
      const createTask = new Task({
        body,
        user: user.id,
        username: user.username,
        status: "START",
        createdAt: new Date().toISOString(),
        deadline
      })

      const task = await createTask.save();

      return task
    },

    // this is function for delete task
    deleteTask: async (_, {taskId}, context) => {
      const user = checkAuth(context);
  
      try {
        const findTask = await Task.findById(taskId);
        
        if(user.role == 'admin'){
          await findTask.delete();
          return "Deleted succesfully"
        }else {
          throw new AuthenticationError("You are not an admin :)")
        }
      } catch (error) {
        throw new Error(error)
      }
    },

    // this is function for update task
    updateTask: async (_, {updateInput: {taskId, body}}, context) => {
      const user = checkAuth(context);

      const updateTask = await Task.findByIdAndUpdate(taskId, {
        body
      } );
      return updateTask
    },

    // this is function for update task status
    statusUpdate: async (_, {statusInput: {taskId, status}}, context) => {
      try {
        const updateStatusTask = await Task.findByIdAndUpdate(taskId, {
          status
        } );
        return updateStatusTask
      } catch (error) {
        throw new Error(error)
      }
    }
  },

}

module.exports = TasksResolvers