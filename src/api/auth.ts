import {
  CHANGE_PASSWORD_URL,
  FORGOT_PASSWORD_URL,
  LOGIN_URL,
  LOGOUT_URL,
} from '../constants'
import {
  IForgotPasswordRequest,
  ILoginRequest,
  ILogoutRequest,
} from '../types/auth.types'
import { IChangePasswordRequest } from '../types/navBar.types'
import { getAccessToken } from '../utils/tokenStorage'
import { request } from './_axios'

export const loginAPI = (loginDetails: ILoginRequest) =>
  request({ url: LOGIN_URL, method: 'POST', data: loginDetails })

export const logoutAPI = (logoutDetails: ILogoutRequest) => {
  const accessToken = getAccessToken()
  return request({
    url: LOGOUT_URL,
    method: 'POST',
    data: logoutDetails,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const forgotPasswordAPI = (forgotPasswordDetails: IForgotPasswordRequest) =>
  request({ url: FORGOT_PASSWORD_URL, method: 'POST', data: forgotPasswordDetails })

export const changePasswordAPI = (changePasswordDetails: IChangePasswordRequest) => {
  const accessToken = getAccessToken()

  return request({
    url: CHANGE_PASSWORD_URL,
    method: 'POST',
    data: changePasswordDetails,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
