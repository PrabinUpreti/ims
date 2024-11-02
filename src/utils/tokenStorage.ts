const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

// Access Token Functions
export const setAccessToken = (accessToken: string): void =>
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY)

export const clearAccessToken = (): void => localStorage.removeItem(ACCESS_TOKEN_KEY)

// Refresh Token Functions
export const setRefreshToken = (refreshToken: string): void =>
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY)

export const clearRefreshToken = (): void => localStorage.removeItem(REFRESH_TOKEN_KEY)
