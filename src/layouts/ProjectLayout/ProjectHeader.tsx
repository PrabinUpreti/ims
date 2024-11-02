import { HomeOutlined } from '@ant-design/icons'
import { Divider, Flex, Layout, Select } from 'antd'
import { MenuItemType } from 'antd/es/menu/interface'
import { Link, useLocation } from 'react-router-dom'
import PageTitle from '../../components/PageTitle'
import '../../styles/pages/projects/_projectheader.scss'
import { IProjectDetail } from '../../types/projects.types'
interface IProjectHeaderProps {
  projectDetails: IProjectDetail | null
}
const ProjectHeader: React.FC<IProjectHeaderProps> = ({ projectDetails }) => {
  const location = useLocation()
  const selectedKey = location.pathname.split('/').reverse()[0]

  if (!projectDetails) {
    return null
  }

  const items: MenuItemType[] = [
    { key: 'details', title: 'कार्यक्रमको विवरण' },
    { key: 'cost-estimate', title: 'लागत आनुमान' },
    { key: 'user-committee-formation', title: 'उपभोक्त समिति गठन' },
    { key: 'project-contract', title: 'योजना सम्झौता' },
    { key: 'project-site', title: 'संचालन स्थल' },
    { key: 'project-payment-process', title: 'किस्ता भुक्तानी सम्बन्धी' },
    { key: 'other-documents', title: 'अन्य डकुमेन्ट' },
    { key: 'extend-timeline', title: 'म्याद थप' },
  ]

  const moreInformationOptions = [
    { value: 'projectTitle', label: projectDetails.name },
    {
      value: 'allocatedCost',
      label: `विनियोजित लागत: ${projectDetails.allocated_budget}`,
    },
    {
      value: 'estimatedCost',
      label: `अनुमानि: ${projectDetails.estimated_budget}`,
    },
    { value: 'startDate', label: `सुरु मिति:` },
    { value: 'endDate', label: `सम्पन्न मिति:` },
    {
      value: 'agreementBudget',
      label: `सम्झौता बजेट: ${projectDetails.contract_budget}`,
    },
  ]

  const options = moreInformationOptions.map(moreInformation => ({
    value: moreInformation.value,
    label: (
      <div
        className={`option-item ${moreInformation.value === 'projectTitle' ? 'bold-label' : ''}`}
      >
        {moreInformation.label}
      </div>
    ),
    disabled: true,
  }))

  const getSelectedLabel = (key: string) => {
    const item = items.find(item => item.key === key)
    return item?.title ?? ''
  }
  const selectedLabel = getSelectedLabel(selectedKey)

  return (
    <>
      <Layout style={{ paddingLeft: '24px' }}>
        <Flex justify="space-between" align="center" style={{ paddingRight: '20px' }}>
          <PageTitle
            title={projectDetails.name}
            breadcrumbItems={[
              {
                key: 'home',
                title: <Link to={'/'}>Home</Link>,
                icon: <HomeOutlined />,
              },
              { key: 'परियोजनहरु', title: <Link to={'/projects'}> परियोजनहरु</Link> },
              { key: selectedKey, title: selectedLabel },
            ]}
          />
          <Select
            defaultValue="संक्षिप्त जानकारी"
            variant="borderless"
            style={{ flex: 1 }}
            popupMatchSelectWidth={false}
            options={[...options]}
          />
        </Flex>
      </Layout>
      <Divider style={{ margin: 0 }} />
    </>
  )
}

export default ProjectHeader
