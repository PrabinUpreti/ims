import { Space } from 'antd'
import { StepCode } from '../../../constants'
import DocumentTable from '../../shared/DocumentTable'

const ProjectContract = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={36}>
      <DocumentTable projectId={18} code={StepCode.PROJECT_CONTRACT_OTHER} showTitle />
      <DocumentTable projectId={18} code={StepCode.PROJECT_CONTRACT} showTitle />
    </Space>
  )
}

export default ProjectContract
