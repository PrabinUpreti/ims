import { USER_PROFILE_URL } from '../constants'
import { IUser } from '../types/users.types'
import { getAccessToken } from '../utils/tokenStorage'
import { request } from './_axios'

export const userProfileAPI = () => {
  const accessToken = getAccessToken()

  return request({
    url: USER_PROFILE_URL,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editUserProfileAPI = (body: Partial<IUser>) => {
  const accessToken = getAccessToken()
  return request({
    url: USER_PROFILE_URL,
    data: body,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editUserProfilePictureAPI = (body: FormData) => {
  const accessToken = getAccessToken()
  return request({
    url: USER_PROFILE_URL,
    data: body,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
