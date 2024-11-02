import { WARD_URL } from '../../constants'

import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getFullWardsAPI = () => {
  const accessToken = getAccessToken()
  return request({
    url: WARD_URL,
    params: { limit: 'all', ordering: 'ward_number' },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}
