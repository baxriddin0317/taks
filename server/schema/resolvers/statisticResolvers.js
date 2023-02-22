const Task = require("../../models/taskModel");

const getPercent = (tasks, key) => {
  let lateEndCount = 0;
  let endCount = 0;
  let lateCount = 0;
  tasks.forEach(task => {
    if(task.status === "LATEEND"){
      lateEndCount++
    }
    
    if(task.status === "ENDED"){
      endCount++
    }
    
    if(task.status === "LATE"){
      lateCount++
    }
  } )

  let res = (endCount * 100)/tasks.length;
  let lateRes = (lateCount * 100)/tasks.length;
  let lateEndRes = (lateEndCount * 100)/tasks.length;
  switch (key) {
    case "ENDED":
      return res.toFixed(1)
    case "LATE":
      return lateRes.toFixed(1)
    case "LATEEND":
      return lateEndRes.toFixed(1)
    default:
      break;
  }
}

const StatisticResolvers = {
  // Query functions for task
  Query: {
    percent: async (_, {username}, context) => {
      const findTasks = await Task.find({username});
      return getPercent(findTasks, "ENDED");
    },

    latePercent: async(_,{username}, context) => {
      const findTasks = await Task.find({username});
      return getPercent(findTasks, "LATE");
    },

    lateEndPercent: async(_,{username}, context) => {
      const findTasks = await Task.find({username});
      return getPercent(findTasks, "LATEEND");
    },
  },

  // Mutation functions for task
  // Mutation: {
  
  // } 
}

module.exports = StatisticResolvers