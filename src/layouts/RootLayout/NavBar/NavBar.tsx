import {
  BellOutlined,
  DownOutlined,
  EditOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Image,
  Layout,
  MenuProps,
  notification,
  Space,
  theme,
  Typography,
} from 'antd'

import { useNavigate } from 'react-router-dom'

import useAuth from '../../../auth/useAuth'

import { useState } from 'react'
import logo from '../../../assets/logo.png'
import { PAGE_TITLE } from '../../../constants'
import { LOGOUT_SUCCESS } from '../../../messages'
import { useStore } from '../../../store/context'
import { ChangePasswordModal } from './ChangePasswordModal'

const { Text } = Typography
const { Header } = Layout

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false)

  const {
    token: { colorBgContainer, lineType, colorBorderSecondary },
  } = theme.useToken()
  const { user } = useStore()

  const handleLogout = () => {
    logout()
    notification.success({
      message: LOGOUT_SUCCESS,
    })
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'प्रोफाइल',
      icon: <UserOutlined />,
    },
    {
      key: 'changePassword',
      label: 'पासवर्ड परिवर्तन',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'लगआउट',
      icon: <LogoutOutlined />,
    },
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile')
        break
      case 'changePassword':
        setIsChangePasswordModalOpen(true)
        break
      case 'logout':
        handleLogout()
        break
      default:
        break
    }
  }
  const handleClose = () => {
    setIsChangePasswordModalOpen(false)
  }

  return (
    <>
      <Header
        style={{
          background: colorBgContainer,
          borderBottom: lineType,
          borderColor: colorBorderSecondary,
          position: 'sticky',
          top: 0,
        }}
        className="navbar"
      >
        <Flex justify="space-between">
          <Flex align="center" className="logo">
            <Image preview={false} width={65} alt="image" src={logo} />

            <Text strong={true} className="logo-text">
              {PAGE_TITLE}
            </Text>
          </Flex>
          <Flex gap={40} align="center">
            {/* Will be put inside pariyojana latter */}
            {/* <Select
              defaultValue="२०८१-८२"
              onChange={a => console.log(a)}
              options={[
                { value: '२०८१-८२', label: '२०८१-८२' },
                { value: '२०८०-८१', label: '२०८०-८१' },
                { value: '२०७९-८०', label: '२०७९-८०' },
                { value: '२०७८-७९', label: '२०७८-७९' },
              ]}
            /> */}
            <Badge size="small" count={2}>
              <BellOutlined style={{ fontSize: '20px' }} />
            </Badge>
            {user && (
              <Dropdown
                className="profile-dropdown"
                menu={{ items: userMenuItems, onClick }}
              >
                <Space size={8}>
                  <Avatar
                    src={user.profile_picture ?? null}
                    icon={!user.profile_picture && <UserOutlined />}
                  />
                  {user.first_name + ' ' + user.last_name}
                  <DownOutlined style={{ fontSize: '14px' }} />
                </Space>
              </Dropdown>
            )}
          </Flex>
        </Flex>
      </Header>
      <ChangePasswordModal isOpen={isChangePasswordModalOpen} onClose={handleClose} />
    </>
  )
}
export default NavBar
