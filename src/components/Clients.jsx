import { useQuery } from "@apollo/client"
import ClientRow from "./ClientRow"
import { GetClients } from "../queries/clientQueries"
import Spinner from "./Spinner"

export default function Clients() {
  const { loading, error, data } = useQuery(GetClients)

  if (loading) <Spinner />
  if (error) <p>Something went wrong!</p>

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}
