import { useOutletContext } from 'react-router-dom'
import ProjectBeneficiary from '../CostEstimate/AdministrativeFunction/ProjectBeneficiary'
import { IProjectDetail } from '../../../types/projects.types'
import ProjectDescription from './ProjectDescription'
import { Space } from 'antd'
export interface IProjectDetailsProps {
  projectDetails: IProjectDetail
}

const ProjectDetail: React.FC = () => {
  const { projectDetails } = useOutletContext<IProjectDetailsProps>()

  if (!projectDetails) {
    return null
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size={36}>
      <ProjectDescription projectDetails={projectDetails} />
      <ProjectBeneficiary />
    </Space>
  )
}

export default ProjectDetail
