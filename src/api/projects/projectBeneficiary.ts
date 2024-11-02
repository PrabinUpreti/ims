import { PROJECTS_URL } from '../../constants'
import { IProjectBeneficiary } from '../../types/projectBeneficiary.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getProjectBeneficiariesAPI = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/beneficiary/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const editProjectBeneficiariesAPI = (id: number, body: IProjectBeneficiary) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/beneficiary/`,
    method: 'PUT',
    data: body,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
