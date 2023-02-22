const CommentResolver = require("./commentResolver");
const StatisticResolvers = require("./statisticResolvers");
const TasksResolvers = require("./taskResolvers");
const UserResolvers = require("./userResolvers");

module.exports = {
  Query: {
    ...TasksResolvers.Query,
    ...UserResolvers.Query,
    ...StatisticResolvers.Query,
    ...CommentResolver.Query,
  },
  Mutation: {
    ...TasksResolvers.Mutation,
    ...UserResolvers.Mutation,
    ...CommentResolver.Mutation,
  }
}