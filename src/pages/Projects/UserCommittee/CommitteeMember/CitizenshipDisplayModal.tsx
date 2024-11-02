import { Image, Modal, Space, Divider } from 'antd'

interface ICitizenshipDisplayModalProps {
  visible: boolean
  onClose: () => void
  citizenshipPictures: {
    front: string
    back: string
  }
}

const CitizenshipPictureModal: React.FC<ICitizenshipDisplayModalProps> = ({
  visible,
  onClose,
  citizenshipPictures,
}) => {
  return (
    <Modal
      title="नागरिकताको फोटो"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Divider style={{ margin: '8px 0 16px 0' }} />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Image
          src={citizenshipPictures.front}
          alt="Citizenship Front"
          style={{ width: '100%' }}
        />
        <Image
          src={citizenshipPictures.back}
          alt="Citizenship Back"
          style={{ width: '100%' }}
        />
      </Space>
    </Modal>
  )
}

export default CitizenshipPictureModal
