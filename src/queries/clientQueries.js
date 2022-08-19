import { gql } from "@apollo/client"

export const GetClients = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`
