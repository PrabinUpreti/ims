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
import {
  addExpenseTopicsAPI,
  editExpenseTopicsAPI,
} from '../../../api/masterSettings/expenseTopics'
import FormSwitch from '../../../components/FormSwitch'

import { SETTINGS_ALERT_INFO } from '../../../constants'
import {
  addDataSuccessMessage,
  editDataSuccessMessage,
  formStatusMessage,
  getEmptyFieldMessage,
} from '../../../messages'
import {
  ISharedMasterSetting,
  ISharedMasterSettingTable,
} from '../../../types/settings.types'
import { handleFormError } from '../../../utils/errorHandler'

const { Title } = Typography

interface IExpenseTopicsFormModalProps {
  visible: boolean
  initialValues?: ISharedMasterSettingTable | null
  onClose: () => void
  onSuccess: () => void
}

const ExpenseTopicsFormModal: React.FC<IExpenseTopicsFormModalProps> = ({
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
    if (loading) {
      return
    }

    setLoading(true)

    const apiCall = initialValues
      ? editExpenseTopicsAPI(initialValues.id, values)
      : addExpenseTopicsAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: initialValues
            ? editDataSuccessMessage('खर्च शिर्षक')
            : addDataSuccessMessage('खर्च शिर्षक'),
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
          खर्च शिर्षक
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
          label="कार्यक्रमको नाम"
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              message: getEmptyFieldMessage('कार्यक्रमको नाम'),
              required: true,
            },
          ]}
        >
          <Input placeholder="कार्यक्रमको नाम" style={{ marginBottom: 4 }} />
        </Form.Item>
        <Form.Item name="is_active" valuePropName="checked">
          <FormSwitch
            label="स्थिति"
            description={formStatusMessage('कार्यक्रम')}
            className="switch-green"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ExpenseTopicsFormModal
