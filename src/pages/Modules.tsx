import { Card, Typography, Alert } from 'antd'

const { Title } = Typography

const Modules = () => {
  return (
    <div className="space-y-6">
      <Title level={2}>模块搭配</Title>
      <Alert
        message="功能开发中"
        description="超主力舰模块配置工具正在开发中，敬请期待！"
        type="info"
        showIcon
      />
      <Card className="border-card-bg bg-card-bg">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚙️</div>
          <Title level={4}>模块系统配置</Title>
          <p className="text-text-secondary">
            可视化M/A/B/C模块槽位，拖拽搭配，实时预览属性变化
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Modules