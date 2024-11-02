import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import PageLoading from '../../components/PageLoading'
import SideBar from './Sidebar'
import IMSErrorBoundary from '../../components/IMSErrorBoundary'

const SettingLayout = () => {
  return (
    <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
      <SideBar />
      <Content>
        <Suspense fallback={<PageLoading />}>
          <IMSErrorBoundary>
            <Outlet />
          </IMSErrorBoundary>
        </Suspense>
      </Content>
    </Layout>
  )
}

export default SettingLayout
