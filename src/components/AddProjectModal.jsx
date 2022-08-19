import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"
import { FaList } from "react-icons/fa"
import { GetProjects } from "../queries/projectQueries"
import { GetClients } from "../queries/clientQueries"
import Spinner from "./Spinner"
import { AddProject } from "../mutations/projectMutation"

export default function AddProjectModal() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [clientId, setClientId] = useState("")
  const [status, setStatus] = useState("new")

  const [addProject] = useMutation(AddProject, {
    variables: { name, description, clientId, status },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GetProjects })

      cache.writeQuery({
        query: GetProjects,
        data: { projects: [...projects, addProject] },
      })
    },
  })

  // Get Client for select
  const { loading, error, data } = useQuery(GetClients)

  const onSubmitClient = (e) => {
    e.preventDefault()

    if (name == "" || description == "" || clientId == "" || status == "") {
      return alert("tolong isi dulu guys")
    }

    addProject(name, description, clientId, status)

    setName("")
    setDescription("")
    setStatus("new")
    setClientId("")
  }

  if (loading) return null
  if (error) return <p>Something went wrong</p>

  return (
    <>
      {/* Button trigger modal */}
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          {/* Modal */}
          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjetModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjetModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmitClient}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={name}
                        onInput={(e) => {
                          setName(e.target.value)
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        name="description"
                        id="description"
                        className="form-control"
                        onInput={(e) => {
                          setDescription(e.target.value)
                        }}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        id="status"
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="new">Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        id="clientId"
                        className="form-select"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client) => (
                          <option value={client.id} key={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
