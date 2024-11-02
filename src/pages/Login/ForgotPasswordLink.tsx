import { UserOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, Modal, notification, Typography } from 'antd'
import { FC, useState } from 'react'
import { forgotPasswordAPI } from '../../api/auth'
import {
  FORGOT_PASSWORD_DESCRIPTION,
  getEmptyFieldMessage,
  PASSWORD_RESET_SUCCESS,
} from '../../messages'
import { IForgotPasswordRequest } from '../../types/auth.types'
import { handleFormError } from '../../utils/errorHandler'

const { Title, Paragraph } = Typography

const ForgotPasswordLink: FC = () => {
  const [form] = Form.useForm()
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const onFinish = (values: IForgotPasswordRequest) => {
    setLoading(true)
    forgotPasswordAPI(values)
      .then(() => {
        notification.success({
          message: PASSWORD_RESET_SUCCESS,
        })
        setOpen(false)
      })
      .catch(err => handleFormError(form, err))
      .finally(() => {
        form.resetFields()
        setLoading(false)
      })
  }

  const handleCancel = () => {
    setOpen(false)
    form.resetFields()
  }

  return (
    <>
      <Button
        className="custom-forgot-password"
        type="link"
        onClick={() => setOpen(true)}
        size="large"
      >
        Forgot password?
      </Button>
      <Modal
        className="forgot-password-modal"
        title="रिसेट पासवर्ड"
        centered
        open={open}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={500}
        footer={false}
      >
        <Form
          form={form}
          requiredMark={false}
          name="forgot_password"
          layout="vertical"
          onFinish={onFinish}
        >
          <Divider />
          <Form.Item className="modal-description">
            <Paragraph>{FORGOT_PASSWORD_DESCRIPTION}</Paragraph>
          </Form.Item>
          <Form.Item
            name="email"
            className="email-form-item"
            label={
              <Title level={5} className="custom-label">
                इमेल
              </Title>
            }
            rules={[
              {
                type: 'email',
                message: getEmptyFieldMessage('इमेल'),
                required: true,
              },
            ]}
          >
            <Input
              prefix={
                <UserOutlined className="site-form-item-icon input-icon-height" />
              }
              placeholder="इमेल"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              रिसेट पासवर्ड
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ForgotPasswordLink
