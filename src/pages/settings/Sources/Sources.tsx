import { ColumnsType } from 'antd/es/table'
import { Space } from 'antd'
import MasterSettingTable from '../../shared/MasterSettingTable'
import {
  getSourcesAPI,
  toggleSourcesStatusByIdAPI,
} from '../../../api/masterSettings/sources'
import SourceFormModal from './SourceFormModal'
import { ISharedMasterSettingTable } from '../../../types/settings.types'

// स्रोत
const Sources = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'स्रोतको नाम', dataIndex: 'title', key: 'title' },
  ]
  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={SourceFormModal}
        fetchDataAPI={getSourcesAPI}
        toggleStatusApi={toggleSourcesStatusByIdAPI}
        searchPlaceholder="स्रोत खाेज्नुहाेस"
      />
    </Space>
  )
}

export default Sources
