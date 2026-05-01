import { useState } from 'react'
import { Card, Input, Select, Row, Col, Typography, Tag, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { shipsData } from '@/data/ships'

const { Title } = Typography
const { Option } = Select

const Ships = () => {
  const [searchText, setSearchText] = useState('')
  const [factionFilter, setFactionFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filteredShips = shipsData.filter((ship) => {
    const matchSearch = ship.name.toLowerCase().includes(searchText.toLowerCase())
    const matchFaction = !factionFilter || ship.faction === factionFilter
    const matchType = !typeFilter || ship.type === typeFilter
    return matchSearch && matchFaction && matchType
  })

  const factions = [...new Set(shipsData.map((s) => s.faction))]
  const types = [...new Set(shipsData.map((s) => s.type))]

  return (
    <div className="space-y-6">
      <Title level={2}>舰船图鉴</Title>

      <Card className="border-card-bg bg-card-bg">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Input
              placeholder="搜索舰船名称"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="选择势力"
              style={{ width: '100%' }}
              allowClear
              value={factionFilter}
              onChange={setFactionFilter}
            >
              {factions.map((faction) => (
                <Option key={faction} value={faction}>
                  {faction}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Select
              placeholder="选择舰船类型"
              style={{ width: '100%' }}
              allowClear
              value={typeFilter}
              onChange={setTypeFilter}
            >
              {types.map((type) => (
                <Option key={type} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]}>
        {filteredShips.map((ship) => (
          <Col key={ship.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              className="border-card-bg bg-card-bg"
              cover={
                <div className="h-40 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <span className="text-6xl">🚀</span>
                </div>
              }
            >
              <Card.Meta
                title={ship.name}
                description={
                  <Space direction="vertical" size="small" className="w-full">
                    <div className="text-text-secondary text-sm">
                      {ship.faction} · {ship.type}
                    </div>
                    <Space wrap>
                      <Tag color="blue">{ship.rarity}</Tag>
                      <Tag color="green">{ship.position}</Tag>
                    </Space>
                    <div className="text-xs text-text-secondary">
                      指挥值: {ship.commandValue} | 服役上限: {ship.maxService}
                    </div>
                  </Space>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Ships