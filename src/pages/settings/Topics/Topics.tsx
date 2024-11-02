import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getTopicsAPI,
  toggleTopicStatusByIdAPI,
} from '../../../api/masterSettings/topics'
import { ISharedMasterSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import TopicFormModal from './TopicFormModal'

const Topics: React.FC = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'विषयगत क्षेत्रको नाम', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={TopicFormModal}
        fetchDataAPI={getTopicsAPI}
        toggleStatusApi={toggleTopicStatusByIdAPI}
        searchPlaceholder="विषयगत क्षेत्र खाेज्नुहाेस"
      />
    </Space>
  )
}

export default Topics
