import { FormOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Input, Space, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { AxiosResponse } from 'axios'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { IParams } from '../../../types/pagination.types'
import { ISharedMasterSetting } from '../../../types/settings.types'
import { handleAPIError } from '../../../utils/errorHandler'
import { DEBOUNCE_MS, DEFAULT_PAGE_SIZE } from '../../../constants'
import usePaginatedTableData from '../../../hooks/usePaginatedTableData'
import IMSTable from '../../../components/IMSTable'

const PAGE_SIZE = DEFAULT_PAGE_SIZE

interface MasterSettingTableProps<T> {
  columns: ColumnsType<T>
  modalComponent: React.ComponentType<{
    visible: boolean
    initialValues?: T | null
    onClose: () => void
    onSuccess: () => void
  }>
  searchPlaceholder: string
  fetchDataAPI: (
    params: IParams
  ) => Promise<AxiosResponse<{ data: T[]; count: number }, Partial<T>>>
  toggleStatusApi: (id: number, isActive: boolean) => Promise<AxiosResponse<Partial<T>>>
}

const MasterSettingTable = <T extends ISharedMasterSetting>({
  columns,
  modalComponent: ModalComponent,
  searchPlaceholder,
  fetchDataAPI,
  toggleStatusApi,
}: MasterSettingTableProps<T>): React.ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<T | null>(null)
  const {
    tableData,
    loading,
    pagination,
    setTableData,
    fetchData,
    handlePaginationChange,
    handleSearch,
  } = usePaginatedTableData<T>({
    apiCall: fetchDataAPI,
    pageSize: PAGE_SIZE,
    onError: handleAPIError,
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSwitchChange = async (id: number, isActive: boolean) => {
    const originalDataSource = tableData
    setTableData(prevData =>
      prevData.map(item => (item.id === id ? { ...item, is_active: isActive } : item))
    )
    toggleStatusApi(id, isActive).catch(err => {
      setTableData(originalDataSource)
      handleAPIError(err)
    })
  }

  const extendedColumns: ColumnsType<T> = [
    ...columns,
    {
      title: 'स्थिति',
      dataIndex: 'is_active',
      width: 90,
      key: 'is_active',
      render: (_: string, record: T) => (
        <Space>
          <Switch
            key={record.id}
            className="switch-green"
            checked={record.is_active}
            onChange={(checked: boolean) => handleSwitchChange(record.id, checked)}
            style={{ marginLeft: 8 }}
          />
        </Space>
      ),
    },
    {
      title: 'अन्य',
      dataIndex: 'others',
      ellipsis: true,
      width: 70,
      render: (_: string, record: T) => (
        <Button
          type="default"
          shape="circle"
          icon={<FormOutlined />}
          style={{ marginLeft: 8 }}
          onClick={() => handleEditClick(record)}
        />
      ),
    },
  ]

  const handleAddClick = () => {
    setSelectedRecord(null)
    setIsModalVisible(true)
  }

  const handleEditClick = (record: T) => {
    setSelectedRecord(record)
    setIsModalVisible(true)
  }

  const debounceSearch = debounce((value: string) => handleSearch(value), DEBOUNCE_MS)

  return (
    <Flex vertical style={{ padding: '0 16px' }}>
      <Flex justify="space-between" align="center" style={{ margin: '16px 0' }}>
        <Input
          style={{ width: '25%', padding: '6px 12px' }}
          placeholder={searchPlaceholder}
          size="middle"
          onChange={e => debounceSearch(e.target.value)}
        />
        <Button
          type="primary"
          size="middle"
          icon={<PlusOutlined />}
          onClick={handleAddClick}
        >
          नयाँ प्रविष्टी
        </Button>
      </Flex>
      <IMSTable
        columns={extendedColumns}
        dataSource={tableData}
        pagination={{
          total: pagination.total,
          current: pagination.current,
          pageSize: PAGE_SIZE,
          onChange: handlePaginationChange,
        }}
        loading={loading}
      />
      <ModalComponent
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        initialValues={selectedRecord}
        onSuccess={fetchData}
      />
    </Flex>
  )
}

export default MasterSettingTable
