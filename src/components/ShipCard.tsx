import { Card, Button, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Ship {
  id: string
  name: string
  rarity: string
  faction: string
  type: string
  position: string
  commandValue: number
}

interface ShipCardProps {
  ship: Ship
  onAdd: () => void
}

const ShipCard = ({ ship, onAdd }: ShipCardProps) => {
  return (
    <Card
      size="small"
      className="border-gray-700 bg-card-bg"
      hoverable
      actions={[
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={onAdd}
          className="text-space-blue"
        >
          添加
        </Button>,
      ]}
    >
      <div className="font-bold text-sm truncate">{ship.name}</div>
      <div className="text-xs text-text-secondary mt-1">
        {ship.faction}
      </div>
      <div className="flex gap-1 mt-2">
        <Tag color="blue" className="text-xs m-0">{ship.rarity}</Tag>
        <Tag color="green" className="text-xs m-0">{ship.position}</Tag>
      </div>
      <div className="text-xs text-text-secondary mt-2">
        指挥值: {ship.commandValue}
      </div>
    </Card>
  )
}

export default ShipCard