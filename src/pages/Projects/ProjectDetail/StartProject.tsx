import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Space,
  Typography,
} from 'antd'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { handleStartProject } from '../../../api/projects/projects'
import { useProjectID } from '../../../hooks/useProjectID'
import { PROJECT_START_SUCCESS } from '../../../messages'
import { IStartProjectPayload } from '../../../types/projects.types'
import { handleFormError } from '../../../utils/errorHandler'
import { isProjectTabOpen } from '../../../utils/projects'

const { Text } = Typography

interface IStartProjectButtonProps {
  projectStatus: string
}

interface IFunc {
  fetchProject: () => void
}

const StartProject: React.FC<IStartProjectButtonProps> = ({ projectStatus }) => {
  const [isProjectStartModalVisible, setIsProjectStartModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const { fetchProject } = useOutletContext<IFunc>()
  const projectId = useProjectID()

  // early return if project already started
  if (isProjectTabOpen(projectStatus)) {
    return null
  }

  const handleModalOpen = () => {
    setIsProjectStartModalVisible(true)
  }

  const handleModalClose = () => {
    form.resetFields()
    setIsProjectStartModalVisible(false)
  }

  const handleFormSubmit = async (values: IStartProjectPayload) => {
    if (loading) {
      return
    }

    setLoading(true)
    const apiCall = handleStartProject(projectId, values)

    apiCall
      .then(fetchProject)
      .then(() => {
        handleModalClose()
        notification.success({ message: PROJECT_START_SUCCESS })
      })
      .catch(err => handleFormError(form, err))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Button type="primary" onClick={handleModalOpen}>
        सुचारू गर्नुहोस्
      </Button>

      <Modal
        open={isProjectStartModalVisible}
        onCancel={handleModalClose}
        footer={null}
        title="यस योजनाका लागी खरिद प्रक्रिया चयन गर्नुहोस"
      >
        <Divider style={{ margin: '10px 0 14px 0' }} />
        <Form
          form={form}
          onFinish={handleFormSubmit}
          initialValues={{ execution_method: 'user committee' }}
        >
          <Form.Item name="execution_method">
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="user committee" defaultChecked>
                  उपभोक्ता समिति मार्फत
                </Radio>
                <Radio value="sealedBid" disabled>
                  सिलबन्धि धरभाउ पत्र मार्फत
                </Radio>
                <Radio value="tender" disabled>
                  बोलपत्र मार्फत
                </Radio>
                <Radio value="deposit" disabled>
                  अमानत मार्फत
                </Radio>
                <Radio value="directPurchase" disabled>
                  सोझै खरिद
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Text>
            माथि दिइएको प्रक्रियाबाट योजना सञ्चालन गर्न दिइएको बक्समा confirm लेख सुचारु
            बटन थिच्‌नुहोस ।
          </Text>

          <Flex justify="flex-end">
            <Form.Item
              name="confirm"
              style={{ margin: 0 }}
              rules={[{ required: true }]}
            >
              <Input style={{ width: '248px', marginRight: 8 }} placeholder="confirm" />
            </Form.Item>
            <Button type="primary" size="large" htmlType="submit" loading={loading}>
              सुचारु गर्नुहोस
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  )
}

export default StartProject
