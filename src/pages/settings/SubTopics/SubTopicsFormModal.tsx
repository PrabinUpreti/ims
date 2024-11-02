import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Select,
  Typography,
} from 'antd'
import { useEffect, useState } from 'react'
import FormSwitch from '../../../components/FormSwitch'
import { ISubTopics, ISubTopicSettingTable } from '../../../types/settings.types'
import { handleAPIError, handleFormError } from '../../../utils/errorHandler'
import { addSubTopicAPI, editSubTopicAPI } from '../../../api/masterSettings/subtopics'
import { getAllTopics } from '../../../api/masterSettings/topics'
import {
  addDataSuccessMessage,
  editDataSuccessMessage,
  formStatusMessage,
  getEmptyFieldMessage,
} from '../../../messages'
import { SETTINGS_ALERT_INFO } from '../../../constants'

const { Title } = Typography

interface ISubTopicsFormModalProps {
  visible: boolean
  initialValues?: ISubTopicSettingTable | null
  onClose: () => void
  onSuccess: () => void
}

const SubTopicsFormModal: React.FC<ISubTopicsFormModalProps> = ({
  visible,
  onClose,
  initialValues,
  onSuccess,
}) => {
  const [topics, setTopics] = useState<ISubTopics[]>([])
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    getAllTopics()
      .then(res => {
        const allTopics: ISubTopics[] = res.data.data
        setTopics(allTopics)

        if (initialValues) {
          form.setFieldsValue({
            ...initialValues,
            topic: initialValues.topic.id,
          })
        } else {
          form.resetFields()
        }
      })
      .catch(handleAPIError)
  }, [visible, initialValues, form])

  const handleSubmit = async (values: ISubTopics) => {
    setLoading(true)

    const apiCall = initialValues
      ? editSubTopicAPI(initialValues.id, values)
      : addSubTopicAPI(values)

    apiCall
      .then(() => {
        notification.success({
          message: initialValues
            ? editDataSuccessMessage('उप क्षेत्र')
            : addDataSuccessMessage('उप क्षेत्र'),
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
          उप क्षेत्र
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
          label="विषयगत क्षेत्रको नाम"
          name="topic"
          rules={[
            {
              message: getEmptyFieldMessage('विषयगत क्षेत्र'),
              required: true,
            },
          ]}
          style={{
            marginTop: 14,
            paddingBottom: 10,
          }}
        >
          <Select
            placeholder="विषयगत क्षेत्र"
            showSearch
            optionFilterProp="label"
            options={topics.map(topic => ({
              label: `${topic.title} ${!topic.is_active ? '(निस्क्रिय)' : ''}`,
              value: topic.id,
              disabled: !topic.is_active && topic.id !== initialValues?.topic.id,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="title"
          label="उप क्षेत्रको नाम"
          style={{
            fontWeight: 500,
            marginTop: 14,
            paddingBottom: 10,
          }}
          rules={[
            {
              message: getEmptyFieldMessage('उप क्षेत्र'),
              required: true,
            },
          ]}
        >
          <Input
            placeholder="उप क्षेत्र"
            style={{ marginBottom: 4, padding: '6px 12px' }}
          />
        </Form.Item>
        <Form.Item name="is_active" valuePropName="checked">
          <FormSwitch
            label="स्थिति"
            description={formStatusMessage('उप क्षेत्र')}
            className="switch-green"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SubTopicsFormModal
