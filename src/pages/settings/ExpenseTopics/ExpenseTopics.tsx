import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getExpenseTopicsAPI,
  toggleExpenseTopicsStatusAPI,
} from '../../../api/masterSettings/expenseTopics'
import { ISharedMasterSettingTable } from '../../../types/settings.types'
import MasterSettingTable from '../../shared/MasterSettingTable'
import ExpenseTopicsFormModal from './ExpenseTopicsFormModal'

const ExpenseTopics: React.FC = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'कार्यक्रम / आयोजना / कृयाकलापको नाम', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={ExpenseTopicsFormModal}
        fetchDataAPI={getExpenseTopicsAPI}
        toggleStatusApi={toggleExpenseTopicsStatusAPI}
        searchPlaceholder="खर्च शिर्षक खाेज्नुहाेस्"
      />
    </Space>
  )
}

export default ExpenseTopics
