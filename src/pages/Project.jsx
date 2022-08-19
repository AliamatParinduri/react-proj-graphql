import { Link, useParams } from "react-router-dom"
import Spinner from "../components/Spinner"
import { useQuery } from "@apollo/client"
import { GetProject } from "../queries/projectQueries"
import Clientinfo from "../components/Clientinfo"
import DeleteProjectButton from "../components/DeleteProjectButton"
import EditProjectForm from "../components/EditProjectForm"

export default function Project() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GetProject, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
            Back
          </Link>

          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-2">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <Clientinfo client={data.project.client} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  )
}
