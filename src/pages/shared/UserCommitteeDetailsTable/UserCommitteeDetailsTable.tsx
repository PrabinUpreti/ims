import { Button, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { ISharedUserCommitteeDetails } from '../../../types/userDetails.types'
import { useCallback, useEffect, useState } from 'react'
import { handleAPIError } from '../../../utils/errorHandler'
import { AxiosResponse } from 'axios'
import { useProjectID } from '../../../hooks/useProjectID'
import { convertToNepali } from '../../../utils/nepaliConverter'
import IMSTable from '../../../components/IMSTable'

const { Title } = Typography

interface IUserCommitteeDetailsTableProps<T> {
  columns: ColumnsType<T>
  title: string
  fetchDataAPI: (id: number) => Promise<AxiosResponse<{ data: T[] }>>
}

const UserCommitteeDetailsTable = <T extends ISharedUserCommitteeDetails>({
  columns,
  title,
  fetchDataAPI,
}: IUserCommitteeDetailsTableProps<T>) => {
  const [dataSource, setDataSource] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const projectId = useProjectID()
  const fetchData = useCallback(() => {
    setLoading(true)
    fetchDataAPI(projectId)
      .then(res => {
        const tableData = res.data.data.map((item, index) => ({
          ...item,
          sn: convertToNepali(index + 1),
        }))
        setDataSource(tableData)
      })
      .catch(handleAPIError)
      .finally(() => setLoading(false))
  }, [fetchDataAPI, projectId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Flex justify="space-between" align="center">
        <Title level={4}>{title} :</Title>
        <Button type="primary" size="middle" icon={<PlusOutlined />}>
          नयाँ प्रविष्टी गर्नुहोस
        </Button>
      </Flex>
      <IMSTable
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={loading}
      />
    </>
  )
}

export default UserCommitteeDetailsTable
