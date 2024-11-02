import { Space, Typography, Divider } from 'antd'

type UserProfileElementProps = {
  topic: string
  value: string | undefined | number
}

const UserProfileElement = ({ topic, value }: UserProfileElementProps) => (
  <Space.Compact direction="vertical">
    <Typography.Text>{topic}</Typography.Text>
    <Divider style={{ margin: '5px 0' }}></Divider>
    <Typography.Text strong>{value || 'N/A'}</Typography.Text>
  </Space.Compact>
)
export default UserProfileElement
