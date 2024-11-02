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
import { editDataSuccessMessage, getEmptyFieldMessage } from '../../../../../messages'
import { editProjectBeneficiariesAPI } from '../../../../../api/projects/projectBeneficiary'
import { handleFormError } from '../../../../../utils/errorHandler'
import { IProjectBeneficiary } from '../../../../../types/projectBeneficiary.types'
import { useProjectID } from '../../../../../hooks/useProjectID'

const { Title } = Typography

export interface IProjectBeneficiaryFormProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  initialValues: IProjectBeneficiary | null
}

export const ProjectBeneficiaryFormModal: React.FC<IProjectBeneficiaryFormProps> = ({
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

  const handleSubmit = async (values: IProjectBeneficiary) => {
    if (loading) {
      return
    }

    setLoading(true)

    editProjectBeneficiariesAPI(projectId, values)
      .then(() => {
        notification.success({
          message: editDataSuccessMessage('लाभान्वितको विवरण'),
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
          आयोजनाबाट लाभान्वितको विवरण :
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
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Title level={5} style={{ margin: '0px' }}>
          जम्मा परिवार संख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="total_family"
              rules={[
                { required: true },
                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="जम्मा" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '0', marginBottom: '16px' }} />
        <Title level={5} style={{ margin: '0px' }}>
          जम्मा जनसंख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="total_female"
              rules={[
                { required: true, message: getEmptyFieldMessage('महिला') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="महिला" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="total_male"
              rules={[
                { required: true, message: getEmptyFieldMessage('पुरुष') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="पुरुष" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="total_other"
              rules={[
                { required: true, message: getEmptyFieldMessage('अन्य') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="अन्य" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '0', marginBottom: '16px' }} />
        <Title level={5} style={{ margin: '0px' }}>
          आदिवासी जनजातिको परिवार संख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="adhibasi"
              rules={[
                { required: true, message: getEmptyFieldMessage('जम्मा') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="जम्मा" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '0', marginBottom: '16px' }} />
        <Title level={5} style={{ margin: '0px' }}>
          दलित वर्गको परिवार संख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="dalit"
              rules={[
                { required: true, message: getEmptyFieldMessage('जम्मा') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="जम्मा" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '0', marginBottom: '16px' }} />
        <Title level={5} style={{ margin: '0px' }}>
          बालबालिकाको जनसंख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="child_female"
              rules={[
                { required: true, message: getEmptyFieldMessage('महिला') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="महिला" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="child_male"
              rules={[
                { required: true, message: getEmptyFieldMessage('पुरुष') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="पुरुष" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="child_other"
              rules={[
                { required: true, message: getEmptyFieldMessage('अन्य') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="अन्य" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
        <Divider dashed style={{ margin: '0', marginBottom: '16px' }} />
        <Title level={5} style={{ margin: '0px' }}>
          अन्य वर्गको परिवार संख्या :
        </Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="other_female"
              rules={[
                { required: true, message: getEmptyFieldMessage('महिला') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="महिला" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="other_male"
              rules={[
                { required: true, message: getEmptyFieldMessage('पुरुष') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="पुरुष" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="other_other"
              rules={[
                { required: true, message: getEmptyFieldMessage('अन्य') },

                {
                  type: 'number',
                  min: 0,
                },
              ]}
            >
              <InputNumber placeholder="अन्य" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
