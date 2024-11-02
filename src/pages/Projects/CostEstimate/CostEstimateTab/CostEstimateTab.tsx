import { Space, Tabs, TabsProps, Typography } from 'antd'
import { useState } from 'react'
import AdministrativeFunction from '../AdministrativeFunction'
const { Title } = Typography

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'लागत आनुमानको प्रशासनिक कार्य',
    children: <AdministrativeFunction />,
  },
  {
    key: '2',
    label: 'मेजेर्मेन्ट सिट',
    children: 'मेजेर्मेन्ट सिट',
  },
  {
    key: '3',
    label: 'मात्राको बिल',
    children: 'मात्राको बिल',
  },
]
const CostEstimateTab = () => {
  const [activeKey, setActiveKey] = useState('1')
  const onTabChange = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={4} style={{ margin: '0px' }}>
        लागत आनुमान सम्बन्धी विवरण
      </Title>
      <Tabs
        activeKey={activeKey}
        onChange={onTabChange}
        className="button-tabs"
        items={items}
        tabBarGutter={16}
      />
    </Space>
  )
}

export default CostEstimateTab
