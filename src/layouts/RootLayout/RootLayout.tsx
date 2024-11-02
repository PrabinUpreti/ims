import { Divider, Layout, notification, Space } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { AxiosError } from 'axios'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, Link, Outlet } from 'react-router-dom'
import { userProfileAPI } from '../../api/userProfile'
import { AuthenticatedRoute } from '../../auth/routes'
import useAuth from '../../auth/useAuth'
import PageLoading from '../../components/PageLoading'
import { HttpStatusCode } from '../../constants'
import { RESPONSE_ERROR, TOKEN_EXPIRED } from '../../messages'
import { useDispatch } from '../../store/context'
import { SET_USER } from '../../store/reducer'
import NavBar from './NavBar'
import SideBar from './SideBar'
import PageTitle from '../../components/PageTitle'
import { HomeOutlined } from '@ant-design/icons'
import IMSErrorBoundary from '../../components/IMSErrorBoundary'

interface IBreadcrumb {
  key: string
  label: string
  link?: string
}

const breadCrumbList: IBreadcrumb[] = [
  { key: 'projects', label: 'परियोजनाहरू' },
  { key: 'est', label: 'लागत आनुमान' },
  { key: 'report', label: 'रिपोटहरु' },
  { key: 'users', label: 'प्रयोगकर्ता' },
]

export default function RootLayout() {
  const dispatch = useDispatch()
  const { logout, isLoggedIn } = useAuth()
  const hasCheckedAuth = useRef(false)
  const [breadcrumb, setBreadcrumb] = useState<IBreadcrumb>()
  const location = useLocation()
  const selectedKey = location.pathname.split('/').reverse()[0]

  const handleUserError = useCallback(
    (err: AxiosError) => {
      if (err.response?.status !== HttpStatusCode.UNAUTHORIZED) {
        notification.error({
          message: RESPONSE_ERROR,
        })
        return
      }

      notification.error({
        message: TOKEN_EXPIRED,
      })
      dispatch({
        type: SET_USER,
        payload: null,
      })
      logout()
    },
    [dispatch, logout]
  )

  useEffect(() => {
    if (hasCheckedAuth.current || !isLoggedIn) {
      return
    }
    hasCheckedAuth.current = true

    userProfileAPI()
      .then(res => {
        if (res.status === HttpStatusCode.SUCCESS) {
          const userData = res.data.data
          dispatch({
            type: SET_USER,
            payload: userData,
          })
        }
      })
      .catch(handleUserError)
  }, [dispatch, handleUserError, isLoggedIn])

  useEffect(() => {
    const breadcrumb = breadCrumbList.filter(item => item.key === selectedKey)
    setBreadcrumb(breadcrumb[0])
  }, [selectedKey])

  return (
    <AuthenticatedRoute>
      <Layout style={{ height: '100vh' }}>
        <NavBar />
        <Layout style={{ height: '100vh' }}>
          <SideBar />
          <Content style={{ overflow: 'auto' }}>
            {breadcrumb && (
              <>
                <Space.Compact style={{ padding: '10px 24px' }}>
                  <PageTitle
                    title={breadcrumb.label}
                    breadcrumbItems={[
                      {
                        key: 'home',
                        title: <Link to="/">गृहपृष्ठ</Link>,
                        icon: <HomeOutlined />,
                      },
                      {
                        key: breadcrumb.key,
                        title: breadcrumb.label,
                      },
                    ]}
                  />
                </Space.Compact>
                <Divider style={{ margin: '0px' }} />
              </>
            )}
            <Suspense fallback={<PageLoading />}>
              <IMSErrorBoundary>
                <Outlet />
              </IMSErrorBoundary>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </AuthenticatedRoute>
  )
}
