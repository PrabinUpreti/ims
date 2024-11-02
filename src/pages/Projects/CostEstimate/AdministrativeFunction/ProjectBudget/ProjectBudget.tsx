import React, { useCallback, useEffect, useState } from 'react'
import { Button, Typography, Flex, Descriptions, Card, Spin } from 'antd'
import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { ProjectBudgetFormModal } from './ProjectBudgetFormModal'

import { handleAPIError } from '../../../../../utils/errorHandler'
import { useProjectID } from '../../../../../hooks/useProjectID'
import { getprojectBudgetAPI } from '../../../../../api/projects/projectBudget'
import {
  INormalizedBudget,
  IProjectBudget,
} from '../../../../../types/projectBudget.types'
import { convertToNepali } from '../../../../../utils/nepaliConverter'
const { Title } = Typography
const PERCENTAGE_FACTOR = 100
const FIXED_NUMBER = 2

const ProjectBudget: React.FC = () => {
  const [budget, setBudget] = useState<INormalizedBudget>()
  const [loading, setLoading] = useState(false)
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false)
  const projectId = useProjectID()

  const fetchData = useCallback(() => {
    setLoading(true)
    getprojectBudgetAPI(projectId)
      .then(res => {
        const fetchedBudget: IProjectBudget = res.data.data

        const toNumberOrZero = (value: string | number) =>
          isNaN(Number(value)) ? 0 : Number(value)

        const normalizedBudget: INormalizedBudget = {
          ...fetchedBudget,
          id: fetchedBudget.id,
          total_cost: toNumberOrZero(fetchedBudget.total_cost),
          municipality: toNumberOrZero(fetchedBudget.municipality),
          user_committee: toNumberOrZero(fetchedBudget.user_committee),
          quantity: toNumberOrZero(fetchedBudget.quantity),
          contingency_percent: toNumberOrZero(fetchedBudget.contingency_percent),
          contingency_amount: toNumberOrZero(fetchedBudget.contingency_amount),
          total_estimate: toNumberOrZero(fetchedBudget.total_estimate),
        }

        const totalCost =
          normalizedBudget.municipality + normalizedBudget.user_committee
        const contingencyAmount =
          (totalCost * normalizedBudget.contingency_percent) / PERCENTAGE_FACTOR
        const totalEstimate = totalCost + contingencyAmount
        setBudget({
          ...normalizedBudget,
          total_cost: totalCost,
          contingency_amount: contingencyAmount,
          total_estimate: totalEstimate,
        })
      })
      .catch(handleAPIError)
      .finally(() => setLoading(false))
  }, [projectId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Card>
          <Flex justify="space-between" align="center">
            <Title level={4} style={{ margin: '16px 0' }}>
              लगत अनुमान तथा अन्य विवरण:
            </Title>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => setIsBudgetModalVisible(true)}
            >
              इडिट गर्नुहोस
            </Button>
          </Flex>

          <Descriptions
            column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
            labelStyle={{ color: 'black' }}
            contentStyle={{ fontWeight: 'bold' }}
          >
            {budget ? (
              <>
                <Descriptions.Item label="नगरपालिकाले व्यहोर्ने">
                  {budget.municipality
                    ? convertToNepali(budget.municipality.toFixed(FIXED_NUMBER))
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="कन्टिनजेन्सि प्रतिशत">
                  {budget.contingency_percent
                    ? `${convertToNepali(budget.contingency_percent.toFixed(FIXED_NUMBER))} %`
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="उपभोक्त समितिले व्यहोर्ने">
                  {budget.user_committee
                    ? convertToNepali(budget.user_committee.toFixed(FIXED_NUMBER))
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="कन्टिनजेन्सि रकम">
                  {budget.contingency_amount
                    ? convertToNepali(budget.contingency_amount.toFixed(FIXED_NUMBER))
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="जम्मा लगत">
                  {budget.total_cost
                    ? convertToNepali(budget.total_cost.toFixed(FIXED_NUMBER))
                    : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="कुल लागत आनुमान">
                  {budget.total_estimate
                    ? convertToNepali(budget.total_estimate.toFixed(FIXED_NUMBER))
                    : '-'}
                </Descriptions.Item>
              </>
            ) : (
              <>
                <Descriptions.Item label="नगरपालिकाले व्यहोर्ने"> -</Descriptions.Item>
                <Descriptions.Item label="कन्टिनजेन्सि प्रतिशत">-</Descriptions.Item>
                <Descriptions.Item label="उपभोक्त समितिले व्यहोर्ने">
                  -
                </Descriptions.Item>
                <Descriptions.Item label="कन्टिनजेन्सि रकम">-</Descriptions.Item>
                <Descriptions.Item label="जम्मा लगत">-</Descriptions.Item>
                <Descriptions.Item label="कुल लागत आनुमान">-</Descriptions.Item>
              </>
            )}
          </Descriptions>
        </Card>
        {budget && (
          <ProjectBudgetFormModal
            open={isBudgetModalVisible}
            onClose={() => setIsBudgetModalVisible(false)}
            onSuccess={fetchData}
            initialValues={budget}
          />
        )}
      </Spin>
    </>
  )
}

export default ProjectBudget
