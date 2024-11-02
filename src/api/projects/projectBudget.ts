import { PROJECTS_URL } from '../../constants'
import { INormalizedBudget } from '../../types/projectBudget.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getprojectBudgetAPI = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/budget/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editprojectBudgetAPI = (id: number, body: INormalizedBudget) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/budget/`,
    method: 'PUT',
    data: body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
