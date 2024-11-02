import { useParams } from 'react-router-dom'

export const useProjectID = () => {
  const { id } = useParams<{ id: string }>()
  const projectId = parseInt(id as string, 10)

  return projectId
}
