import { ColumnsType } from 'antd/es/table'
import { ISharedMasterSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import { Space } from 'antd'
import {
  getBanksAPI,
  toggleBanksStatusByIdAPI,
} from '../../../api/masterSettings/banks'
import BanksModalComponent from './BanksModalComponent'

const Banks = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'बैंकको नाम', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable
        columns={columns}
        modalComponent={BanksModalComponent}
        fetchDataAPI={getBanksAPI}
        searchPlaceholder="बैंकको नाम खाेज्नुहाेस्"
        toggleStatusApi={toggleBanksStatusByIdAPI}
      />
    </Space>
  )
}

export default Banks
