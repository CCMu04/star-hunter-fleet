import { useState } from 'react'
import { Card, Row, Col, Button, Typography, Select, Space, Divider, Statistic } from 'antd'
import {
  ThunderboltOutlined,
  SaveOutlined,
  ShareAltOutlined,
  BarChartOutlined,
} from '@ant-design/icons'
import { useFleetStore } from '@/store/fleetStore'
import { shipsData } from '@/data/ships'
import ShipCard from '@/components/ShipCard'
import FleetSlot from '@/components/FleetSlot'

const { Title } = Typography
const { Option } = Select

const Builder = () => {
  const [baseLevel, setBaseLevel] = useState(7)
  const { fleet, addToFleet, removeFromFleet } = useFleetStore()

  const commandValueLimit = {
    7: 300,
    8: 350,
    9: 400,
  }

  const currentCommandValue = fleet.reduce((sum, ship) => sum + ship.commandValue * ship.count, 0)
  const limit = commandValueLimit[baseLevel as keyof typeof commandValueLimit] || 300

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Title level={2}>舰队编组</Title>
        <Space>
          <Select value={baseLevel} onChange={setBaseLevel} style={{ width: 150 }}>
            <Option value={7}>基地等级 7</Option>
            <Option value={8}>基地等级 8</Option>
            <Option value={9}>基地等级 9</Option>
          </Select>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="可用舰船池" className="border-card-bg bg-card-bg">
            <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {shipsData.slice(0, 12).map((ship) => (
                <ShipCard
                  key={ship.id}
                  ship={ship}
                  onAdd={() => addToFleet(ship)}
                />
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={16}>
          <Card title="舰队编组" className="border-card-bg bg-card-bg">
            <div className="mb-6">
              <Statistic
                title="指挥值"
                value={currentCommandValue}
                suffix={`/ ${limit}`}
                valueStyle={{ color: currentCommandValue > limit ? '#FF4757' : '#00D68F' }}
              />
            </div>

            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <FleetSlot position="前排" ships={fleet.filter((s) => s.position === '前排')} onRemove={removeFromFleet} />
              </Col>
              <Col xs={24} md={8}>
                <FleetSlot position="中排" ships={fleet.filter((s) => s.position === '中排')} onRemove={removeFromFleet} />
              </Col>
              <Col xs={24} md={8}>
                <FleetSlot position="后排" ships={fleet.filter((s) => s.position === '后排')} onRemove={removeFromFleet} />
              </Col>
            </Row>

            <Divider />

            <Card size="small" className="bg-space-bg border-gray-700">
              <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                  <Statistic title="对舰火力" value={125400} formatter={(val) => val.toLocaleString()} />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic title="对空火力" value={32100} formatter={(val) => val.toLocaleString()} />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic title="攻城火力" value={18500} formatter={(val) => val.toLocaleString()} />
                </Col>
                <Col xs={12} md={6}>
                  <Statistic title="结构值" value={890200} formatter={(val) => val.toLocaleString()} />
                </Col>
              </Row>
            </Card>

            <Space className="mt-6 w-full justify-center" wrap>
              <Button type="primary" icon={<ThunderboltOutlined />}>
                智能推荐
              </Button>
              <Button icon={<SaveOutlined />}>保存方案</Button>
              <Button icon={<ShareAltOutlined />}>分享链接</Button>
              <Button icon={<BarChartOutlined />}>克制分析</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Builder