import { MASTER_SETTINGS_BASE_URL } from '../../constants'

import { ISharedMasterSetting } from '../../types/settings.types'

import { IParams } from '../../types/pagination.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getFinancialYearsAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/financial-years/`,
    params: {
      ordering: '-id', // latest data first
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addFinancialYearsAPI = (financialYearDetails: ISharedMasterSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/financial-years/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: financialYearDetails,
  })
}

export const editFinancialYearsByIdAPI = (
  id: number,
  updatedData: Partial<ISharedMasterSetting>
) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/financial-years/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleFinancialYearsStatusByIdAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/financial-years/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
