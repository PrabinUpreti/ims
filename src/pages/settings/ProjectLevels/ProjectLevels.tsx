import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getProjectLevelAPI,
  toggleProjectLevelStatusAPI,
} from '../../../api/masterSettings/projectlevel'
import { ISharedMasterSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import ProjectLevelFormModal from './ProjectLevelFormModal'

const ProjectLevels: React.FC = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'योजना स्तरको नाम', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={ProjectLevelFormModal}
        fetchDataAPI={getProjectLevelAPI}
        toggleStatusApi={toggleProjectLevelStatusAPI}
        searchPlaceholder="योजना स्तर खाेज्नुहाेस"
      />
    </Space>
  )
}

export default ProjectLevels
