import {
  CloseSquareOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LockOutlined,
  MoreOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Input,
  Layout,
  MenuProps,
  Modal,
  notification,
  Space,
  Tag,
  theme,
  Typography,
} from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { forgotPasswordAPI } from '../../api/auth'
import { deleteUserAPI, editUserActiveStatusAPI, getUsersAPI } from '../../api/users'
import { DEBOUNCE_MS, DEFAULT_PAGE_SIZE } from '../../constants'
import { PASSWORD_RESET_SUCCESS, USER_DELETE_SUCCESS } from '../../messages'
import { IUser, IUserTableData } from '../../types/users.types'
import { handleAPIError } from '../../utils/errorHandler'
import { UserDetailModal } from './UserDetailModal'
import { UserFormModal } from './UserFormModal'
import usePaginatedTableData from '../../hooks/usePaginatedTableData'
import IMSTable from '../../components/IMSTable'

const { Content } = Layout
const { Text } = Typography

const PAGE_SIZE = DEFAULT_PAGE_SIZE

const Users = () => {
  const [selectedData, setSelectedData] = useState<IUser | null>(null)

  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false)
  const {
    token: { colorBorder },
  } = theme.useToken()

  const {
    tableData,
    loading,
    pagination,
    fetchData,
    handlePaginationChange,
    handleSearch,
  } = usePaginatedTableData<IUserTableData>({
    apiCall: getUsersAPI,
    pageSize: PAGE_SIZE,
    onError: handleAPIError,
  })

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const columns = [
    {
      title: 'क्र.स.',
      dataIndex: 'sn',
      key: 'sn',
      width: 60,
      ellipsis: true,
    },
    {
      title: 'प्रयोगकर्ताको नाम ',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      render: (_: string, record: IUser) => (
        <Space>
          <Avatar
            shape="square"
            src={record.profile_picture ?? null}
            icon={!record.profile_picture && <UserOutlined />}
          />
          <Space direction="vertical" size={0}>
            <Text>{`${record.first_name} ${record.last_name}`}</Text>
            <Text style={{ color: colorBorder }}>{record.position}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'इमेल ',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'भूमिका',
      dataIndex: 'role',
      key: 'role',
      ellipsis: true,
    },
    {
      title: 'फोन नम्बर',
      dataIndex: 'phone_number',
      key: 'phone_number',
      ellipsis: true,
    },
    {
      title: 'वडा नं .',
      dataIndex: 'ward',
      key: 'ward',
      width: 100,
      ellipsis: true,
    },
    {
      title: 'स्थिति',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      ellipsis: true,
      render: (_: string, record: IUser) => (
        <Tag
          color={record.is_active ? 'green' : 'red'}
          key={record.is_active ? 'active' : 'Inactive'}
        >
          {record.is_active ? 'सक्रिय' : 'निष्क्रिय'}
        </Tag>
      ),
    },
    {
      title: 'अन्य',
      dataIndex: 'others',
      key: 'others',
      ellipsis: true,
      width: 100,
      render: (_: string, record: IUser) => (
        <Space size="small">
          <Button
            style={{ backgroundColor: '#f0f3ff', color: '#3B82F6' }}
            ghost
            shape="circle"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedData(record)
              setIsUserDetailModalOpen(true)
            }}
          />

          <Dropdown
            menu={{
              items: getMenuItems(record),
              onClick: key => onMenuClick(key, record),
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

  const getMenuItems = (user: IUser): MenuProps['items'] => {
    return [
      {
        label: 'इडिट गर्नुहोस',
        key: 'edit',
        icon: <EditOutlined />,
      },
      {
        label: 'पासवर्ड रिसेट गर्नुहोस्',
        key: 'resetPassword',
        icon: <LockOutlined />,
      },
      {
        label: `खाता ${user.is_active ? 'निष्क्रिय' : 'सक्रिय'} गर्नुहोस्`,
        key: 'deactivate',
        icon: <CloseSquareOutlined />,
      },
      {
        label: 'खाता डिलिट गर्नुहोस्',
        key: 'delete',
        icon: <DeleteOutlined />,
        danger: true,
      },
    ]
  }

  const onMenuClick = ({ key }: { key: string }, record: IUser) => {
    switch (key) {
      case 'edit':
        setSelectedData(record)
        setIsUserModalOpen(true)
        break
      case 'resetPassword':
        Modal.confirm({
          title: 'पुष्टि गर्नुहोस्',
          content: 'के तपाइँ यो प्रयोगकर्ताको पासवर्ड रिसेट गर्न चाहनुहुन्छ?',
          okText: 'रिसेट गर्नुहोस्',
          cancelText: 'रद्द गर्नुहोस्',
          okButtonProps: { danger: false },

          onOk: () =>
            forgotPasswordAPI({ email: record.email })
              .then(() => {
                notification.success({
                  message: PASSWORD_RESET_SUCCESS,
                })
              })
              .catch(handleAPIError),
          closable: true,
        })
        break
      case 'deactivate':
        Modal.confirm({
          title: 'पुष्टि गर्नुहोस्',
          content: `छानिएको प्रयोगकर्तालाई ${record.is_active ? 'निष्क्रिय' : 'सक्रिय'} गर्न चाहनुहुन्छ ?`,
          okText: `${record.is_active ? 'निष्क्रिय' : 'सक्रिय'} गर्नुहोस्`,
          cancelText: 'रद्द गर्नुहोस्',
          okButtonProps: { danger: record.is_active ? true : false },

          onOk: () =>
            editUserActiveStatusAPI(record.id, !record.is_active)
              .then(() => {
                notification.success({
                  message: `प्रयोगकर्ताको खाता ${record.is_active ? 'निष्क्रिय' : 'सक्रिय'} गरिएको छ!`,
                })
                fetchData()
              })
              .catch(handleAPIError),
          closable: true,
        })

        break
      case 'delete':
        Modal.confirm({
          title: 'पुष्टि गर्नुहोस्',
          content: 'के तपाइँ यो प्रयोगकर्तालाई मेटाउन निश्चित हुनुहुन्छ?',
          okText: 'मेट्नुहोस्',
          cancelText: 'रद्द गर्नुहोस्',
          okButtonProps: { danger: true },

          onOk: () =>
            deleteUserAPI(record.id)
              .then(() => {
                notification.success({
                  message: USER_DELETE_SUCCESS,
                })
                fetchData()
              })
              .catch(handleAPIError),
          closable: true,
        })
        break
      default:
        break
    }
  }
  const debounceSearch = debounce((value: string) => handleSearch(value), DEBOUNCE_MS)
  const handleClose = () => {
    setSelectedData(null)
    setIsUserModalOpen(false)
    setIsUserDetailModalOpen(false)
  }
  return (
    <div style={{ padding: '16px 24px' }}>
      <Flex justify="space-between">
        <Input
          style={{ width: '25%' }}
          placeholder="प्रयोगकर्ता  खाेज्नुहाेस्"
          size="middle"
          onChange={e => debounceSearch(e.target.value)}
        />
        <Space>
          <Button
            onClick={() => setIsUserModalOpen(true)}
            type="primary"
            size="middle"
            icon={<PlusOutlined />}
          >
            नयाँ प्रयोगकर्ता
          </Button>
        </Space>
      </Flex>
      <Content style={{ marginTop: '20px' }}>
        <IMSTable
          size="small"
          dataSource={tableData}
          columns={columns}
          pagination={{
            total: pagination.total,
            current: pagination.current,
            pageSize: PAGE_SIZE,
            onChange: handlePaginationChange,
          }}
          loading={loading}
        />
      </Content>
      <UserFormModal
        isOpen={isUserModalOpen}
        onClose={handleClose}
        onSuccess={fetchData}
        data={selectedData}
      />
      {selectedData && (
        <UserDetailModal
          isOpen={isUserDetailModalOpen}
          onClose={handleClose}
          onSuccess={fetchData}
          data={selectedData}
        />
      )}
    </div>
  )
}
export default Users
