import { Card, Row, Col, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  FireOutlined,
  BarChartOutlined,
  PlusOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'

const { Title, Paragraph } = Typography

const Home = () => {
  const navigate = useNavigate()

  const hotFleets = [
    { name: '845队', description: '经典搭配', icon: '🔥' },
    { name: '中速队', description: '均衡配置', icon: '⚡' },
    { name: '变速队', description: '灵活战术', icon: '🎯' },
    { name: '战巡队', description: '重装压制', icon: '🛡️' },
  ]

  const strongShips = [
    { name: '新君士坦丁大帝级', rank: 1 },
    { name: '普鲁图斯之盾级', rank: 2 },
    { name: '天权级', rank: 3 },
  ]

  return (
    <div className="space-y-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title={<><FireOutlined className="mr-2" />热门配队</>} className="h-full">
            <Row gutter={[16, 16]}>
              {hotFleets.map((fleet, index) => (
                <Col key={index} xs={12} md={6}>
                  <Card
                    hoverable
                    className="text-center cursor-pointer border-card-bg bg-card-bg"
                    onClick={() => navigate('/builder')}
                  >
                    <div className="text-4xl mb-2">{fleet.icon}</div>
                    <div className="font-bold">{fleet.name}</div>
                    <div className="text-sm text-text-secondary">{fleet.description}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title={<><BarChartOutlined className="mr-2" />舰船强度榜</>} className="h-full">
            {strongShips.map((ship, index) => (
              <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-700 last:border-0">
                <span className={`text-2xl font-bold ${index === 0 ? 'text-space-gold' : index === 1 ? 'text-gray-400' : 'text-orange-700'}`}>
                  {index + 1}
                </span>
                <span>{ship.name}</span>
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      <Card className="border-card-bg bg-card-bg">
        <div className="text-center py-8">
          <Title level={3}>开始配队</Title>
          <Paragraph className="text-text-secondary">
            选择基地等级 → 选择持有蓝图 → 智能推荐配队
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate('/builder')}
            className="mt-4"
          >
            开始配队
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default Home