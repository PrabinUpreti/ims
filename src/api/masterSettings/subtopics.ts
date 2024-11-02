import { MASTER_SETTINGS_BASE_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { ISubTopics } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getAllSubTopicAPI = (topicID?: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sub-topics/`,
    params: {
      limit: 'all',
      topic: topicID,
      ordering: 'title',
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getSubTopicAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sub-topics/`,
    params: {
      ordering: '-id',
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addSubTopicAPI = (subTopicDetails: ISubTopics) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sub-topics/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: subTopicDetails,
  })
}

export const editSubTopicAPI = (id: number, updatedData: Partial<ISubTopics>) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sub-topics/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleSubTopicStatusAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sub-topics/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
