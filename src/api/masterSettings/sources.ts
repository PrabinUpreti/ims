import { MASTER_SETTINGS_BASE_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { ISharedMasterSetting } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getSourcesAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sources/`,
    params: {
      ordering: '-id',
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addSourcesAPI = (sourcesDetails: ISharedMasterSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sources/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: sourcesDetails,
  })
}

export const editSourcesByIdAPI = (
  id: number,
  updatedData: Partial<ISharedMasterSetting>
) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sources/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleSourcesStatusByIdAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/sources/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
