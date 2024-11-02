import { MASTER_SETTINGS_BASE_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { ISharedMasterSetting } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getAllTopics = (params?: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/topics/`,
    params: {
      ordering: '-id',
      ...params,
      limit: 'all',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
export const getTopicsAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/topics/`,
    params: {
      ordering: '-id', // latest data first
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addTopicsAPI = (topicsDetails: ISharedMasterSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/topics/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: topicsDetails,
  })
}

export const editTopicsByIdAPI = (
  id: number,
  updatedData: Partial<ISharedMasterSetting>
) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/topics/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleTopicStatusByIdAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/topics/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
