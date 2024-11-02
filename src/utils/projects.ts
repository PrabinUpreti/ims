import { PROJECT_STATUS } from '../constants'

export const isProjectTabOpen = (projectStatus: string): boolean => {
  const normalizedStatus = projectStatus.toLowerCase()
  return (
    normalizedStatus === PROJECT_STATUS.STARTED ||
    normalizedStatus === PROJECT_STATUS.COMPLETED ||
    normalizedStatus === PROJECT_STATUS.METHOD_SET
  )
}
