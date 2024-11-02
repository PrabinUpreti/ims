import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Skeleton,
  Typography,
} from 'antd'
import 'antd/dist/reset.css'
import { omit } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { getAllSubTopicAPI } from '../../api/masterSettings/subtopics'
import {
  addProjectAPI,
  editProjectAPI,
  getProjectsById,
} from '../../api/projects/projects'
import { PROJECT_ADD_SUCCESS, PROJECT_EDIT_SUCCESS } from '../../messages'
import { IProjectDetail, IProjectFormModalData } from '../../types/projects.types'
import { ISubTopics } from '../../types/settings.types'
import { handleAPIError, handleFormError } from '../../utils/errorHandler'
import { displayWard } from '../../utils/wards'

const { TextArea } = Input

interface IProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  id: number | null
  modalData: IProjectFormModalData
}

const ProjectFormModal: React.FC<IProjectFormProps> = ({
  isOpen,
  onClose,
  id,
  modalData,
  onSuccess,
}) => {
  const [form] = Form.useForm()
  const [formLoading, setFormLoading] = useState(false)
  const [dataLoading, setDataLoading] = useState(false)
  const [subTopics, setSubTopics] = useState<ISubTopics[]>([])

  const fetchSubTopics = useCallback(
    (topicId: number, existingSubTopicId?: number) => {
      getAllSubTopicAPI(topicId)
        .then(response => {
          const relatedSubTopics: ISubTopics[] = response.data.data
          setSubTopics(relatedSubTopics)

          if (existingSubTopicId) {
            form.setFieldsValue({ sub_topic: existingSubTopicId })
          } else {
            form.setFieldsValue({ sub_topic: relatedSubTopics[0]?.id })
          }
        })
        .catch(error => {
          handleAPIError(error)
        })
    },
    [form]
  )

  useEffect(() => {
    if (!isOpen) {
      return
    }

    if (id) {
      setDataLoading(true)
      getProjectsById(id)
        .then(res => {
          const data: IProjectDetail = res.data.data

          const {
            sub_topic: subTopic,
            source,
            wards,
            financial_year: financialYear,
            expense_center: expenseCenter,
            expense_topic: expenseTopic,
            unit,
            project_level: projectLevel,
            ...rest
          } = data

          form.setFieldsValue({
            ...rest,
            sub_topic: subTopic.id,
            topic: subTopic.topic.id,
            source: source.id,
            wards: wards.map(ward => ward.id),
            financial_year: financialYear?.title,
            expense_center: expenseCenter.id,
            expense_topic: expenseTopic.id,
            unit: unit.id,
            project_level: projectLevel.id,
          })

          fetchSubTopics(subTopic.topic.id, subTopic.id)
        })
        .catch(handleAPIError)
        .finally(() => {
          setDataLoading(false)
        })
    } else {
      form.resetFields()
      setSubTopics([])
    }
  }, [fetchSubTopics, form, id, isOpen])

  const handleTopicChange = (value: number) => {
    fetchSubTopics(value)
  }

  const onFinish = (formData: IProjectDetail) => {
    if (formLoading) {
      return
    }
    setFormLoading(true)

    const cleanedFormData = omit(formData, [
      'topic',
      'code',
      'execution_method',
      'status',
    ])

    const apiCall = id
      ? editProjectAPI(id, cleanedFormData)
      : addProjectAPI(cleanedFormData)

    apiCall
      .then(() => {
        notification.success({
          message: id ? PROJECT_EDIT_SUCCESS : PROJECT_ADD_SUCCESS,
        })
        form.resetFields()
        onSuccess()
        onClose()
      })
      .catch(err => handleFormError(form, err))
      .finally(() => {
        setFormLoading(false)
      })
  }

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      maskClosable={false}
      open={isOpen}
      title={null}
      onCancel={handleClose}
      footer={
        <Row justify="end" gutter={16}>
          <Col>
            <Button type="default" onClick={handleClose}>
              रद्द गर्नुहोस
            </Button>
          </Col>
          <Col>
            <Button
              loading={formLoading}
              type="primary"
              htmlType="submit"
              onClick={() => form.submit()}
            >
              सेभ गर्नुहोस
            </Button>
          </Col>
        </Row>
      }
      width={1000}
      style={{ top: 20 }}
    >
      {dataLoading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Title level={4} style={{ margin: 0 }}>
                योजना तथा कार्यक्रमको विवरण
              </Typography.Title>
            </Col>
            <Col>
              <Flex justify="center" align="center" gap={8}>
                <Typography.Text>आर्थिक बर्ष:</Typography.Text>
                <Form.Item
                  name="financial_year"
                  style={{ marginRight: 40, marginTop: 20 }}
                >
                  <Select
                    size="middle"
                    placeholder="आर्थिक बर्ष"
                    style={{ width: '104px' }}
                    showSearch
                    optionFilterProp="label"
                    options={modalData.financialYears.map(fnYear => ({
                      label: fnYear.title,
                      value: fnYear.id,
                    }))}
                  />
                </Form.Item>
              </Flex>
            </Col>
          </Row>
          <Form.Item
            name="name"
            label="योजना तथा कार्यक्रमको नाम"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="योजना तथा कार्यक्रमको नाम" />
          </Form.Item>
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="topic" label="विषयगत क्षेत्र">
                <Select
                  size="middle"
                  placeholder="आर्थिक बर्ष"
                  showSearch
                  optionFilterProp="label"
                  options={modalData.topics.map(topic => ({
                    label: `${topic.title}${topic.is_active ? '' : ' (निस्क्रिय)'}`,
                    value: topic.id,
                    disabled: !topic.is_active,
                  }))}
                  onChange={handleTopicChange}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="sub_topic"
                label="उप क्षेत्र"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="उप क्षेत्र"
                  showSearch
                  optionFilterProp="label"
                  options={subTopics.map(subTopic => {
                    let label = subTopic.title.trim() !== '' ? subTopic.title : ' '
                    if (!subTopic.is_active) {
                      label += ' (निस्क्रिय)'
                    }
                    return {
                      label,
                      value: subTopic.id,
                      disabled: !subTopic.is_active,
                    }
                  })}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="project_level"
                label="योजनाको स्तर"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="योजनाको स्तर"
                  showSearch
                  optionFilterProp="label"
                  options={modalData.projectLevels.map(projectLvl => ({
                    label: projectLvl.title,
                    value: projectLvl.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="expense_topic"
                label="खर्च शिर्षक"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="खर्च शिर्षक"
                  showSearch
                  optionFilterProp="label"
                  options={modalData.expenseTopics.map(expenseTopic => ({
                    label: expenseTopic.title,
                    value: expenseTopic.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="expense_center"
                label="खर्च केन्द्र"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="खर्च केन्द्र"
                  showSearch
                  optionFilterProp="label"
                  options={modalData.expenseCenters.map(expenseCenter => ({
                    label: expenseCenter.title,
                    value: expenseCenter.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="allocated_budget"
                label="विनियोजित रकम रु"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="विनियोजित रकम" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="source" label="स्रोत" rules={[{ required: true }]}>
                <Select
                  placeholder="स्रोत"
                  showSearch
                  optionFilterProp="label"
                  options={modalData.sources.map(source => ({
                    label: source.title,
                    value: source.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="location"
                label="योजना संचालन स्थल"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="योजना संचालन स्थल" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="wards" label="वडा नं." rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  placeholder="वडा नं."
                  showSearch
                  optionFilterProp="label"
                  options={modalData.wards.map(ward => ({
                    value: ward.id,
                    label: displayWard(ward.ward_number),
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item name="geo_coordinate" label="सन्चालन स्थलको जियो कोडिनेट">
                <Input placeholder="सन्चालन स्थलको जियो कोडिनेट" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Flex justify="space-between" gap={16}>
                <Form.Item
                  name="quantity"
                  label="सम्पन गर्ने परिणाम"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="सम्पन गर्ने परिणाम" />
                </Form.Item>

                <Form.Item name="unit" label="ईकाइ" rules={[{ required: true }]}>
                  <Select
                    placeholder="ईकाइ"
                    showSearch
                    optionFilterProp="label"
                    options={modalData.units.map(unit => ({
                      value: unit.id,
                      label: unit.short_form,
                    }))}
                  />
                </Form.Item>
              </Flex>
            </Col>
          </Row>

          <Form.Item name="remarks" label="कैफियत">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default ProjectFormModal
