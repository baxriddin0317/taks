import { gql } from "@apollo/client";

const MUTATION_REGISTER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    register(registerInput: $registerInput) {
      id
      token
      username
      password
      email
      createdAt
    }
  }
`

const MUTATION_LOGIN = gql`
  mutation Mutation($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      id
      token
      username
      createdAt
      email
      password
    }
  }
`

const MUTATION_CREATE_TASK = gql`
mutation Mutation($body: String!, $deadline: Float!) {
  createTask(body: $body, deadline: $deadline) {
    id
    body
    username
    deadline
    status
    createdAt
  }
}
`

const MUTATION_EDIT_TASK = gql`
  mutation UpdateTask($updateInput: UpdateInput!) {
    updateTask(updateInput: $updateInput) {
      id
      body
      createdAt
      status
      username
    }
  }
`

const MUTATION_STATUS_EDIT = gql `
  mutation StatusUpdate($statusInput: StatusInput!) {
    statusUpdate(statusInput: $statusInput) {
      status
    }
  }
`

const MUTATION_ADD_COMMENT = gql`
  mutation AddComment($commentInput: CommentInput!) {
    addComment(CommentInput: $commentInput) {
      body
      id
      taskId
      username
    }
  }
`

const DELETE_COMMENT = gql`
  mutation Mutation($commentId: ID!) {
    deleteComment(commentId: $commentId)
  }
`

const DELETE_TASK = gql`
  mutation Mutation($taskId: ID!) {
    deleteTask(taskId: $taskId)
  }
`

const EDIT_COMMENT = gql`
  mutation EditComment($editCommentInput: editCommentInput!) {
    editComment(editCommentInput: $editCommentInput)
  }
`

export {MUTATION_REGISTER, MUTATION_LOGIN, MUTATION_CREATE_TASK, MUTATION_EDIT_TASK, MUTATION_STATUS_EDIT, MUTATION_ADD_COMMENT, DELETE_COMMENT, DELETE_TASK, EDIT_COMMENT}