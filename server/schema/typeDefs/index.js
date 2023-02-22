const { gql } = require("apollo-server-express");

module.exports = gql`
  type Task {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    status: Status!
    deadline: Float!
  }

  enum Status {
    START
    ONGOING
    ENDED
    LATE
    LATEEND
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    createdAt: String
    token: String!
    role: String!
  }

  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    taskId: ID!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input UpdateInput {
    taskId: ID! 
    body: String!
  }

  input StatusInput {
    taskId: ID! 
    status: String!
  }

  input CommentInput {
    body: String!
    taskId: String!
  }

  input editCommentInput {
    commentId: ID!
    body: String!
  }

  type Query {
    allUsers: [User!] 
    getTasks(first: Int!, skip: Int!): [Task!]
    getTask(taskId: ID!): Task!
    getPersonalTask(username: String!): [Task!]
    percent(username: String!): Float!
    latePercent(username: String!): Float!
    lateEndPercent(username: String!): Float!
    getComment(taskId: ID!): [Comment!]
    commentCount(taskId: ID!): Float!
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(loginInput: LoginInput): User! 
    createTask(body: String!, deadline: Float!): Task!
    deleteTask(taskId: ID!): String!
    updateTask(updateInput: UpdateInput!): Task
    statusUpdate(statusInput: StatusInput!): Task
    addComment(CommentInput: CommentInput!): Comment
    deleteComment(commentId: ID!): String!
    editComment(editCommentInput: editCommentInput!): String
  }
`