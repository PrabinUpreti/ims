import Sider from 'antd/es/layout/Sider'
import {
  CalendarOutlined,
  DatabaseOutlined,
  ExceptionOutlined,
  MessageOutlined,
} from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useProjectID } from '../../hooks/useProjectID'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem
}

const Sidebar = () => {
  const navigate = useNavigate()
  const projectId = useProjectID()
  const selectedKey = location.pathname.split('/').join('/')

  const items: MenuItem[] = [
    getItem('प्रगति तालिका', `/projects/${projectId}/exception`, <ExceptionOutlined />),
    getItem('मेसेज', `/projects/${projectId}/messages`, <MessageOutlined />),
    getItem(
      'म्याद थप ',
      `/projects/${projectId}/extend-timeline`,
      <CalendarOutlined />
    ),
    getItem(
      'लगत अनुमान परिमार्जन',
      `/projects/${projectId}/cost-estimate-modification`,
      <DatabaseOutlined />
    ),
  ]
  return (
    <Sider
      collapsed={true}
      style={{
        background: 'transparent',
        borderLeft: '1px solid lightgray',
      }}
    >
      <Menu
        style={{ height: '100%' }}
        selectedKeys={[`${selectedKey}`]}
        mode="inline"
        items={items}
        onClick={({ key }) => {
          navigate(key)
        }}
      />
    </Sider>
  )
}

export default Sidebar
