import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { convertToNepali } from '../../../../../utils/nepaliConverter'
import { Button, Typography, Flex, Space } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { ProjectBeneficiaryFormModal } from './ProjectBeneficiaryFormModal'
import { getProjectBeneficiariesAPI } from '../../../../../api/projects/projectBeneficiary'
import {
  IProjectBeneficiary,
  IProjectBeneficiaryTable,
} from '../../../../../types/projectBeneficiary.types'
import { handleAPIError } from '../../../../../utils/errorHandler'
import { useProjectID } from '../../../../../hooks/useProjectID'
import IMSTable from '../../../../../components/IMSTable'
const { Title } = Typography

interface ProjectBeneficiaryProps {
  showAddButton?: boolean
}
const renderColumn = (text: string | null) => {
  if (text === null) {
    return '-'
  }
  return convertToNepali(text)
}

const columns = [
  {
    title: 'क्र.स.',
    dataIndex: 'sn',
    key: 'sn',
    width: 70,
    render: renderColumn,
  },
  {
    title: 'शिर्षक',
    dataIndex: 'topic',
    key: 'topic',
  },
  {
    title: 'महिला',
    dataIndex: 'female',
    key: 'female',
    render: renderColumn,
  },
  {
    title: 'पुरुष',
    dataIndex: 'male',
    key: 'male',
    render: renderColumn,
  },
  {
    title: 'अन्य',
    dataIndex: 'other',
    key: 'other',
    render: renderColumn,
  },
  {
    title: 'जम्मा',
    dataIndex: 'total',
    key: 'total',
    render: renderColumn,
  },
]

const transformBeneficiaryTableData = (
  beneficiary: IProjectBeneficiary
): IProjectBeneficiaryTable[] => {
  return [
    {
      sn: '1',
      key: 'totalFamily',
      topic: 'जम्मा परिवार',
      female: null,
      male: null,
      other: null,
      total: beneficiary.total_family,
    },
    {
      sn: '2',
      key: 'totalPopulation',
      topic: 'जम्मा जनसंख्या',
      female: beneficiary.total_female,
      male: beneficiary.total_male,
      other: beneficiary.total_other,
      total:
        beneficiary.total_female + beneficiary.total_male + beneficiary.total_other,
    },
    {
      sn: '3',
      key: 'aadivasiFamily',
      topic: 'आदिवासी जनजातिको परिवार संख्या',
      female: null,
      male: null,
      other: null,
      total: beneficiary.adhibasi,
    },
    {
      sn: '4',
      key: 'dalit',
      topic: 'दलित वर्गको परिवार संख्या',
      female: null,
      male: null,
      other: null,
      total: beneficiary.dalit,
    },
    {
      sn: '5',
      key: 'child',
      topic: 'बालबालिकाको जनसंख्या',
      female: beneficiary.child_female,
      male: beneficiary.child_male,
      other: beneficiary.child_other,
      total:
        beneficiary.child_female + beneficiary.child_male + beneficiary.child_other,
    },
    {
      sn: '6',
      key: 'others',
      topic: 'अन्य वर्गको परिवार संख्या',
      female: beneficiary.other_female,
      male: beneficiary.other_male,
      other: beneficiary.other_other,
      total:
        beneficiary.other_female + beneficiary.other_male + beneficiary.other_other,
    },
  ]
}

const ProjectBeneficiary: React.FC<ProjectBeneficiaryProps> = ({
  showAddButton = false,
}) => {
  const [beneficiary, setBeneficiary] = useState<IProjectBeneficiary | null>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const projectId = useProjectID()

  const fetchData = useCallback(() => {
    setLoading(true)
    getProjectBeneficiariesAPI(projectId)
      .then(res => {
        const fetchedBeneficiary = res.data.data
        setBeneficiary(fetchedBeneficiary)
      })
      .catch(handleAPIError)
      .finally(() => setLoading(false))
  }, [projectId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const tableData = useMemo(() => {
    if (!beneficiary || beneficiary.total_family === null) {
      return []
    }
    return transformBeneficiaryTableData(beneficiary)
  }, [beneficiary])

  const isDataAvailable = beneficiary && beneficiary.total_family !== null

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center">
        <Title level={4}>आयोजनाबाट लाभान्वित हुनेको विवरण :</Title>
        {showAddButton && (
          <Button
            type="primary"
            size="middle"
            icon={isDataAvailable ? <EditOutlined /> : <PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
          >
            {isDataAvailable ? 'इडिट गर्नुहोस्' : ' नयाँ प्रविष्टी गर्नुहोस '}
          </Button>
        )}
      </Flex>

      <IMSTable
        columns={columns}
        dataSource={tableData}
        pagination={false}
        loading={loading}
      />

      {showAddButton && (
        <ProjectBeneficiaryFormModal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSuccess={fetchData}
          initialValues={beneficiary}
        />
      )}
    </Space>
  )
}

export default ProjectBeneficiary
