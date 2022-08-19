import { useState } from "react"
import { useMutation } from "@apollo/client"
import { GetProject } from "../queries/projectQueries"
import { UpdateProject } from "../mutations/projectMutation"

export default function EditProjectForm({ project }) {
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState("")

  const [updateProject] = useMutation(UpdateProject, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GetProject, variables: { id: project.id } }],
  })

  const onSubmitProject = (e) => {
    e.preventDefault()

    if (!name || !description || !status) {
      return alert("isi dulu semua fieldnya!")
    }

    updateProject(name, description, status)
  }

  return (
    <div className="mt-5">
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmitProject}>
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
            value={description}
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
        <button
          className="btn btn-primary"
          data-bs-dismiss="modal"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
