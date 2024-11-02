import { Tabs, TabsProps } from 'antd'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { IProjectDetail } from '../../types/projects.types'
import { isProjectTabOpen } from '../../utils/projects'

interface IProjectHeaderProps {
  projectDetails: IProjectDetail
}

const tabItems = (isProjectDisable: boolean): TabsProps['items'] => [
  {
    key: 'details',
    label: 'कार्यक्रमको विवरण',
  },
  {
    key: 'cost-estimate',
    label: 'लागत आनुमान',
  },
  {
    key: 'user-committee-formation',
    label: 'उपभोक्त समिति गठन',
    disabled: isProjectDisable,
  },
  {
    key: 'project-contract',
    label: 'योजना सम्झौता',
    disabled: isProjectDisable,
  },
  {
    key: 'project-site',
    label: 'संचालन स्थल',
  },
  {
    key: 'project-payment-process',
    label: 'किस्ता भुक्तानी सम्बन्धी',
    disabled: isProjectDisable,
  },
  {
    key: 'other-documents',
    label: 'अन्य डकुमेन्ट',
  },
]

const ProjectTab: React.FC<IProjectHeaderProps> = ({ projectDetails }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const selectedKey = location.pathname.split('/').reverse()[0]
  const [isProjectDisable, setIsProjectDisable] = useState(true)

  useEffect(() => {
    if (isProjectTabOpen(projectDetails.status)) {
      setIsProjectDisable(false)
    } else {
      setIsProjectDisable(true)
    }
  }, [projectDetails])

  const onChange = (key: string) => {
    navigate(`/projects/${id}/${key}`, { replace: true })
  }

  return (
    <Tabs
      activeKey={selectedKey}
      items={tabItems(isProjectDisable)}
      onChange={onChange}
      style={{ marginBottom: 0 }}
      tabBarStyle={{
        paddingLeft: '24px',
      }}
    />
  )
}

export default ProjectTab
