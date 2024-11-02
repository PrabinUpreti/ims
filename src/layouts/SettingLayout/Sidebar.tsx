import { SettingOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Divider, Layout, Menu, theme } from 'antd'
import type { MenuItemType } from 'antd/es/menu/interface'
import { useLocation, useNavigate } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import { Content } from 'antd/es/layout/layout'

const { Sider } = Layout

const items: MenuItemType[] = [
  { key: 'topics', title: 'विषयगत क्षेत्र' },
  { key: 'sub-topics', title: 'उप क्षेत्र' },
  { key: 'project-levels', title: 'योजनाको स्तर' },
  { key: 'expense-topics', title: 'खर्च शिर्षक' },
  { key: 'expense-centers', title: 'खर्च केन्द्र' },
  { key: 'sources', title: 'स्रोत' },
  { key: 'units', title: 'इकाई' },
  { key: 'financial-years', title: 'आर्थिक बर्ष' },
  { key: 'banks', title: 'बैंकहरू' },
]

const SideBar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = location.pathname.split('/').reverse()[0]

  const handleMenuClick: MenuProps['onClick'] = ({ key }: { key: string }) => {
    navigate(key)
  }

  const getSelectedLabel = (key: string) => {
    const item = items.find(item => item.key === key)
    return item?.title ?? ''
  }
  const selectedLabel = getSelectedLabel(selectedKey)

  const menuItems: MenuItemType[] = items.map(item => ({
    key: item.key as string,
    label: item.title as string,
    type: 'item',
  }))

  const {
    token: { lineType, colorBorderSecondary },
  } = theme.useToken()

  return (
    <Sider
      theme="light"
      width={260}
      style={{
        borderInlineEnd: lineType,
        borderColor: colorBorderSecondary,
        background: 'transparent',
      }}
    >
      <Content style={{ padding: '10px 24px' }}>
        <PageTitle
          title="सेटिंग्स"
          breadcrumbItems={[
            { key: 'settings', title: 'सेटिंग्स', icon: <SettingOutlined /> },
            { key: selectedKey, title: selectedLabel },
          ]}
        />
      </Content>
      <Divider style={{ margin: 0 }} />
      <Menu
        selectedKeys={[selectedKey]}
        mode="inline"
        items={menuItems}
        onClick={handleMenuClick}
        style={{ border: 'none', background: 'transparent', marginTop: '4px' }}
      />
    </Sider>
  )
}

export default SideBar
