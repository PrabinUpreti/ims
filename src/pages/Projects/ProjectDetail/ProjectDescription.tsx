import { Card, Descriptions, Flex, Typography } from 'antd'
import SecondaryButton from '../../../components/SecondaryButton'
import { convertToNepali } from '../../../utils/nepaliConverter'
import { IProjectDetailsProps } from './ProjectDetail'
import StartProject from './StartProject'
const { Title } = Typography

const ProjectDescription: React.FC<IProjectDetailsProps> = ({ projectDetails }) => {
  const nepaliNumbers = {
    code: convertToNepali(projectDetails.code),
    wards: convertToNepali(
      projectDetails.wards.map(ward => ward.ward_number).join(', ')
    ),
    financial_year: projectDetails.financial_year
      ? convertToNepali(projectDetails.financial_year.title)
      : '',
    allocated_budget: convertToNepali(projectDetails.allocated_budget),
    quantity: convertToNepali(projectDetails.quantity ?? ''),
    financial_progress: convertToNepali(projectDetails.financial_progress ?? ''),
    estimated_budget: convertToNepali(projectDetails.estimated_budget ?? ''),
    physical_progress: convertToNepali(projectDetails.physical_progress ?? ''),
    contract_budget: convertToNepali(projectDetails.contract_budget ?? ''),
  }

  return (
    <Card>
      <Flex vertical gap={0}>
        <Flex justify="end" align="center">
          <Flex gap={10}>
            <SecondaryButton />
            <StartProject projectStatus={projectDetails.status} />
          </Flex>
        </Flex>

        <Title level={4} style={{ margin: '16px 0' }}>
          आयोजनाको नाम: {projectDetails.name}
        </Title>

        <Descriptions
          column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
          labelStyle={{ color: 'black' }}
          contentStyle={{ fontWeight: 'bold' }}
        >
          <Descriptions.Item label="वडा न">{nepaliNumbers.wards}</Descriptions.Item>
          <Descriptions.Item label="आर्थिक बर्ष * ">
            {nepaliNumbers.financial_year}
          </Descriptions.Item>
          <Descriptions.Item label="विषयगत क्षेत्र ">
            {projectDetails.sub_topic.topic.title}
          </Descriptions.Item>
          <Descriptions.Item label="उप क्षेत् ">
            {projectDetails.sub_topic.title}
          </Descriptions.Item>
          <Descriptions.Item label="योजना सन्चालन स्थल">
            {projectDetails.location}
          </Descriptions.Item>
          <Descriptions.Item label="खर्च शिर्षक">
            {projectDetails.expense_center.title}
          </Descriptions.Item>
          <Descriptions.Item label="योजनको स्तर">
            {projectDetails.project_level.title}
          </Descriptions.Item>
          <Descriptions.Item label="विनियोजित लागत रु">
            {nepaliNumbers.allocated_budget}
          </Descriptions.Item>
          <Descriptions.Item label="स्रोत">
            {projectDetails.source.title}
          </Descriptions.Item>
          <Descriptions.Item label="सम्पन्न गर्ने परिमाण">
            {nepaliNumbers.quantity}
          </Descriptions.Item>
          <Descriptions.Item label="प्रोजेक्ट संचालन हुने आर्थिक वर्षहरु">
            {nepaliNumbers.financial_year}
          </Descriptions.Item>
          <Descriptions.Item label="योजना सुरु मिति">{''}</Descriptions.Item>
          <Descriptions.Item label="योजना सम्झौता मिति">{''}</Descriptions.Item>
          <Descriptions.Item label="सन्चालन स्थलको जियो कोडिनेट">
            {projectDetails.geo_coordinate}
          </Descriptions.Item>
          <Descriptions.Item label="अवस्था">{projectDetails.status}</Descriptions.Item>
          <Descriptions.Item label="योजना सम्पन्न हुने मिति">{''}</Descriptions.Item>
          <Descriptions.Item label="आर्थिक प्रगति">
            {nepaliNumbers.financial_progress}
          </Descriptions.Item>
          <Descriptions.Item label="अनुमानि लागत रु">
            {nepaliNumbers.estimated_budget}
          </Descriptions.Item>
          <Descriptions.Item label="नगरपालिकाले ब्यहेने रकम (कन्टेन्जेनसि बाहेक)">
            {''}
          </Descriptions.Item>
          <Descriptions.Item label="भौतिक प्रगति">
            {nepaliNumbers.physical_progress}
          </Descriptions.Item>
          <Descriptions.Item label="कन्टेन्जेनसि रकम">{''}</Descriptions.Item>
          <Descriptions.Item label="नगरपालिकाले ब्यहेर्ने रकम(कन्टेन्जनसि सहित)">
            {''}
          </Descriptions.Item>
          <Descriptions.Item label="सम्झौता बजेट">
            {nepaliNumbers.contract_budget}
          </Descriptions.Item>
          <Descriptions.Item label="उपभोक्ता समितिले ब्यहेर्ने रकम">
            {''}
          </Descriptions.Item>
        </Descriptions>
      </Flex>
    </Card>
  )
}

export default ProjectDescription
