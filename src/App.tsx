import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Header from './components/Header'
import Home from './pages/Home'
import Ships from './pages/Ships'
import Builder from './pages/Builder'
import Blueprint from './pages/Blueprint'
import Modules from './pages/Modules'
import Community from './pages/Community'

const { Content } = Layout

function App() {
  return (
    <Layout className="min-h-screen bg-space-bg">
      <Header />
      <Content className="p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ships" element={<Ships />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/blueprint" element={<Blueprint />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </Content>
    </Layout>
  )
}

export default App