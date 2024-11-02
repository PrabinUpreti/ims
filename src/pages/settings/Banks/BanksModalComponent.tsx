import { FC, useEffect, useState } from 'react'
import {
  Alert,
  Divider,
  Form,
  Modal,
  Typography,
  Button,
  Input,
  notification,
} from 'antd'
import { SETTINGS_ALERT_INFO } from '../../../constants'
import {
  addDataSuccessMessage,
  editDataSuccessMessage,
  formStatusMessage,
  getEmptyFieldMessage,
} from '../../../messages'
import FormSwitch from '../../../components/FormSwitch'
import {
  ISharedMasterSetting,
  ISharedMasterSettingTable,
} from '../../../types/settings.types'
import { handleFormError } from '../../../utils/errorHandler'
import { addBanksAPI, editBanksByIdAPI } from '../../../api/masterSettings/banks'

interface IBanksModalComponentProps {
  visible: boolean
  initialValues?: ISharedMasterSettingTable | null
  onClose: () => void
  onSuccess: () => void
}

const BanksModalComponent: FC<IBanksModalComponentProps> = ({
  visible,
  onClose,
  initialValues,
  onSuccess,
}) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!visible) {
      return
    }

    if (!initialValues) {
      form.resetFields()
    } else {
      form.setFieldsValue(initialValues)
    }
  }, [visible, initialValues, form])

  const handleSubmit = async (values: ISharedMasterSetting) => {
    setLoading(true)

    const apiCall = initialValues
      ? editBanksByIdAPI(initialValues.id, values)
      : addBanksAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: initialValues
            ? editDataSuccessMessage('बैंक')
            : addDataSuccessMessage('बैंक'),
        })
        form.resetFields()
        onSuccess()
        onClose()
      })
      .catch(err => handleFormError(form, err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal
      maskClosable={false}
      open={visible}
      title={
        <Typography.Title level={4} style={{ margin: 0 }}>
          बैंक
        </Typography.Title>
      }
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          रद्द गर्नुहोस
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          सेभ गर्नुहोस
        </Button>,
      ]}
    >
      <Divider style={{ margin: '8px 0 16px 0' }} />
      {initialValues && <Alert message={SETTINGS_ALERT_INFO} type="info" showIcon />}
      <Form form={form} layout="vertical" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="बैंकको नाम"
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              message: getEmptyFieldMessage('बैंक'),
              required: true,
            },
          ]}
        >
          <Input placeholder="बैंक" style={{ marginBottom: 4 }} />
        </Form.Item>
        <Form.Item name="is_active" valuePropName="checked">
          <FormSwitch
            label="स्थिति"
            description={formStatusMessage('बैंक')}
            className="switch-green"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default BanksModalComponent
