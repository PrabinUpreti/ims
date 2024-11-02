import { COMMITTEE_DESCRIPTION_URL } from '../../../constants'
import { getAccessToken } from '../../../utils/tokenStorage'
import { request } from '../../_axios'

export const getUserCommitteeMemberDescription = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: COMMITTEE_DESCRIPTION_URL(id),
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
