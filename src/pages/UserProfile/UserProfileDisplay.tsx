import { Flex } from 'antd'
import UserProfileElement from './UserProfileElement'
import { useStore } from '../../store/context'
import PageLoading from '../../components/PageLoading'

const UserProfileDisplay = () => {
  const { user } = useStore()
  if (!user) {
    return <PageLoading />
  }
  return (
    <Flex
      style={{
        marginBottom: '50px',
        padding: '20px',
        border: '2px solid #CBD5E180',
        borderRadius: '10px',
      }}
      gap={100}
    >
      <Flex flex={1} vertical gap={25}>
        <UserProfileElement topic="इमेल" value={user.email} />
        <UserProfileElement topic="ठेगाना" value={user.address} />
        <UserProfileElement topic="वार्ड नं" value={user.ward} />
        <UserProfileElement topic="महाशाखा" value={user.department} />
      </Flex>
      <Flex flex={1} vertical gap={25}>
        <UserProfileElement topic="सम्पर्क नम्बर" value={user.phone_number} />
        <UserProfileElement topic="पद" value={user.position} />
        <UserProfileElement topic="भूमिका" value={user.role} />
        <UserProfileElement topic="रा. प्र. स्तर" value={user.rps} />
      </Flex>
    </Flex>
  )
}

export default UserProfileDisplay
