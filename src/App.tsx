import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'

import { AuthProvider } from './auth/AuthProvider'
import router from './routes'
import StoreProvider from './store/StoreProvider'
import { validateMessages } from './messages'
import { IMSBaseErrorBoundary } from './components/IMSErrorBoundary'

const App = () => {
  return (
    <IMSBaseErrorBoundary>
      <ConfigProvider
        form={{ validateMessages }}
        theme={{
          token: {
            fontSize: 16,
            colorBgLayout: '#f9fafb',
          },
        }}
      >
        <StoreProvider>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </StoreProvider>
      </ConfigProvider>
    </IMSBaseErrorBoundary>
  )
}

export default App
