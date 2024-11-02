import {
  DeleteOutlined,
  FileSearchOutlined,
  FormOutlined,
  MoreOutlined,
  PicCenterOutlined,
  PlusOutlined,
  RightOutlined,
} from '@ant-design/icons'
import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Modal,
  notification,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import { Content } from 'antd/es/layout/layout'
import { AxiosError } from 'axios'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getExpenseCentersAPI } from '../../api/masterSettings/expenseCenter'
import { getExpenseTopicsAPI } from '../../api/masterSettings/expenseTopics'
import { getFinancialYearsAPI } from '../../api/masterSettings/financialYears'
import { getProjectLevelAPI } from '../../api/masterSettings/projectlevel'
import { getFullWardsAPI } from '../../api/masterSettings/setting'
import { getSourcesAPI } from '../../api/masterSettings/sources'
import { getAllTopics } from '../../api/masterSettings/topics'
import { getUnitsAPI } from '../../api/masterSettings/units'
import { deleteProject, getProjects } from '../../api/projects/projects'
import IMSTable from '../../components/IMSTable'
import { DEBOUNCE_MS, DEFAULT_PAGE_SIZE } from '../../constants'
import usePaginatedTableData from '../../hooks/usePaginatedTableData'
import { PROJECT_DELETE_SUCCESS } from '../../messages'
import {
  IProjectFormModalData,
  IProjectList,
  IProjectTable,
} from '../../types/projects.types'
import { IWardList } from '../../types/settings.types'
import { handleAPIError } from '../../utils/errorHandler'
import { formatBudgetValueToNepali } from '../../utils/formatBudget'
import { displayWard } from '../../utils/wards'
import { ProjectDetailModal } from './ProjectDetailModal'
import ProjectFormModal from './ProjectFormModal'

const { Text } = Typography

const Projects = () => {
  const navigate = useNavigate()
  const PAGE_SIZE = DEFAULT_PAGE_SIZE
  const [isProjectFormModalOpen, setIsProjectFormModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [selectedProjectID, setSelectedProjectID] = useState<number | null>(null)

  const [projectFormModalData, setProjectFormModalData] =
    useState<IProjectFormModalData>({
      sources: [],
      expenseCenters: [],
      projectLevels: [],
      expenseTopics: [],
      units: [],
      wards: [],
      financialYears: [],
      topics: [],
    })

  const handleFetchAllData = useCallback(() => {
    const COMMON_PARAMS_FOR_FETCH_ALL = { limit: 'all', offset: 0, search: '' }
    Promise.all([
      getSourcesAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getExpenseCentersAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getProjectLevelAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getExpenseTopicsAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getUnitsAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getFullWardsAPI(),
      getFinancialYearsAPI(COMMON_PARAMS_FOR_FETCH_ALL),
      getAllTopics(),
    ])
      .then(
        ([
          sourcesRes,
          expenseCentersRes,
          projectLevelsRes,
          expenseTopicsRes,
          unitsRes,
          wardsRes,
          financialYearsRes,
          topicRes,
        ]) => {
          setProjectFormModalData({
            sources: sourcesRes.data.data,
            expenseCenters: expenseCentersRes.data.data,
            projectLevels: projectLevelsRes.data.data,
            expenseTopics: expenseTopicsRes.data.data,
            units: unitsRes.data.data,
            wards: wardsRes.data.data,
            financialYears: financialYearsRes.data.data,
            topics: topicRes.data.data,
          })
        }
      )
      .catch((err: AxiosError) => {
        handleAPIError(err)
      })
  }, [])

  useEffect(() => {
    handleFetchAllData()
  }, [handleFetchAllData])

  const {
    tableData,
    loading,
    pagination,
    fetchData,
    handlePaginationChange,
    handleSearch,
  } = usePaginatedTableData<IProjectTable>({
    apiCall: getProjects,
    pageSize: PAGE_SIZE,
    onError: handleAPIError,
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleDeleteClick = (record: IProjectList) => {
    Modal.confirm({
      title: 'पुष्टि गर्नुहोस्',
      content: 'के तपाइँ यो परियोजना मेटाउन निश्चित हुनुहुन्छ?',
      okText: 'डिलिट गर्नुहोस्',
      cancelText: 'रद्द गर्नुहोस्',
      okButtonProps: { danger: true },
      onOk: async () => {
        return deleteProject(record.id)
          .then(() => {
            notification.success({
              message: PROJECT_DELETE_SUCCESS,
            })
            fetchData()
          })
          .catch(handleAPIError)
      },
      closable: true,
    })
  }

  const columns = [
    { title: 'क्र.स', dataIndex: 'sn', width: '5%', key: 'sn' },
    {
      title: 'योजना तथा कार्यक्रम',
      dataIndex: 'name',
      key: 'name',
      width: '35%',
      render: (_: string, record: IProjectList) => (
        <Flex justify="space-between">
          <Text>{`${record.name}`}</Text>
          <Tooltip title="थप जानकारी">
            <FileSearchOutlined
              style={{ marginRight: 8 }}
              onClick={() => {
                setIsDetailModalOpen(true)
                setSelectedProjectID(record.id)
              }}
            />
          </Tooltip>
        </Flex>
      ),
    },
    {
      title: 'क्षेत्र',
      dataIndex: ['sub_topic', 'topic', 'title'],
      key: 'topic',
      width: '10%',
    },
    {
      title: 'उप क्षेत्र',
      dataIndex: ['sub_topic', 'title'],
      key: 'sub_topic',
      width: '10%',
    },
    {
      title: 'स्रोत',
      dataIndex: ['source', 'title'],
      key: 'source',
      width: '10%',
    },
    {
      title: 'खर्च केन्द्र',
      dataIndex: ['expense_center', 'title'],
      key: 'expense_center',
      width: '10%',
    },
    {
      title: 'बजेट',
      dataIndex: 'allocated_budget',
      key: 'allocated_budget',
      width: '10%',
      render: (value: string) => formatBudgetValueToNepali(value),
    },
    {
      title: 'वडा नं.',
      dataIndex: 'wards',
      key: 'wards',
      width: '15%',
      render: (wards: Partial<IWardList>[]) =>
        wards
          .map((ward: Partial<IWardList>) =>
            ward.ward_number !== undefined ? displayWard(ward.ward_number) : ''
          )
          .filter(Boolean)
          .join(', '),
    },
    { title: 'स्थिती', dataIndex: 'status', key: 'status', width: '10%' },
    {
      title: 'अन्य',
      dataIndex: 'others',
      key: 'others',
      width: 110,
      render: (_: string, record: IProjectList) => (
        <Space size="middle">
          <Button
            shape="circle"
            style={{
              backgroundColor: '#f0f3ff',
              color: '#3B82F6',
            }}
            icon={<RightOutlined style={{ fontSize: '16px' }} />}
            onClick={() => navigate(`${record.id}`)}
          />
          <Dropdown
            menu={{
              items: GetMenuItems(),
              onClick: key => onMenuClick(key, record),
            }}
            trigger={['click']}
          >
            <Button
              style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
              shape="circle"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </Space>
      ),
    },
  ]

  const GetMenuItems = (): MenuProps['items'] => {
    return [
      {
        label: 'इडिट गर्नुहोस',
        key: 'edit',
        icon: <FormOutlined />,
      },
      {
        label: 'डिलिट गर्नुहोस्',
        key: 'delete',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ]
  }

  const onMenuClick = ({ key }: { key: string }, record: IProjectList) => {
    switch (key) {
      case 'edit':
        setSelectedProjectID(record.id)
        setIsProjectFormModalOpen(true)
        break
      case 'delete':
        handleDeleteClick(record)
        break
      default:
        break
    }
  }

  const debounceSearch = debounce((value: string) => handleSearch(value), DEBOUNCE_MS)

  const handleClose = () => {
    setSelectedProjectID(null)
    setIsProjectFormModalOpen(false)
    setIsDetailModalOpen(false)
  }

  return (
    <Content style={{ padding: '16px 24px' }}>
      <Flex vertical>
        <Flex justify="space-between" style={{ paddingBottom: 10 }}>
          <Input
            style={{ width: '25%' }}
            placeholder="योजना तथा कार्यक्रम खाेज्नुहाेस्"
            size="middle"
            onChange={e => debounceSearch(e.target.value)}
          />
          <Space size="middle">
            <Button size="middle" icon={<PicCenterOutlined />}>
              फिल्टरहरु
            </Button>
            <Button
              type="primary"
              size="middle"
              icon={<PlusOutlined />}
              onClick={() => setIsProjectFormModalOpen(true)}
            >
              नयाँ परियोजना प्रविष्टी
            </Button>
          </Space>
        </Flex>
        <IMSTable
          columns={columns}
          dataSource={tableData}
          pagination={{
            total: pagination.total,
            current: pagination.current,
            pageSize: PAGE_SIZE,
            onChange: handlePaginationChange,
          }}
          loading={loading}
          scroll={{ x: 1200 }}
          style={{ marginTop: '8px' }}
        />
        <ProjectFormModal
          isOpen={isProjectFormModalOpen}
          onClose={handleClose}
          id={selectedProjectID}
          onSuccess={fetchData}
          modalData={projectFormModalData}
        />
        <ProjectDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleClose}
          id={selectedProjectID}
        />
      </Flex>
    </Content>
  )
}

export default Projects
