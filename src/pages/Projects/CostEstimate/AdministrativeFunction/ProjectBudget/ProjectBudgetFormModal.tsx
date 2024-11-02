import {
  Button,
  Col,
  Divider,
  Form,
  InputNumber,
  Modal,
  notification,
  Row,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import { editDataSuccessMessage } from '../../../../../messages'
import { handleFormError } from '../../../../../utils/errorHandler'
import { useProjectID } from '../../../../../hooks/useProjectID'
import {
  INormalizedBudget,
  IProjectBudget,
} from '../../../../../types/projectBudget.types'
import { editprojectBudgetAPI } from '../../../../../api/projects/projectBudget'

const { Title } = Typography
const PERCENTAGE_FACTOR = 100

export interface IProjectBudgetFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  initialValues: INormalizedBudget
}
const validateMessages = {
  types: {
    number: 'यो विवरणमा संख्या हुनु पर्छ',
  },
  number: {
    min: 'यस विवरणमा शून्य भन्दा कम संख्या हुँदैन',
  },
}

export const ProjectBudgetFormModal: React.FC<IProjectBudgetFormProps> = ({
  open,
  onClose,
  onSuccess,
  initialValues,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const projectId = useProjectID()

  useEffect(() => {
    if (!open) {
      return
    }

    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form, open])
  const onValuesChange = (_: IProjectBudget, allValues: INormalizedBudget) => {
    const {
      municipality,
      user_committee: userCommittee,
      contingency_percent: contingencyPercent,
    } = allValues

    const totalCost = (municipality || 0) + (userCommittee || 0)

    const contingencyAmount =
      totalCost * ((contingencyPercent || 0) / PERCENTAGE_FACTOR)

    const totalEstimate = totalCost + contingencyAmount

    form.setFieldsValue({
      total_cost: totalCost,
      contingency_amount: contingencyAmount,
      total_estimate: totalEstimate,
    })
  }

  const handleSubmit = async (values: INormalizedBudget) => {
    if (loading) {
      return
    }

    setLoading(true)
    const defaultZeroValues = {
      ...values,
      municipality: values.municipality || 0,
      user_committee: values.user_committee || 0,
      contingency_percent: values.contingency_percent || 0,
      total_cost: values.total_cost || 0,
      contingency_amount: values.contingency_amount || 0,
      total_estimate: values.total_estimate || 0,
    }

    editprojectBudgetAPI(projectId, defaultZeroValues)
      .then(() => {
        notification.success({
          message: editDataSuccessMessage('लगत अनुमानको विवरण'),
        })
        form.resetFields()
        onSuccess()
        onClose()
      })
      .catch(err => handleFormError(form, err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal
      maskClosable={false}
      title={
        <Title level={4} style={{ margin: '0px' }}>
          लगत अनुमान
        </Title>
      }
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          रद्द गर्नुहोस
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={() => form.submit()}
        >
          सेभ गर्नुहोस
        </Button>,
      ]}
    >
      <Divider style={{ marginTop: '0px', marginBottom: '16px' }} />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label=" नगरपालिकाले व्यहोर्ने :"
              name="municipality"
              rules={[
                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber
                placeholder=" नगरपालिकाले व्यहोर्ने"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="उपभोक्त समितिले व्यहोर्ने :"
              name="user_committee"
              rules={[
                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber
                placeholder="उपभोक्त समितिले व्यहोर्ने"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="जम्मा लागत :" name="total_cost">
              <InputNumber
                disabled
                placeholder="जम्मा लागत"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="कन्टिनजेन्सि प्रतिशत :"
              name="contingency_percent"
              rules={[
                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber
                placeholder="कन्टिनजेन्सि प्रतिशत"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="कन्टिनजेन्सि रकम :" name="contingency_amount">
              <InputNumber
                disabled
                placeholder="कन्टिनजेन्सि रकम"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="कुल लागत आनुमान :" name="total_estimate">
              <InputNumber
                disabled
                placeholder="कुल लागत आनुमान"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
