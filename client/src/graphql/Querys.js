import { gql } from "@apollo/client"

const GET_ALL_USER = gql`
  query AllUsers {
    allUsers {
      id
      username
      email
    }
  }
`

const GET_ALL_TASK = gql`
  query GetTask($first: Int!, $skip: Int!) {
    getTasks(first: $first, skip: $skip) {
      id
      status
      body
      createdAt
      username
      deadline
    }
  }
`

const GET_PERSONAL_TASKS = gql`
  query GetPersonalTask($username: String!) {
    getPersonalTask(username: $username) {
      body
      createdAt
      id
      status
      username
      deadline
    }
  }
`

const GET_PERCENT = gql`
  query ExampleQuery($username: String!) {
    percent(username: $username)
  }
`

const GET_COMMENT = gql`
  query Query($taskId: ID!) {
    getComment(taskId: $taskId) {
      id
      body
      taskId
      createdAt
      username
    }
  }
` 

const COMMENT_COUNT = gql`
  query Query($taskId: ID!) {
    commentCount(taskId: $taskId)
  }
`

const LATE_PERCENT = gql`
  query Query($username: String!) {
    latePercent(username: $username)
  }
`

const LATEEND_PERCENT = gql`
  query Query($username: String!) {
    lateEndPercent(username: $username)
  }
`

export {GET_ALL_TASK, GET_PERSONAL_TASKS, GET_ALL_USER, GET_PERCENT, GET_COMMENT, COMMENT_COUNT, LATE_PERCENT, LATEEND_PERCENT}