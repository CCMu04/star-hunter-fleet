import { Layout, Menu, Button } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  AppstoreOutlined,
  SettingOutlined,
  RocketOutlined,
} from '@ant-design/icons'

const { Header: AntHeader } = Layout

const Header = () => {
  const location = useLocation()

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/ships',
      icon: <BookOutlined />,
      label: <Link to="/ships">舰船图鉴</Link>,
    },
    {
      key: '/builder',
      icon: <TeamOutlined />,
      label: <Link to="/builder">智能配队</Link>,
    },
    {
      key: '/blueprint',
      icon: <AppstoreOutlined />,
      label: <Link to="/blueprint">蓝图加点</Link>,
    },
    {
      key: '/modules',
      icon: <SettingOutlined />,
      label: <Link to="/modules">模块搭配</Link>,
    },
    {
      key: '/community',
      icon: <RocketOutlined />,
      label: <Link to="/community">社区</Link>,
    },
  ]

  return (
    <AntHeader className="sticky top-0 z-50 px-4 md:px-8 flex items-center justify-between border-b border-gray-700">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-space-blue">
          🚀 星际猎人
        </div>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="flex-1 justify-center"
        style={{ minWidth: 'auto' }}
      />
      <div className="flex items-center gap-2">
        <Button type="primary">登录</Button>
      </div>
    </AntHeader>
  )
}

export default Header