import { Space } from 'antd'
import ProjectBeneficiary from './ProjectBeneficiary'
import ProjectBudget from './ProjectBudget'
import DocumentTable from '../../../shared/DocumentTable'
import { StepCode } from '../../../../constants'

const AdministrativeFunction = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={36}>
      <DocumentTable projectId={6} code={StepCode.COST_ESTIMATE_STEP_CODE} showTitle />
      <ProjectBudget />
      <ProjectBeneficiary />
    </Space>
  )
}
export default AdministrativeFunction
