import { Card, Flex, Tag } from 'antd'
interface DataType {
  id: string | number
  name: string
  region: string
  subRegion: string
  source: string
  costCenter: string
  budget: string
  ward_number: string | number
  status: string
  status_label: string
}

const ProjectsLists = () => {
  const dataSource = Array.from<DataType>({ length: 5 }).map<DataType>((_, i) => ({
    key: i,
    id: i,
    name: 'सभाहल निर्माणको लागि विस्तृत आयोजना प्रतिवेदन (DPR) तयारी',
    region: 'पुर्वाधार विकास',
    subRegion: 'सडक तथा यातायात ',
    source: 'आन्तरिक',
    costCenter: 'खर्च केन्द्र',
    budget: '1,00,000',
    ward_number: '1',
    status: '1',
    status_label: 'सुरु भैसकेको',
  }))
  return (
    <Card title="Ongoing Projects">
      <Flex vertical gap={20}>
        {/* <h6 className="dashboard-content-title">Projects</h6> */}
        {dataSource.map(elem => (
          <div className="project-card" key={elem.id}>
            <h6 className="title">{elem.name}</h6>
            <Flex justify="space-between">
              <span>रु {elem.budget}</span>
              <Tag color="green">{elem.status_label}</Tag>
            </Flex>
          </div>
        ))}
      </Flex>
    </Card>
  )
}

export default ProjectsLists
