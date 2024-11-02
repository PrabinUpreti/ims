import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Form, Input, Layout, notification, Typography } from 'antd'
import { AxiosError } from 'axios'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../../api/auth'
import logo from '../../assets/logo.png'
import useAuth from '../../auth/useAuth'
import { PAGE_SUBTITLE, PAGE_TITLE } from '../../constants'
import { getEmptyFieldMessage, LOGIN_SUCCESS } from '../../messages'
import { ILoginRequest } from '../../types/auth.types'
import { handleFormError } from '../../utils/errorHandler'
import ForgotPasswordLink from './ForgotPasswordLink'

const { Title } = Typography

const Login: FC = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const onFinish = (values: ILoginRequest) => {
    setLoading(true)
    loginAPI(values)
      .then(res => {
        login(res.data.access, res.data.refresh)
        notification.success({
          message: LOGIN_SUCCESS,
        })
        navigate('/dashboard')
      })
      .catch((err: AxiosError) => handleFormError(form, err))
      .finally(() => {
        form.resetFields(['password'])
        setLoading(false)
      })
  }

  return (
    <Layout>
      <Flex className="login-container" justify="center" align="center">
        <Card className="login-box">
          <Flex className="logo-container" justify="center" align="center" vertical>
            <img src={logo} style={{ height: '80px' }} alt="Logo" loading="lazy" />

            <Title level={3} className="login-system-name">
              {PAGE_TITLE}
            </Title>
            <Title level={5} className="login-office-name">
              {PAGE_SUBTITLE}
            </Title>
          </Flex>

          <Form
            requiredMark={false}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            form={form}
          >
            <Form.Item
              name="email"
              label="इमेल"
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

            <Form.Item
              name="password"
              label="पासवर्ड"
              rules={[{ message: getEmptyFieldMessage('पासवर्ड'), required: true }]}
            >
              <Input.Password
                prefix={
                  <LockOutlined className="site-form-item-icon input-icon-height" />
                }
                placeholder="पासवर्ड"
              />
            </Form.Item>

            <ForgotPasswordLink />

            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              size="large"
              block
              style={{ margin: '8px 0' }}
            >
              लगइन
            </Button>
          </Form>
        </Card>
      </Flex>
    </Layout>
  )
}

export default Login
