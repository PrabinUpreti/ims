import { Space, Tabs, TabsProps, Typography } from 'antd'
import { useState } from 'react'
import DocumentTable from '../../shared/DocumentTable'
import { StepCode } from '../../../constants'
const { Title } = Typography

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'पहिलो /पेश्की भुक्तानी ',
    children: <DocumentTable projectId={18} code={StepCode.PROJECT_PAYMENT_FIRST} />,
  },
  {
    key: '2',
    label: 'दोस्रो किस्ता भुक्तानी ',
    children: <DocumentTable projectId={18} code={StepCode.PROJECT_PAYMENT_SECOND} />,
  },
  {
    key: '3',
    label: 'अन्तिम किस्ता भुक्तानी ',
    children: <DocumentTable projectId={18} code={StepCode.PROJECT_PAYMENT_LAST} />,
  },
  {
    key: '4',
    label: 'भुक्तानी  विवरण',
    children: <DocumentTable projectId={18} code={StepCode.PROJECT_PAYMENT_DETAILS} />,
  },
]
const ProjectPayment = () => {
  const [activeKey, setActiveKey] = useState('1')
  const onTabChange = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={4} style={{ margin: '0px' }}>
        किस्ता भुक्तानी सम्बन्धी विवरण
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

export default ProjectPayment
