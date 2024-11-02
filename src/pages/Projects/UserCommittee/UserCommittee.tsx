import { Space } from 'antd'
import CommitteeDescription from './CommitteeDescription/CommitteeDescription'
import { StepCode } from '../../../constants'
import DocumentTable from '../../shared/DocumentTable'
import CommitteeMember from './CommitteeMember'

const UserCommittee = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={36}>
      <CommitteeDescription />
      <DocumentTable projectId={18} code={StepCode.USER_COMMITTEE_STEP_CODE} />
      <CommitteeMember />
    </Space>
  )
}

export default UserCommittee
