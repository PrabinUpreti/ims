import { USER_PROFILE_URL, USER_URL } from '../constants'
import { IParams } from '../types/pagination.types'
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

export const getUsersAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: USER_URL,
    params: {
      ordering: '-id', // latest data first
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
export const addUserAPI = (body: IUser) => {
  const accessToken = getAccessToken()
  return request({
    url: USER_URL,
    data: body,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const deleteUserAPI = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${USER_URL}${id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editUserAPI = (id: number, data: IUser) => {
  const accessToken = getAccessToken()
  return request({
    url: `${USER_URL}${id}/`,
    method: 'PUT',
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editUserActiveStatusAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${USER_URL}${id}/`,
    method: 'PATCH',
    data: {
      is_active: isActive,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
