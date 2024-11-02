import { MASTER_SETTINGS_BASE_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { ISharedMasterSetting } from '../../types/settings.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getProjectLevelAPI = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/project-levels/`,
    params: {
      ordering: '-id',
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addProjectLevelAPI = (projectLevelDetail: ISharedMasterSetting) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/project-levels/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: projectLevelDetail,
  })
}

export const editProjectLevelAPI = (
  id: number,
  updatedData: Partial<ISharedMasterSetting>
) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/project-levels/${id}/`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: updatedData,
  })
}

export const toggleProjectLevelStatusAPI = (id: number, isActive: boolean) => {
  const accessToken = getAccessToken()
  return request({
    url: `${MASTER_SETTINGS_BASE_URL}/project-levels/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      is_active: isActive,
    },
  })
}
