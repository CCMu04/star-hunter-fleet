import { Card, Button, Space, Tag } from 'antd'
import { MinusOutlined } from '@ant-design/icons'

interface Ship {
  id: string
  name: string
  count: number
  commandValue: number
}

interface FleetSlotProps {
  position: string
  ships: Ship[]
  onRemove: (id: string) => void
}

const FleetSlot = ({ position, ships, onRemove }: FleetSlotProps) => {
  return (
    <Card
      title={position}
      size="small"
      className="border-gray-700 bg-card-bg"
    >
      {ships.length === 0 ? (
        <div className="text-center text-text-secondary py-8">
          <div className="text-4xl mb-2">+</div>
          <div className="text-sm">点击舰船添加到{position}</div>
        </div>
      ) : (
        <Space direction="vertical" size="small" className="w-full">
          {ships.map((ship) => (
            <div
              key={ship.id}
              className="flex items-center justify-between p-2 rounded bg-space-bg"
            >
              <div>
                <div className="font-bold text-sm">{ship.name}</div>
                <div className="text-xs text-text-secondary">
                  x{ship.count} | 指挥值: {ship.commandValue * ship.count}
                </div>
              </div>
              <Button
                type="text"
                danger
                icon={<MinusOutlined />}
                onClick={() => onRemove(ship.id)}
              />
            </div>
          ))}
        </Space>
      )}
    </Card>
  )
}

export default FleetSlot