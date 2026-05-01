import { Card, Typography, Alert } from 'antd'

const { Title } = Typography

const Community = () => {
  return (
    <div className="space-y-6">
      <Title level={2}>社区</Title>
      <Alert
        message="功能开发中"
        description="社区分享和讨论功能正在开发中，敬请期待！"
        type="info"
        showIcon
      />
      <Card className="border-card-bg bg-card-bg">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👥</div>
          <Title level={4}>配队方案社区</Title>
          <p className="text-text-secondary">
            发布配队方案，评论讨论，点赞收藏，版本管理
          </p>
        </div>
      </Card>
    </div>
  )
}

export default Community