import { PROJECTS_URL, START_PROJECT_URL } from '../../constants'
import { IParams } from '../../types/pagination.types'
import { IProjectDetail, IStartProjectPayload } from '../../types/projects.types'
import { getAccessToken } from '../../utils/tokenStorage'
import { request } from '../_axios'

export const getProjects = (params: IParams) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/`,
    params: {
      ordering: '-id',
      ...params,
    },
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const getProjectsById = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const deleteProject = (id: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const addProjectAPI = (body: Partial<IProjectDetail>) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  })
}

export const editProjectAPI = (id: number, body: Partial<IProjectDetail>) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${id}/`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: body,
  })
}

export const getDocumentsAPI = (projectId: number, code: number) => {
  const accessToken = getAccessToken()
  return request({
    url: `${PROJECTS_URL}/${projectId}/step/${code}/`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

export const handleStartProject = (id: number, data: Partial<IStartProjectPayload>) => {
  const accessToken = getAccessToken()
  return request({
    url: START_PROJECT_URL(id),
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: data,
  })
}
