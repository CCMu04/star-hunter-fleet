import { ConfigProvider, Layout, Menu, Input, Select, Row, Col } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { useState } from 'react'
import { HomeOutlined, BookOutlined, RocketOutlined, ShareAltOutlined, BarChartOutlined, SearchOutlined } from '@ant-design/icons'
import ShipCard from './components/ShipCard/ShipCard'
import shipsData from './data/ships.json'
import { Ship } from './types/ship'

const { Header, Sider, Content } = Layout
const { Search } = Input
const { Option } = Select

function App() {
  const [current, setCurrent] = useState('ships')
  const [ships] = useState<Ship[]>(shipsData)
  const [searchText, setSearchText] = useState('')
  const [filterFaction, setFilterFaction] = useState('')
  const [filterType, setFilterType] = useState('')

  const items = [
    { label: '首页', key: 'home', icon: <HomeOutlined /> },
    { label: '舰船图鉴', key: 'ships', icon: <BookOutlined /> },
    { label: '智能配队', key: 'builder', icon: <RocketOutlined /> },
    { label: '阵容分享', key: 'community', icon: <ShareAltOutlined /> },
    { label: '数据统计', key: 'stats', icon: <BarChartOutlined /> },
  ]

  const factions = ['盘古拓展集团', '木星工业', '诺玛运输', '安东尼奥斯财团']
  const types = ['护卫舰', '驱逐舰', '巡洋舰', '战列巡洋舰']

  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.includes(searchText)
    const matchesFaction = !filterFaction || ship.faction === filterFaction
    const matchesType = !filterType || ship.type === filterType
    return matchesSearch && matchesFaction && matchesType
  })

  const renderContent = () => {
    if (current === 'ships') {
      return (
        <div>
          <div className="flex flex-wrap gap-4 mb-6 items-center">
            <Search
              placeholder="搜索舰船名称"
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              style={{ width: 300 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="选择势力"
              allowClear
              size="large"
              style={{ width: 200 }}
              onChange={(value) => setFilterFaction(value)}
            >
              {factions.map(faction => (
                <Option key={faction} value={faction}>{faction}</Option>
              ))}
            </Select>
            <Select
              placeholder="选择类型"
              allowClear
              size="large"
              style={{ width: 200 }}
              onChange={(value) => setFilterType(value)}
            >
              {types.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </div>
          <Row gutter={[16, 16]}>
            {filteredShips.map(ship => (
              <Col key={ship.id} xs={24} sm={12} md={8} lg={6}>
                <ShipCard ship={ship} />
              </Col>
            ))}
          </Row>
          {filteredShips.length === 0 && (
            <div className="text-center py-12 text-text-secondary">
              没有找到匹配的舰船
            </div>
          )}
        </div>
      )
    }
    return (
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-4">欢迎使用星际猎人配队站</h1>
        <p className="text-text-secondary">该模块正在开发中，敬请期待...</p>
      </div>
    )
  }

  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#4A9EFF', colorBgBase: '#0A0E17' } }}>
      <Layout className="min-h-screen bg-bg-dark">
        <Header className="bg-bg-card border-b border-gray-800 flex items-center px-6">
          <div className="text-2xl font-bold text-primary">星际猎人 - 配队站</div>
        </Header>
        <Layout>
          <Sider width={220} theme="dark" className="bg-bg-card border-r border-gray-800">
            <Menu
              selectedKeys={[current]}
              mode="inline"
              theme="dark"
              items={items}
              onClick={(e) => setCurrent(e.key)}
              className="border-none"
            />
          </Sider>
          <Content className="p-6">
            <div className="bg-bg-card rounded-lg p-6 min-h-[500px]">
              {renderContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App