import { Card, Tag } from 'antd'
import { Ship } from '../../types/ship'

interface ShipCardProps {
  ship: Ship
}

const ShipCard: React.FC<ShipCardProps> = ({ ship }) => {
  const getRarityColor = (rarity: string) => {
    if (rarity.includes('4')) return '#FFD700'
    if (rarity.includes('3')) return '#4A9EFF'
    if (rarity.includes('2')) return '#00D68F'
    return '#8892A4'
  }

  const getPositionColor = (position: string) => {
    if (position.includes('前排')) return '#FF4757'
    if (position.includes('中排')) return '#FF6B35'
    return '#00D68F'
  }

  return (
    <Card
      hoverable
      className="bg-bg-card border-gray-700 shadow-lg"
      cover={
        <div className="h-40 bg-gray-800 flex items-center justify-center">
          {ship.image ? (
            <img alt={ship.name} src={ship.image} className="h-full w-full object-cover" />
          ) : (
            <div className="text-text-secondary">暂无图片</div>
          )}
        </div>
      }
    >
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-text-primary truncate" title={ship.name}>
            {ship.name}
          </h3>
          <Tag color={getRarityColor(ship.rarity)}>{ship.rarity}</Tag>
        </div>
        <div className="text-text-secondary text-sm mb-1">{ship.faction}</div>
        <div className="flex gap-1 flex-wrap mb-2">
          <Tag color="blue" size="small">{ship.type}</Tag>
          <Tag color="purple" size="small">{ship.weaponType}</Tag>
          <Tag color={getPositionColor(ship.position)} size="small">{ship.position}</Tag>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="text-text-secondary">对舰火力:</div>
        <div className="text-accent font-semibold">{ship.stats.antiShipFirepower.toLocaleString()}</div>
        <div className="text-text-secondary">结构值:</div>
        <div className="text-text-primary font-semibold">{ship.stats.structureValue.toLocaleString()}</div>
        <div className="text-text-secondary">指挥值:</div>
        <div className="text-primary font-semibold">{ship.commandValue}</div>
        <div className="text-text-secondary">最大服役:</div>
        <div className="text-primary font-semibold">{ship.maxService}</div>
      </div>
      <div className="flex gap-1 flex-wrap mb-2">
        {ship.tags.map((tag, index) => (
          <Tag key={index} color="default" size="small" className="text-xs">
            {tag}
          </Tag>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1 mt-3">
        <div className={`text-center px-1 py-0.5 rounded ${ship.ratings.antiShip === 'S' || ship.ratings.antiShip === 'A' ? 'bg-success/20 text-success' : 'bg-gray-700 text-text-secondary'}`}>
          对舰 {ship.ratings.antiShip}
        </div>
        <div className={`text-center px-1 py-0.5 rounded ${ship.ratings.antiAir === 'S' || ship.ratings.antiAir === 'A' ? 'bg-success/20 text-success' : 'bg-gray-700 text-text-secondary'}`}>
          防空 {ship.ratings.antiAir}
        </div>
        <div className={`text-center px-1 py-0.5 rounded ${ship.ratings.survival === 'S' || ship.ratings.survival === 'A' ? 'bg-success/20 text-success' : 'bg-gray-700 text-text-secondary'}`}>
          生存 {ship.ratings.survival}
        </div>
      </div>
    </Card>
  )
}

export default ShipCard