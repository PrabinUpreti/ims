import { Button, Dropdown, Flex, Space, TableProps, Typography } from 'antd'
import IMSTable from '../../../components/IMSTable'
import {
  CheckCircleOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  LoginOutlined,
  MoreOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { useCallback, useEffect, useState } from 'react'
import { getDocumentsAPI } from '../../../api/projects/projects'
import { handleAPIError } from '../../../utils/errorHandler'
import { convertToNepali } from '../../../utils/nepaliConverter'
import { IDocumentTable, ISteps } from '../../../types/documentTable.types'
import { isNil } from 'lodash'

const { Title, Text } = Typography

interface IDocumentTableProps extends TableProps {
  projectId: number
  code: number
  showTitle?: boolean
}

const getMenuItems = () => {
  return [
    {
      label: 'इडिट गर्नुहोस',
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: 'स्वीकृतिको लागि पठाउनुहोस्',
      key: 'approveRequest',
      icon: <LoginOutlined />,
    },
    {
      label: 'प्रमाणित  गर्नुहोस',
      key: 'verify',
      icon: <CheckCircleOutlined />,
    },
    {
      label: 'डिलिट गर्नुहोस्',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ]
}

const DocumentTable = ({ code, projectId, showTitle = true }: IDocumentTableProps) => {
  const [steps, setSteps] = useState<ISteps | null>(null)
  const [loading, setLoading] = useState(false)
  const [dataTable, setDataTable] = useState<IDocumentTable[]>([])

  const renderColumn = (text: string | null) => {
    if (isNil(text)) {
      return '-'
    }
    return convertToNepali(text)
  }

  const columns = [
    {
      title: 'क्र.स.',
      dataIndex: 'sn',
      key: 'sn',
      width: 70,
      render: renderColumn,
    },
    {
      title: 'शिर्षक',
      dataIndex: 'topic',
      key: 'topic',
      render: (_: string, record: IDocumentTable) => (
        <Space direction="vertical" size={0}>
          <Text>{`${record.topic}`}</Text>
          {record.subTopic && (
            <Text style={{ fontSize: '12px' }}>{`(${record.subTopic})`}</Text>
          )}
        </Space>
      ),
    },
    {
      title: 'मिति',
      dataIndex: 'date',
      key: 'date',
      render: renderColumn,
    },
    {
      title: 'स्थिती',
      dataIndex: 'status',
      key: 'status',
      render: renderColumn,
    },
    {
      title: 'कैफियत',
      dataIndex: 'remark',
      key: 'remark',
      render: renderColumn,
    },
    {
      title: 'अन्य',
      dataIndex: 'other',
      key: 'other',
      width: 100,
      render: () => (
        <Space size="small">
          <Button
            style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
            ghost
            shape="circle"
            icon={<UploadOutlined />}
            onClick={() => ''}
          />

          <Button
            style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
            ghost
            shape="circle"
            icon={<DownloadOutlined />}
            onClick={() => ''}
          />

          <Button
            style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
            ghost
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => ''}
          />

          <Dropdown
            menu={{
              items: getMenuItems(),
              onClick: () => '',
            }}
            trigger={['click']}
          >
            <Button
              style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
              ghost
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </Space>
      ),
    },
  ]

  const fetchData = useCallback(() => {
    setLoading(true)
    getDocumentsAPI(projectId, code)
      .then(res => {
        const steps: ISteps = res.data.data
        setSteps(steps)
        const tableList: IDocumentTable[] = steps.steps.map((data, index) => ({
          // TODO: added random field just to fill the table gap, since backend is not ready, need to implement correct field in future

          key: data.title,
          sn: index + 1,
          id: data.id,
          topic: data.title,
          subTopic: data.sub_title,
          date: '',
          status: data.status,
          remark: '',
        }))
        setDataTable(tableList)
      })
      .catch(handleAPIError)
      .finally(() => setLoading(false))
  }, [projectId, code])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    steps && (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Flex justify="space-between" align="center">
          {showTitle && <Title level={4}>{steps.title}</Title>}

          {/* TODO: Need to discuss if this button required  */}
          {/* <Button type="primary" size="middle" icon={<PlusOutlined />} onClick={() => ''}>
          नयाँ प्रविष्टी गर्नुहोस
        </Button> */}
        </Flex>
        <IMSTable
          loading={loading}
          dataSource={dataTable}
          pagination={false}
          columns={columns}
        />
      </Space>
    )
  )
}
export default DocumentTable
