import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Typography,
} from 'antd'

import { useEffect, useState } from 'react'
import { getFullWardsAPI } from '../../api/masterSettings/setting'
import { addUserAPI, editUserAPI } from '../../api/users'
import FormSwitch from '../../components/FormSwitch'
import { formStatusMessage, USER_ADD_SUCCESS, USER_EDIT_SUCCESS } from '../../messages'
import { IWardList } from '../../types/settings.types'
import { IUser } from '../../types/users.types'
import { handleAPIError, handleFormError } from '../../utils/errorHandler'
const { Title, Text } = Typography

export interface IFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  data: IUser | null
}

export const UserFormModal: React.FC<IFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
  data,
}) => {
  const [wards, setWards] = useState<IWardList[]>([])
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (data) {
      form.setFieldsValue(data)
    } else {
      form.resetFields()
    }
  }, [data, form, isOpen])

  useEffect(() => {
    getFullWardsAPI()
      .then(res => {
        setWards(res.data.data)
      })

      .catch(handleAPIError)
  }, [])

  const onFinish = (values: IUser) => {
    if (loading) {
      return
    }
    setLoading(true)

    const apiCall = data ? editUserAPI(data.id, values) : addUserAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: data ? USER_EDIT_SUCCESS : USER_ADD_SUCCESS,
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
  const handleClose = () => {
    form.resetFields()
    onClose()
  }
  return (
    <Modal
      maskClosable={false}
      title={
        <Title level={3} style={{ margin: '0px' }}>
          प्रयोगकर्ता
        </Title>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={false}
      width={'768px'}
    >
      <Divider style={{ marginTop: '0px' }} />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div style={{ paddingBottom: '20px' }}>
          <Title level={4} style={{ margin: '2px' }}>
            आधारभूत विवरण
          </Title>
          <Text>कृपया दर्ताको लागि आधारभूत जानकारी प्रविष्ट गर्नुहोस्।</Text>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="नाम" name="first_name" rules={[{ required: true }]}>
              <Input placeholder="नाम" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="थर" name="last_name" rules={[{ required: true }]}>
              <Input placeholder="थर" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="इमेल"
              name="email"
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
            >
              <Input placeholder="इमेल" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="फोन नम्बर"
              name="phone_number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="फोन नम्बर" />
            </Form.Item>
          </Col>
        </Row>
        <div style={{ paddingBottom: '20px' }}>
          <Title level={4} style={{ margin: '2px' }}>
            प्रयोगकर्ता भूमिका
          </Title>
          <Text>कृपया प्रयोगकर्ताको लागि निर्दिष्ट भूमिका तोक्नुहोस्</Text>
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="वडा नं." name="ward">
              <Select
                placeholder="वडा नं."
                showSearch
                optionFilterProp="label"
                options={wards.map(ward => ({
                  value: ward.id,
                  label: ward.ward_number,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="पद" name="position" rules={[{ required: true }]}>
              <Input placeholder="पद नाम" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="महाशाखा" name="department">
              <Input placeholder="महाशाखा" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="रा. प्र. स्तर" name="rps">
              <Input placeholder="रा. प्र. स्तर" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="भूमिका" name="role" rules={[{ required: true }]}>
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="भूमिका"
                options={[
                  {
                    value: 'ADMIN',
                    label: 'ADMIN',
                  },
                  {
                    value: 'PLANNING_DEPARTMENT',
                    label: 'PLANNING_DEPARTMENT',
                  },
                  {
                    value: 'ENGINEER',
                    label: 'ENGINEER',
                  },
                  {
                    value: 'WARD_OFFICE',
                    label: 'WARD_OFFICE',
                  },
                  {
                    value: 'WARD_ENGINEER',
                    label: 'WARD_ENGINEER',
                  },
                  {
                    value: 'USER_COMMITTEE',
                    label: 'USER_COMMITTEE',
                  },
                  {
                    value: 'DATA_ENTRY',
                    label: 'DATA_ENTRY',
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {data && (
              <Form.Item name="is_active" valuePropName="checked">
                <FormSwitch
                  label="स्थिति"
                  description={formStatusMessage('प्रयोगकर्ता')}
                  className="switch-green"
                />
              </Form.Item>
            )}
          </Col>
        </Row>
        <Flex justify="flex-end" gap={15} style={{ padding: '20px 0px' }}>
          <Button htmlType="button" onClick={handleClose}>
            रद्द गर्नुहोस्
          </Button>
          <Button loading={loading} type="primary" htmlType="submit">
            सेभ गर्नुहोस्
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}
