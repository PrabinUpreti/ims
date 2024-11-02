import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getExpenseCentersAPI,
  toggleExpenseCentersStatusAPI,
} from '../../../api/masterSettings/expenseCenter'
import { ISharedMasterSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import ExpenseCentersFormModal from './ExpenseCentersFormModal'

const ExpenseCenters = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'खर्च केन्द्र', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={ExpenseCentersFormModal}
        fetchDataAPI={getExpenseCentersAPI}
        toggleStatusApi={toggleExpenseCentersStatusAPI}
        searchPlaceholder="खर्च केन्द्र खाेज्नुहाेस"
      />
    </Space>
  )
}

export default ExpenseCenters
