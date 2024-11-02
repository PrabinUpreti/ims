import { lazy, Suspense } from 'react'
import { NotAuthenticatedRoute } from '../../auth/routes'
import PageLoading from '../../components/PageLoading'

const Login = lazy(() => import('./Login'))

const ProtectedLogin = () => (
  <div style={{ height: '100vh' }}>
    <NotAuthenticatedRoute>
      <Suspense fallback={<PageLoading />}>
        <Login />
      </Suspense>
    </NotAuthenticatedRoute>
  </div>
)

export default ProtectedLogin
