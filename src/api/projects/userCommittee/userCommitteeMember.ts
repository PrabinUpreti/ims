import { PROJECTS_URL } from '../../../constants'
import { getAccessToken } from '../../../utils/tokenStorage'
import { request } from '../../_axios'

export const getUserCommitteeMemberAPI = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/committeemember/`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
