import { FaTrash } from "react-icons/fa"
import { useMutation } from "@apollo/client"
import { DeleteClient } from "../mutations/clientMutations"
import { GetClients } from "../queries/clientQueries"
import { GetProjects } from "../queries/projectQueries"

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DeleteClient, {
    variables: { id: client.id },
    refetchQueries: [
      { query: GetClients },
      {
        query: GetProjects,
      },
    ],

    // update(cache, { data: { deleteClient } }) {
    //   const { clients } = cache.readQuery({ query: GetClients })
    //   cache.writeQuery({
    //     query: GetClients,
    //     data: {
    //       clients: clients.filter((client) => client.id !== deleteClient.id),
    //     },
    //   })
    // },
  })

  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}
