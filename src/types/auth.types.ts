export interface ILoginRequest {
  email: string
  password: string
}
export interface ILogoutRequest {
  refresh_token: string | null
}

export interface IForgotPasswordRequest {
  email: string
}
