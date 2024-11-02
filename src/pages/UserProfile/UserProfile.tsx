import { ChangeEvent, useState } from 'react'
import { Button, Space, Image, Flex, Typography, Form, notification, Input } from 'antd'
import PageLoading from '../../components/PageLoading'
import { AxiosError } from 'axios'
import {
  editUserProfileAPI,
  editUserProfilePictureAPI,
  userProfileAPI,
} from '../../api/userProfile'
import { handleAPIError, handleFormError } from '../../utils/errorHandler'
import { SET_USER } from '../../store/reducer'
import { useDispatch, useStore } from '../../store/context'
import defaultPfp from '../../assets/defaultPfp.png'
import { isEqual, pick } from 'lodash'
import {
  PROFILE_EDIT_NO_CHANGE,
  PROFILE_EDIT_SUCCESS,
  PROFILE_PICTURE_EDIT_SUCCESS,
} from '../../messages'
import { IUser } from '../../types/users.types'
import { FormOutlined } from '@ant-design/icons'
import UserProfileDisplay from './UserProfileDisplay'
import UserProfileEditDisplay from './UserProfileEditDisplay'
const { Title, Text } = Typography
const { Compact } = Space

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [pictureLoading, setPictureLoading] = useState(false)

  const dispatch = useDispatch()
  const { user } = useStore()

  const [form] = Form.useForm()

  const updateStoreState = () => {
    userProfileAPI()
      .then(res => {
        dispatch({
          type: SET_USER,
          payload: res.data.data,
        })
      })
      .catch((err: AxiosError) => handleAPIError(err))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) {
      return
    }
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('profile_picture', file)
    setPictureLoading(true)
    editUserProfilePictureAPI(formData)
      .then(() => {
        dispatch({
          type: SET_USER,
          payload: { ...user, profile_picture: URL.createObjectURL(file) },
        })
        notification.success({
          message: PROFILE_PICTURE_EDIT_SUCCESS,
        })
        updateStoreState()
        setIsEditing(false)
      })
      .catch(err => handleAPIError(err))
      .finally(() => setPictureLoading(false))
  }

  const handleFormSubmit = (formData: Partial<IUser>) => {
    if (isEqual(pick(user, Object.keys(formData)), formData)) {
      notification.error({
        message: PROFILE_EDIT_NO_CHANGE,
      })
      return
    }
    setFormLoading(true)
    editUserProfileAPI(formData)
      .then(() => {
        dispatch({
          type: SET_USER,
          payload: { ...user, ...formData },
        })
        notification.success({
          message: PROFILE_EDIT_SUCCESS,
        })
        updateStoreState()
        setIsEditing(false)
      })
      .catch((err: AxiosError) => {
        handleFormError(form, err)
        setIsEditing(true)
      })
      .finally(() => setFormLoading(false))
  }

  if (!user) {
    return <PageLoading />
  }
  return (
    <>
      <Compact
        style={{
          height: '170px',
          width: '100%',
          backgroundColor: '#CBD5E180',
          marginBottom: '80px',
        }}
      >
        <Flex
          align="flex-end"
          gap={20}
          style={{
            position: 'relative',
            top: '80px',
            marginLeft: '50px',
          }}
        >
          <Image
            height={170}
            width={170}
            src={user.profile_picture || defaultPfp}
            preview={false}
            style={{
              borderRadius: '50%',
              border: '5px solid white',
              backgroundColor: '#f1f1f1',
              objectFit: 'cover',
            }}
          />
          <Flex vertical align="flex-start">
            <Title
              level={3}
              style={{
                marginBottom: '0',
              }}
            >
              {`${user.first_name} ${user.last_name}`}
            </Title>
            <Text>{user.position}</Text>
          </Flex>
          {isEditing ? (
            <Button
              style={{
                position: 'absolute',
                color: '#3B82F6',
                left: '100px',
                borderRadius: '8px',
                padding: '8px',
              }}
              loading={pictureLoading}
            >
              <Input
                type="file"
                accept="image/*"
                style={{
                  opacity: 0,
                  position: 'absolute',
                }}
                onChange={handleFileChange}
              />
              <FormOutlined /> Edit
            </Button>
          ) : null}
        </Flex>
      </Compact>
      <Compact
        direction="vertical"
        style={{
          width: '90%',
          marginLeft: '50px',
        }}
      >
        <Compact
          style={{
            margin: '30px 0',
          }}
        >
          <Flex
            flex={1}
            justify="space-between"
            align="center"
            style={{
              border: '2px solid #E2E8F0',
              height: '50px',
              borderRadius: '5px',
            }}
          >
            <Title
              level={4}
              style={{
                margin: '15px',
              }}
            >
              प्रयोगकर्ताको जानकारी
            </Title>
            {!isEditing ? (
              <Button
                style={{
                  margin: '15px',
                  color: '#3B82F6',
                }}
                onClick={() => setIsEditing(true)}
              >
                प्रोफाइल इडिट गर्नुहोस
              </Button>
            ) : null}
          </Flex>
        </Compact>
        {isEditing ? (
          <UserProfileEditDisplay
            formLoading={formLoading}
            setIsEditing={setIsEditing}
            handleFormSubmit={handleFormSubmit}
            form={form}
          />
        ) : (
          <UserProfileDisplay />
        )}
      </Compact>
    </>
  )
}

export default UserProfile
