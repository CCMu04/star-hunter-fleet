import { Card, Typography, Alert } from 'antd'

const { Title } = Typography

const Blueprint = () => {
  return (
    <div className="space-y-6">
      <Title level={2}>蓝图加点</Title>
      <Alert
        message="功能开发中"
        description="蓝图加点模拟器正在开发中，敬请期待！"
        type="info"
        showIcon
      />
      <Card className="border-card-bg bg-card-bg">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔧</div>
          <Title level={4}>蓝图强化树模拟器</Title>
          <p className="text-text-secondary">
            可视化强化树节点，支持加点规划和方案保存
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Blueprint