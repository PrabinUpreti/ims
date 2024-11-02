import { Breadcrumb, Space, Typography } from 'antd'
import type { BreadcrumbItemType as AntdBreadcrumbItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { ReactNode } from 'react'

const { Title } = Typography

interface BreadcrumbItemType extends AntdBreadcrumbItemType {
  icon?: ReactNode
}

interface PageTitleProps {
  title: string
  breadcrumbItems: BreadcrumbItemType[]
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbItems }) => {
  const itemsWithIcons = breadcrumbItems.map(item => ({
    ...item,
    title: (
      <>
        {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
        {item.title}
      </>
    ),
  }))
  return (
    <Space.Compact block={true} direction="vertical">
      <Title level={4} style={{ margin: 0 }}>
        {title}
      </Title>
      <Breadcrumb separator=">" items={itemsWithIcons} style={{ color: '#000000E0' }} />
    </Space.Compact>
  )
}

export default PageTitle
