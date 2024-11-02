import { InfoCircleOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  notification,
  Space,
  Typography,
} from 'antd'
import { FC, useState } from 'react'
import { changePasswordAPI } from '../../../api/auth'
import {
  CHANGE_PASSWORD_MODAL_TITLE,
  CURRENT_PASSWORD,
  NEW_PASSWORD_CONFIRM_ERROR,
  NEW_PASSWORD_CONFIRM_TEXT,
  NEW_PASSWORD_TEXT,
  PASSWORD_CHANGE_SUCCESS,
  RESET_PASSWORD_ALERT_INFO,
} from '../../../messages'
import {
  IChangePasswordModalProps,
  IChangePasswordRequest,
} from '../../../types/navBar.types'
import { handleFormError } from '../../../utils/errorHandler'

const { Title } = Typography

export const ChangePasswordModal: FC<IChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleOk = async (value: IChangePasswordRequest) => {
    setLoading(true)
    changePasswordAPI(value)
      .then(() => {
        notification.success({
          message: PASSWORD_CHANGE_SUCCESS,
        })
        form.resetFields()
        onClose()
      })
      .catch(err => handleFormError(form, err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal footer={null} open={isOpen} onCancel={() => onClose()}>
      <Space direction="vertical" size={20}>
        <Title level={4} style={{ textAlign: 'center' }}>
          {CHANGE_PASSWORD_MODAL_TITLE}
        </Title>

        <Alert
          message={RESET_PASSWORD_ALERT_INFO}
          type="info"
          icon={<InfoCircleOutlined />}
          showIcon
          style={{ marginBottom: 20 }}
        />

        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            name="old_password"
            rules={[{ required: true, message: CURRENT_PASSWORD }]}
          >
            <Input.Password size="large" placeholder="हालको पासवर्ड" />
          </Form.Item>

          <Form.Item
            name="new_password"
            rules={[{ required: true, message: NEW_PASSWORD_TEXT }]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="नयाँ पासवर्ड" />
          </Form.Item>

          <Form.Item
            name="confirm_password"
            dependencies={['new_password']}
            rules={[
              { required: true, message: NEW_PASSWORD_CONFIRM_TEXT },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(NEW_PASSWORD_CONFIRM_ERROR))
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password size="large" placeholder="नयाँ पासवर्ड" />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ marginTop: '20px' }}
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              पासवर्ड परिवर्तन गर्नुहोस्
            </Button>
          </Form.Item>
        </Form>
      </Space>
    </Modal>
  )
}
