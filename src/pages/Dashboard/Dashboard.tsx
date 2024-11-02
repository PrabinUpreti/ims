import { Card, Col, Flex, Row } from 'antd'
import {
  CheckOutlined,
  ClockCircleOutlined,
  PaperClipOutlined,
} from '@ant-design/icons'
import StackedBarChart from '../../components/charts/StackedBarChart'
import ProjectsLists from './ProjectsLists'

const Dashboard = () => {
  const cardData = [
    {
      key: 1,
      label: 'पूरा भएको',
      value: '15',
      color: '#22d3ee',
      icon: <CheckOutlined />,
      cardClass: 'bg-green',
    },
    {
      key: 2,
      label: 'सञ्चालित',
      value: '17',
      color: '#f43f5e',
      icon: <ClockCircleOutlined />,
      cardClass: 'bg-yellow',
    },
    {
      key: 3,
      label: 'छनौट भएको',
      value: '9',
      color: '#4ade80',
      icon: <PaperClipOutlined />,
      cardClass: 'bg-blue',
    },
  ]
  return (
    <div className="dashboard-container">
      <Row gutter={24}>
        <Col span={16}>
          <Flex vertical gap={24}>
            <div className="total-projects-container">
              {cardData.map(data => (
                <div key={data.key} className={`project-count-card ${data.cardClass}`}>
                  <div className={`card-${data.key}-absolute-1`}></div>
                  <div className={`card-${data.key}-absolute-2`}></div>
                  <div className={`icon ${data.cardClass}`}>{data.icon}</div>
                  <span className="legend-value">{data.value}</span>
                  <div className="legend">
                    <span className="legend-label">{data.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <Card>
              <h6 className="dashboard-content-title">वडागतरुपमा परियोजनाको वितरण</h6>
              <StackedBarChart />
            </Card>
          </Flex>
        </Col>
        <Col span={8}>
          <Flex vertical gap={24}>
            <Card>
              <div className="progress-bar-container">
                <h6 className="dashboard-content-title">बजेट एवं खर्च</h6>
                <div className="top-container">
                  <strong>रु 15,00,000</strong> <span className="lebel">खर्च</span>
                </div>
                <div className="progress-bar"></div>
                <div className="bottom-container">
                  <div className="left">
                    <span className="lebel">कुल बजेट</span>
                    <span>
                      <strong>रु.30,00,000</strong>
                    </span>
                  </div>
                  <div className="right">
                    <span className="lebel">बाँकी बजेट</span>
                    <span>
                      <strong>रु 15,00,000</strong>
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <ProjectsLists />
          </Flex>
        </Col>
      </Row>
    </div>
  )
}
export default Dashboard
