import { Space, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ISubTopicSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import SubTopicsFormModal from './SubTopicsFormModal'
import {
  getSubTopicAPI,
  toggleSubTopicStatusAPI,
} from '../../../api/masterSettings/subtopics'
const { Text } = Typography
const SubTopics: React.FC = () => {
  const columns: ColumnsType<ISubTopicSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'उप क्षेत्रको नाम', dataIndex: 'title', key: 'title' },
    {
      title: 'विषयगत क्षेत्रको नाम',
      dataIndex: 'topic',
      key: 'topic',
      render: topic => (
        <Space direction="horizontal" size={10}>
          <Text>{topic.title}</Text>

          {!topic.is_active && (
            <Tag color="red" key="Inactive">
              निष्क्रिय
            </Tag>
          )}
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISubTopicSettingTable>
        columns={columns}
        modalComponent={SubTopicsFormModal}
        fetchDataAPI={getSubTopicAPI}
        toggleStatusApi={toggleSubTopicStatusAPI}
        searchPlaceholder="उप क्षेत्र खाेज्नुहाेस"
      />
    </Space>
  )
}

export default SubTopics
