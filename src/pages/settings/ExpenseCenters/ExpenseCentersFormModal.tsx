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
  addExpenseCentersAPI,
  editExpenseCentersAPI,
} from '../../../api/masterSettings/expenseCenter'
import FormSwitch from '../../../components/FormSwitch'
import { SETTINGS_ALERT_INFO } from '../../../constants'
import {
  addDataSuccessMessage,
  editDataSuccessMessage,
  formStatusMessage,
} from '../../../messages'
import {
  ISharedMasterSetting,
  ISharedMasterSettingTable,
} from '../../../types/settings.types'
import { handleFormError } from '../../../utils/errorHandler'

const { Title } = Typography

interface ProjectLevelFormModalProps {
  visible: boolean
  initialValues?: ISharedMasterSettingTable | null
  onClose: () => void
  onSuccess: () => void
}

const ExpenseCentersFormModal: React.FC<ProjectLevelFormModalProps> = ({
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
    /**
     * @prevent_multiple_api_calls_to_run
     */
    if (loading) {
      return
    }

    setLoading(true)

    const apiCall = initialValues
      ? editExpenseCentersAPI(initialValues.id, values)
      : addExpenseCentersAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: initialValues
            ? editDataSuccessMessage('खर्च केन्द्र')
            : addDataSuccessMessage('खर्च केन्द्र'),
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
          खर्च केन्द्र
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
          label="खर्च केन्द्रको नाम"
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            placeholder="खर्च केन्द्र"
            style={{ marginBottom: 4, padding: '6px 12px' }}
          />
        </Form.Item>
        <Form.Item name="is_active" valuePropName="checked">
          <FormSwitch
            label="स्थिति"
            description={formStatusMessage('खर्च केन्द्र')}
            className="switch-green"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ExpenseCentersFormModal
