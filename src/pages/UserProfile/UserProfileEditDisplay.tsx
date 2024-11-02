import { Button, Flex, Form, FormInstance, Row } from 'antd'
import { useStore } from '../../store/context'
import PageLoading from '../../components/PageLoading'
import UserProfileEditElement from './UserProfileEditElement'
import { IUser } from '../../types/users.types'
import { SetStateAction, Dispatch } from 'react'

interface UserProfileEditDisplayProps {
  handleFormSubmit: (formData: Partial<IUser>) => void
  setIsEditing: Dispatch<SetStateAction<boolean>>
  formLoading: boolean
  form: FormInstance
}

const UserProfileEditDisplay: React.FC<UserProfileEditDisplayProps> = ({
  handleFormSubmit,
  setIsEditing,
  formLoading,
  form,
}) => {
  const { user } = useStore()
  if (!user) {
    return <PageLoading />
  }
  return (
    <Form
      requiredMark={false}
      form={form}
      style={{
        padding: '30px',
        border: '2px solid #E2E8F0',
        borderRadius: '10px',
        marginBottom: '50px',
      }}
      layout="vertical"
      onFinish={handleFormSubmit}
      initialValues={user}
    >
      <Row gutter={100}>
        <UserProfileEditElement name="first_name" label="पहिलो नाम" />
        <UserProfileEditElement name="last_name" label="अन्तिम नाम" />
      </Row>
      <Row gutter={100}>
        <UserProfileEditElement name="phone_number" label="सम्पर्क नम्बर" />
        <UserProfileEditElement name="address" label="ठेगाना" />
      </Row>
      <Row gutter={100}>
        <UserProfileEditElement name="department" label="महाशाखा" />
        <UserProfileEditElement name="rps" label="रा. प्र. स्तर " />
      </Row>
      <Flex justify="flex-end" gap={10}>
        <Button
          type="default"
          onClick={() => setIsEditing(false)}
          style={{ color: '#3B82F6' }}
        >
          पछि जानुहोस्
        </Button>
        <Button type="primary" htmlType="submit" loading={formLoading}>
          सेभ गर्नुहोस
        </Button>
      </Flex>
    </Form>
  )
}

export default UserProfileEditDisplay
