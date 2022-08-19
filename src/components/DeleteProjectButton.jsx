import { useNavigate } from "react-router-dom"
import { FaTrash } from "react-icons/fa"
import { DeleteProject } from "../mutations/projectMutation"
import { GetProjects } from "../queries/projectQueries"
import { useMutation } from "@apollo/client"

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DeleteProject, {
    variables: { id: projectId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GetProjects }],
  })

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" />
        Delete Project
      </button>
    </div>
  )
}
