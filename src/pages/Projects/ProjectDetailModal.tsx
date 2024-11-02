import { Alert, Button, Descriptions, Divider, Modal, Skeleton, Tag } from 'antd'
import isEmpty from 'lodash/isEmpty'
import React, { useEffect, useState } from 'react'
import { getProjectsById } from '../../api/projects/projects'
import { DATA_NOT_AVAILABLE } from '../../messages'
import { IProjectDetail } from '../../types/projects.types'
import { handleAPIError } from '../../utils/errorHandler'
import { convertToNepali } from '../../utils/nepaliConverter'
import { displayWard } from '../../utils/wards'

export interface IModalDetailProps {
  isOpen: boolean
  onClose: () => void
  id: number | null
}

const renderText = (text: string | number | undefined | null) => {
  if (typeof text === 'number' || typeof text === 'string') {
    return convertToNepali(text)
  }

  return isEmpty(text) ? 'N/A' : text
}

const renderProjectDetail = (data: IProjectDetail | null) => {
  if (!data) {
    return <Alert message={DATA_NOT_AVAILABLE} type="info" showIcon />
  }

  return (
    <Descriptions column={1} labelStyle={{ fontWeight: 'bold', color: '#1f1f1f' }}>
      <Descriptions.Item label="आर्थिक बर्ष">
        <Tag bordered style={{ backgroundColor: '#EDEFF1', color: '#1f1f1f' }}>
          {renderText(data.financial_year?.title)}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="योजना तथा कार्यक्रमको नाम">
        {renderText(data.name)}
      </Descriptions.Item>
      <Descriptions.Item label="आयोजना कोड नं">
        {renderText(data.code)}
      </Descriptions.Item>
      <Descriptions.Item label="वडा न">
        {renderText(data.wards.map(ward => displayWard(ward.ward_number)).join(', '))}
      </Descriptions.Item>
      <Descriptions.Item label="योजना सन्चालन स्थल">
        {renderText(data.location)}
      </Descriptions.Item>
      <Descriptions.Item label="विषयगत क्षेत्र">
        {renderText(data.sub_topic?.topic?.title)}
      </Descriptions.Item>
      <Descriptions.Item label="उप क्षेत्र">
        {renderText(data.sub_topic?.title)}
      </Descriptions.Item>
      <Descriptions.Item label="खर्च शिर्षक">
        {renderText(data.expense_topic?.title)}
      </Descriptions.Item>
      <Descriptions.Item label="योजनको स्तर">
        {renderText(data.project_level?.title)}
      </Descriptions.Item>
      <Descriptions.Item label="विनियोजित लागत रु">
        {renderText(data.allocated_budget)}
      </Descriptions.Item>
      <Descriptions.Item label="स्रोत">
        {renderText(data.source?.title)}
      </Descriptions.Item>
      <Descriptions.Item label="सम्पन गर्ने परिणाम">
        {renderText(data.quantity)}
      </Descriptions.Item>
      <Descriptions.Item label="सन्चालन स्थलको जियो कोडिनेट">
        {renderText(data.geo_coordinate)}
      </Descriptions.Item>
      <Descriptions.Item label="अनुमानि लागत रु">
        {renderText(data.estimated_budget)}
      </Descriptions.Item>
    </Descriptions>
  )
}

export const ProjectDetailModal: React.FC<IModalDetailProps> = ({
  id,
  onClose,
  isOpen,
}) => {
  const [data, setData] = useState<IProjectDetail | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen || id == null) {
      return
    }

    setData(null)
    setLoading(true)

    getProjectsById(id)
      .then(res => {
        setData(res.data.data)
      })
      .catch(error => {
        handleAPIError(error)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, isOpen])

  return (
    <Modal
      title="योजना तथा कार्यक्रमको विवरण"
      open={isOpen}
      onCancel={onClose}
      footer={false}
    >
      <Divider style={{ margin: '8px 0 16px 0' }} />

      {loading ? <Skeleton /> : renderProjectDetail(data)}

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button type="primary" htmlType="button" onClick={onClose}>
          पछि जानुहोस्
        </Button>
      </div>
    </Modal>
  )
}
