import { Space } from 'antd'
import { ColumnsType } from 'antd/es/table'
import {
  getFinancialYearsAPI,
  toggleFinancialYearsStatusByIdAPI,
} from '../../../api/masterSettings/financialYears'
import MasterSettingTable from '../../shared/MasterSettingTable'
import FinancialYearsFormModal from './FinancialYearsFormModal'
import { ISharedMasterSettingTable } from '../../../types/settings.types'

const FinancialYears: React.FC = () => {
  const columns: ColumnsType<ISharedMasterSettingTable> = [
    { title: 'क्र.स', dataIndex: 'sn', width: 70, key: 'sn' },
    { title: 'आर्थिक बर्ष', dataIndex: 'title', key: 'title' },
  ]

  return (
    <Space direction="vertical">
      <MasterSettingTable<ISharedMasterSettingTable>
        columns={columns}
        modalComponent={FinancialYearsFormModal}
        fetchDataAPI={getFinancialYearsAPI}
        toggleStatusApi={toggleFinancialYearsStatusByIdAPI}
        searchPlaceholder="आर्थिक बर्ष खाेज्नुहाेस्"
      />
    </Space>
  )
}

export default FinancialYears
