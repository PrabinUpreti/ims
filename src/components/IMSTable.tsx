import { LoadingOutlined } from '@ant-design/icons'
import { Table, TableProps } from 'antd'
import { DATA_NOT_AVAILABLE } from '../messages'

interface IMSTableProps extends TableProps {
  loading?: boolean
  emptyText?: string
}

const IMSTable = ({
  loading,
  emptyText = DATA_NOT_AVAILABLE,
  pagination,
  ...props
}: IMSTableProps) => {
  if (pagination) {
    pagination.showSizeChanger = false
  }

  return (
    <Table
      size="middle"
      bordered
      pagination={pagination}
      // spinning loading
      loading={
        loading && {
          spinning: loading,
          indicator: <LoadingOutlined />,
        }
      }
      // empty data
      locale={{
        emptyText: (
          <div style={{ padding: '46px 0px', color: '#636363' }}>
            {!loading && emptyText}
          </div>
        ),
      }}
      {...props}
    />
  )
}

export default IMSTable
