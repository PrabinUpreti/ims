import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getUnitsAPI,
  toggleUnitsStatusByIdAPI,
} from '../../../api/masterSettings/units'
import MasterSettingTable from '../../shared/MasterSettingTable'
import UnitFormModal from './UnitFormModal'
import { IUnitsSettingTable } from '../../../types/settings.types'

const Units: React.FC = () => {
  const columns: ColumnsType<IUnitsSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'इकाइको नाम', dataIndex: 'title', key: 'title' },
    { title: 'इकाइको संक्षिप्त नाम ', dataIndex: 'short_form', key: 'short_form' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<IUnitsSettingTable>
        columns={columns}
        modalComponent={UnitFormModal}
        fetchDataAPI={getUnitsAPI}
        toggleStatusApi={toggleUnitsStatusByIdAPI}
        searchPlaceholder="इकाई खाेज्नुहाेस्"
      />
    </Space>
  )
}

export default Units
