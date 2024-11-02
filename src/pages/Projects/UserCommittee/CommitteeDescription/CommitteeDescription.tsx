import { EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Card, Descriptions, Flex, Spin, Typography } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useProjectID } from '../../../../hooks/useProjectID'
import { handleAPIError } from '../../../../utils/errorHandler'
import { convertToNepali } from '../../../../utils/nepaliConverter'
import { IUserCommitteeDescription } from '../../../../types/committeeDescription.types'
import { getUserCommitteeMemberDescription } from '../../../../api/projects/userCommittee/userCommitteeDescription'

const { Title } = Typography

const CommitteeDescription = () => {
  const [loading, setLoading] = useState(false)
  const [committeeDescription, setCommitteeDescription] =
    useState<IUserCommitteeDescription>()
  const projectId = useProjectID()

  const fetchCommitteeMember = useCallback(() => {
    setLoading(true)
    getUserCommitteeMemberDescription(projectId)
      .then(res => {
        setCommitteeDescription(res.data.data)
      })
      .catch(handleAPIError)
      .finally(() => setLoading(false))
  }, [projectId])

  useEffect(() => {
    fetchCommitteeMember()
  }, [fetchCommitteeMember])

  const displayEmptyValue = (value: string | null) => {
    return value && value.trim() !== '' ? value : '-'
  }

  return (
    <Flex>
      <Spin spinning={loading} indicator={<LoadingOutlined />}>
        <Flex justify="space-between" align="center">
          <Title level={4} style={{ margin: '16px 0' }}>
            उपभोक्ता समितिको विवरण :
          </Title>
          <Button icon={<EditOutlined />} type="primary">
            इडिट गर्नुहोस
          </Button>
        </Flex>
        {committeeDescription && (
          <>
            <Card>
              <Descriptions
                column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                labelStyle={{
                  color: 'black',
                  fontWeight: 'bold',
                }}
                layout="vertical"
              >
                <Descriptions.Item
                  label="उपभोक्ता समितिको नाम"
                  style={{ paddingBottom: 0 }}
                >
                  {displayEmptyValue(committeeDescription.name)}
                </Descriptions.Item>
                <Descriptions.Item label="ठेगाना" style={{ paddingBottom: 0 }}>
                  {displayEmptyValue(committeeDescription.address)}
                </Descriptions.Item>
                <Descriptions.Item label="गठन मिति" style={{ paddingBottom: 0 }}>
                  {displayEmptyValue(
                    committeeDescription.date
                      ? convertToNepali(committeeDescription.date)
                      : ''
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
            <Card>
              <Descriptions
                column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
                labelStyle={{ color: 'black', fontWeight: 'bold' }}
                layout="vertical"
              >
                <Descriptions.Item label="प्रतीनिधिको नाम" style={{ paddingBottom: 0 }}>
                  {displayEmptyValue(committeeDescription.representative_name)}
                </Descriptions.Item>
                <Descriptions.Item label="प्रतीनिधिको पद" style={{ paddingBottom: 0 }}>
                  {displayEmptyValue(committeeDescription.representative_role)}
                </Descriptions.Item>
                <Descriptions.Item label="सम्पर्क नं." style={{ paddingBottom: 0 }}>
                  {displayEmptyValue(
                    convertToNepali(committeeDescription.phone_number)
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </>
        )}
      </Spin>
    </Flex>
  )
}

export default CommitteeDescription
