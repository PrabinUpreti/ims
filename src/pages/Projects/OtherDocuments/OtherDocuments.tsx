import { Space } from 'antd'
import DocumentTable from '../../shared/DocumentTable'
import { StepCode } from '../../../constants'

const OtherDocuments = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={36}>
      <DocumentTable projectId={18} code={StepCode.OTHER_DOCUMENTS} showTitle />
      <DocumentTable
        projectId={18}
        code={StepCode.OTHER_DOCUMENTS_UPLOADED}
        showTitle
      />
    </Space>
  )
}

export default OtherDocuments
