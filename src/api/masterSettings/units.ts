import { MASTER_SETTINGS_BASE_URL } from '../../constants'

import { IParams } from '../../types/pagination.types'
import { IUnitsSetting } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getUnitsAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/units/`,
    params: {
      ordering: '-id', // latest data first
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addUnitsAPI = (unitsDetails: IUnitsSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/units/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: unitsDetails,
  })
}

export const editUnitsByIdAPI = (id: number, updatedData: Partial<IUnitsSetting>) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/units/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleUnitsStatusByIdAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/units/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
