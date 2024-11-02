import { useState } from 'react'
import { ColumnsType } from 'antd/es/table'
import { Space } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import UserCommitteeDetailsTable from '../../../shared/UserCommitteeDetailsTable'
import { getUserCommitteeMemberAPI } from '../../../../api/projects/userCommittee/userCommitteeMember'
import { ISharedUserCommitteeDetailsTable } from '../../../../types/userDetails.types'
import CitizenshipPictureModal from './CitizenshipDisplayModal'
const columns: ColumnsType<ISharedUserCommitteeDetailsTable> = [
  {
    title: 'क्र.स',
    dataIndex: 'sn',
    key: 'sn',
    width: 70,
  },
  {
    title: 'पद',
    dataIndex: 'position',
    key: 'position',
  },
  {
    title: 'नाम थर',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'ठेगाना',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'सम्पर्क नं.',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'लिंग',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'नागरिकता प्रं. नं.',
    dataIndex: 'citizenship_number',
    key: 'citizenship_number',
  },
]
const CommitteeMember = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedMember, setSelectedMember] =
    useState<ISharedUserCommitteeDetailsTable | null>(null)

  const showModal = (member: ISharedUserCommitteeDetailsTable) => {
    setSelectedMember(member)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setSelectedMember(null)
  }

  const extendedColumns: ColumnsType<ISharedUserCommitteeDetailsTable> = [
    ...columns,
    {
      title: 'अन्य',
      dataIndex: 'other',
      key: 'other',
      render: (text, record) => {
        return (
          <Space>
            {text}
            <InfoCircleOutlined
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => showModal(record)}
            />
          </Space>
        )
      },
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <UserCommitteeDetailsTable<ISharedUserCommitteeDetailsTable>
        columns={extendedColumns}
        title="पदाधिकारीको विवरण"
        fetchDataAPI={getUserCommitteeMemberAPI}
      />

      {selectedMember && (
        <CitizenshipPictureModal
          visible={isModalVisible}
          onClose={handleModalClose}
          citizenshipPictures={{
            front: selectedMember.citizenship_picture_front,
            back: selectedMember.citizenship_picture_back,
          }}
        />
      )}
    </Space>
  )
}

export default CommitteeMember
