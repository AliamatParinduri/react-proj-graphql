import Spinner from "./Spinner"
import { useQuery } from "@apollo/client"
import { GetProjects } from "../queries/projectQueries"
import ProjectCard from "./ProjectCard"

export default function Projects() {
  const { loading, error, data } = useQuery(GetProjects)

  if (loading) <Spinner />
  if (error) <p>Something went wrong!</p>

  return (
    <>
      {!loading && !error && data.projects.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  )
}
