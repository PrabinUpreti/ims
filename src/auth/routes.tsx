import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'
import PageLoading from '../components/PageLoading'

interface IRouteProps {
  children: React.ReactNode
}

export const AuthenticatedRoute: FC<IRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoading />
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

export const NotAuthenticatedRoute: FC<IRouteProps> = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth()

  if (isLoading) {
    return <PageLoading />
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
