import {
  BarChartOutlined,
  FileExcelOutlined,
  HomeOutlined,
  LeftOutlined,
  ProjectOutlined,
  RightOutlined,
  SettingOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('ड्यासबोर्ड', '/dashboard', <HomeOutlined />),
  getItem('परियोजनाहरू ', '/projects', <ProjectOutlined />),
  getItem('लागत आनुमान ', '/est', <FileExcelOutlined />),
  getItem('रिपोटहरु', '/report', <BarChartOutlined />),
  getItem('सेटिंग्स ', '/setting', <SettingOutlined />),
  getItem('प्रयोगकर्ता ', '/users', <UserAddOutlined />),
]

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = location.pathname.split('/')[1]
  const {
    token: { lineType, colorBorderSecondary },
  } = theme.useToken()
  return (
    <Sider
      style={{
        borderInlineEnd: lineType,
        borderColor: colorBorderSecondary,
        position: 'sticky',
        top: '0px',
      }}
      theme="light"
      collapsible={false}
      collapsed={collapsed}
      onCollapse={value => setCollapsed(value)}
    >
      <div className="sidebar">
        <Menu
          theme="light"
          selectedKeys={[`/${selectedKey}`]}
          mode="inline"
          items={items}
          onClick={({ key }) => {
            navigate(key)
          }}
        />

        <Button
          className="toggle"
          shape="circle"
          style={{ fontSize: '14px', minWidth: '28px', height: '28px' }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </Button>
      </div>
    </Sider>
  )
}

export default SideBar
