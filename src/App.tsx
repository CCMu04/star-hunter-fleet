import { ConfigProvider, Layout, Menu, Input, Select, Row, Col, Empty, Spin, Typography } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useState } from 'react';
import { HomeOutlined, BookOutlined, RocketOutlined, ShareAltOutlined, BarChartOutlined, SearchOutlined } from '@ant-design/icons';
import ShipCard from './components/ShipCard/ShipCard';
import shipsData from './data/ships.json';
import factionsData from './data/factions.json';
import { Ship } from './types/ship';

const { Header, Sider, Content } = Layout;
const { Search } = Input;
const { Option } = Select;
const { Title, Text } = Typography;

function App() {
  const [current, setCurrent] = useState('ships');
  const [ships] = useState<Ship[]>(shipsData);
  const [searchText, setSearchText] = useState('');
  const [filterFaction, setFilterFaction] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterRarity, setFilterRarity] = useState('');
  const [filterPosition, setFilterPosition] = useState('');

  // 获取所有舰船类型
  const shipTypes = [...new Set(ships.map(s => s.type))];
  
  // 获取所有稀有度
  const rarities = [...new Set(ships.map(s => s.rarity))].sort((a, b) => {
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    return bNum - aNum;
  });
  
  // 获取所有站位
  const positions = [...new Set(ships.map(s => s.position))];

  // 筛选舰船
  const filteredShips = ships.filter(ship => {
    const matchesSearch = ship.name.includes(searchText);
    const matchesFaction = !filterFaction || ship.faction === filterFaction;
    const matchesType = !filterType || ship.type === filterType;
    const matchesRarity = !filterRarity || ship.rarity === filterRarity;
    const matchesPosition = !filterPosition || ship.position === filterPosition;
    return matchesSearch && matchesFaction && matchesType && matchesRarity && matchesPosition;
  });

  const renderShipsPage = () => (
    <div>
      {/* 页面标题 */}
      <div className="mb-6">
        <Title level={2} className="!text-text-primary !mb-0">舰船图鉴</Title>
        <Text className="text-text-secondary">
          共 {ships.length} 艘舰船 · 当前筛选显示 {filteredShips.length} 艘
        </Text>
      </div>

      {/* 筛选器 */}
      <div className="bg-bg-card/50 rounded-lg p-4 mb-6 border border-gray-700">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="搜索舰船名称..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="选择势力"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={(value) => setFilterFaction(value)}
            >
              {factionsData.map(faction => (
                <Option key={faction.id} value={faction.name}>
                  {faction.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="选择类型"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={(value) => setFilterType(value)}
            >
              {shipTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="选择稀有度"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={(value) => setFilterRarity(value)}
            >
              {rarities.map(rarity => (
                <Option key={rarity} value={rarity}>{rarity}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="选择站位"
              allowClear
              size="large"
              style={{ width: '100%' }}
              onChange={(value) => setFilterPosition(value)}
            >
              {positions.map(position => (
                <Option key={position} value={position}>{position}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* 舰船网格 */}
      {filteredShips.length > 0 ? (
        <Row gutter={[16, 16]}>
          {filteredShips.map(ship => (
            <Col key={ship.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <ShipCard ship={ship} />
            </Col>
          ))}
        </Row>
      ) : (
        <Empty
          description="没有找到匹配的舰船"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );

  const renderPageContent = () => {
    switch (current) {
      case 'ships':
        return renderShipsPage();
      case 'builder':
        return (
          <div>
            <Title level={2} className="!text-text-primary">智能配队</Title>
            <Text className="text-text-secondary">功能开发中...</Text>
          </div>
        );
      case 'community':
        return (
          <div>
            <Title level={2} className="!text-text-primary">阵容分享</Title>
            <Text className="text-text-secondary">功能开发中...</Text>
          </div>
        );
      case 'stats':
        return (
          <div>
            <Title level={2} className="!text-text-primary">数据统计</Title>
            <Text className="text-text-secondary">功能开发中...</Text>
          </div>
        );
      default:
        return (
          <div>
            <Title level={2} className="!text-text-primary">欢迎使用星际猎人配队站</Title>
            <Text className="text-text-secondary">
              一站式配队平台，整合 {ships.length} 艘舰船完整数据
            </Text>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-bg-card p-4 rounded-lg">
                <div className="text-4xl mb-2">🚀</div>
                <Title level={4} className="!text-text-primary !mb-2">舰船图鉴</Title>
                <Text className="text-text-secondary">浏览所有舰船的详细信息</Text>
              </div>
              <div className="bg-bg-card p-4 rounded-lg">
                <div className="text-4xl mb-2">⚔️</div>
                <Title level={4} className="!text-text-primary !mb-2">智能配队</Title>
                <Text className="text-text-secondary">根据需求推荐最佳阵容</Text>
              </div>
              <div className="bg-bg-card p-4 rounded-lg">
                <div className="text-4xl mb-2">📊</div>
                <Title level={4} className="!text-text-primary !mb-2">数据统计</Title>
                <Text className="text-text-secondary">分析舰船使用率和胜率</Text>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <ConfigProvider 
      locale={zhCN} 
      theme={{ 
        token: { 
          colorPrimary: '#4A9EFF', 
          colorBgBase: '#0A0E17',
          colorBgContainer: '#131A2B',
          colorBorder: '#374151',
          colorText: '#E8ECF1',
          colorTextSecondary: '#8892A4'
        } 
      }}
    >
      <Layout className="min-h-screen bg-bg-dark">
        <Header className="bg-bg-card border-b border-gray-700 flex items-center px-6 h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚀</div>
            <div className="text-xl font-bold text-primary">星际猎人配队站</div>
          </div>
        </Header>
        <Layout>
          <Sider width={220} theme="dark" className="bg-bg-card border-r border-gray-700">
            <Menu
              selectedKeys={[current]}
              mode="inline"
              theme="dark"
              items={[
                { label: '首页', key: 'home', icon: <HomeOutlined /> },
                { label: '舰船图鉴', key: 'ships', icon: <BookOutlined /> },
                { label: '智能配队', key: 'builder', icon: <RocketOutlined /> },
                { label: '阵容分享', key: 'community', icon: <ShareAltOutlined /> },
                { label: '数据统计', key: 'stats', icon: <BarChartOutlined /> }
              ]}
              onClick={(e) => setCurrent(e.key)}
              className="border-none"
            />
          </Sider>
          <Content className="p-6 overflow-auto">
            <div className="bg-bg-card rounded-lg p-6 min-h-[calc(100vh-64px)]">
              {renderPageContent()}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
