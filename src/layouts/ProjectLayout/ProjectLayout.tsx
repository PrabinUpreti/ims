import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { Suspense, useCallback, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { getProjectsById } from '../../api/projects/projects'
import PageLoading from '../../components/PageLoading'
import { useProjectID } from '../../hooks/useProjectID'
import PageNotFound from '../../pages/PageNotFound'
import { IProjectDetail } from '../../types/projects.types'
import { handleAPIError } from '../../utils/errorHandler'
import ProjectHeader from './ProjectHeader'
import ProjectTab from './ProjectTab'
import Sidebar from './Sidebar'
import IMSErrorBoundary from '../../components/IMSErrorBoundary'

const ProjectLayout = () => {
  const projectId = useProjectID()
  const [projectDetails, setProjectDetails] = useState<IProjectDetail | null>(null)

  const [initialLoading, setInitialLoading] = useState(true)
  const fetchProject = useCallback(() => {
    return getProjectsById(projectId)
      .then(res => {
        setProjectDetails(res.data.data)
      })
      .catch(error => {
        handleAPIError(error)
      })
  }, [projectId])

  useEffect(() => {
    fetchProject().finally(() => setInitialLoading(false))
  }, [fetchProject])

  if (initialLoading) {
    return <PageLoading />
  }

  if (!projectDetails) {
    return <PageNotFound />
  }

  return (
    <Layout>
      <ProjectHeader projectDetails={projectDetails} />
      <Layout style={{ minHeight: '100vh' }}>
        <Content>
          <ProjectTab projectDetails={projectDetails} />
          <div style={{ padding: '0 24px 16px 24px' }}>
            <Suspense fallback={<PageLoading />}>
              <IMSErrorBoundary>
                <Outlet context={{ projectDetails, fetchProject }} />
              </IMSErrorBoundary>
            </Suspense>
          </div>
        </Content>
        <Sidebar />
      </Layout>
    </Layout>
  )
}

export default ProjectLayout
