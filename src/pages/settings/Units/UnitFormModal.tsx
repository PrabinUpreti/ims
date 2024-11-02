import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import { addUnitsAPI, editUnitsByIdAPI } from '../../../api/masterSettings/units'
import FormSwitch from '../../../components/FormSwitch'

import { SETTINGS_ALERT_INFO } from '../../../constants'
import {
  addDataSuccessMessage,
  editDataSuccessMessage,
  formStatusMessage,
  getEmptyFieldMessage,
} from '../../../messages'
import { IUnitsSetting, IUnitsSettingTable } from '../../../types/settings.types'
import { handleFormError } from '../../../utils/errorHandler'

const { Title } = Typography

interface IUnitsFormModalProps {
  visible: boolean
  initialValues?: IUnitsSettingTable | null
  onClose: () => void
  onSuccess: () => void
}

const UnitFormModal: React.FC<IUnitsFormModalProps> = ({
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

  const handleSubmit = async (values: IUnitsSetting) => {
    if (loading) {
      return
    }

    setLoading(true)

    const apiCall = initialValues
      ? editUnitsByIdAPI(initialValues.id, values)
      : addUnitsAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: initialValues
            ? editDataSuccessMessage('इकाई')
            : addDataSuccessMessage('इकाई'),
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
        <Title level={4} style={{ margin: 0 }}>
          इकाई
        </Title>
      }
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          रद्द गर्नुहोस
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
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
          label="इकाइको नाम"
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              message: getEmptyFieldMessage('इकाई'),
              required: true,
            },
          ]}
        >
          <Input placeholder="इकाइको नाम" style={{ marginBottom: 4 }} />
        </Form.Item>
        <Form.Item
          name="short_form"
          label="इकाइको संक्षिप्त नाम"
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              message: getEmptyFieldMessage('इकाइको संक्षिप्त नाम'),
              required: true,
            },
          ]}
        >
          <Input placeholder="इकाइको संक्षिप्त नाम" style={{ marginBottom: 4 }} />
        </Form.Item>
        <Form.Item name="is_active" valuePropName="checked">
          <FormSwitch
            label="स्थिति"
            description={formStatusMessage('इकाई')}
            className="switch-green"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UnitFormModal
