import { Form, Input, Col } from 'antd'
import { getEmptyFieldMessage } from '../../messages'

type UserProfileEditElementProps = {
  name: string
  label: string
}

const UserProfileEditElement = ({ name, label }: UserProfileEditElementProps) => (
  <Col span={12}>
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: true,
          message: getEmptyFieldMessage(label),
        },
      ]}
    >
      <Input size="large" placeholder={label} />
    </Form.Item>
  </Col>
)

export default UserProfileEditElement
