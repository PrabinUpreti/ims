import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react'
import {
  clearAccessToken,
  clearRefreshToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '../utils/tokenStorage'
import { logoutAPI } from '../api/auth'

interface AuthContextProps {
  isLoggedIn: boolean
  isLoading: boolean
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = getAccessToken()
        setIsLoggedIn(Boolean(accessToken))
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = useCallback((accessToken: string, refreshToken: string) => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setIsLoggedIn(true)
  }, [])

  const logout = useCallback(() => {
    logoutAPI({ refresh_token: getRefreshToken() })
    clearAccessToken()
    clearRefreshToken()
    setIsLoggedIn(false)
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
