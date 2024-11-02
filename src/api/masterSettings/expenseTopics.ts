import { MASTER_SETTINGS_BASE_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { ISharedMasterSetting } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getExpenseTopicsAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/expense-topics/`,
    params: {
      ordering: '-id',
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addExpenseTopicsAPI = (ExpenseTopicsDetail: ISharedMasterSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/expense-topics/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: ExpenseTopicsDetail,
  })
}

export const editExpenseTopicsAPI = (
  id: number,
  updatedData: Partial<ISharedMasterSetting>
) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/expense-topics/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleExpenseTopicsStatusAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/expense-topics/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
