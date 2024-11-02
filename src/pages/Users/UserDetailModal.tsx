import { Button, Descriptions, Divider, Flex, Modal } from 'antd'
import React from 'react'
import { IUser } from '../../types/users.types'

export interface IModalDetailProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  data: IUser
}

export const UserDetailModal: React.FC<IModalDetailProps> = ({
  data,
  onClose,
  isOpen,
}) => {
  return (
    <Modal title="प्रयोगकर्ताको विवरण" open={isOpen} onCancel={onClose} footer={false}>
      <Divider style={{ marginTop: '0px' }} />

      <Descriptions
        column={1}
        labelStyle={{ fontWeight: 'bold' }}
        style={{ marginTop: '30px' }}
      >
        <Descriptions.Item label="नाम">{data.first_name}</Descriptions.Item>
        <Descriptions.Item label="थर">{data.last_name}</Descriptions.Item>
        <Descriptions.Item label="इमेल">{data.email}</Descriptions.Item>
        <Descriptions.Item label="फोन नम्बर">{data.phone_number}</Descriptions.Item>
        <Descriptions.Item label="भूमिका">{data.role}</Descriptions.Item>
        <Descriptions.Item label="वडा नं.">{data.ward}</Descriptions.Item>
        <Descriptions.Item label="पद">{data.position}</Descriptions.Item>
        <Descriptions.Item label="स्थिति">
          {data.is_active ? 'सक्रिय' : 'निष्क्रिय'}
        </Descriptions.Item>
      </Descriptions>
      <Flex justify="end">
        <Button htmlType="button" onClick={onClose}>
          रद्द गर्नुहोस्
        </Button>
      </Flex>
    </Modal>
  )
}
