import { gql } from "@apollo/client"

export const GetProjects = gql`
  query getProjects {
    projects {
      id
      name
      description
      status
    }
  }
`

export const GetProject = gql`
  query getProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`
