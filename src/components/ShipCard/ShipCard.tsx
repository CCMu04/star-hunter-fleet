import { Card, Tag } from 'antd';
import { Ship } from '../../types/ship';

interface ShipCardProps {
  ship: Ship;
  onClick?: () => void;
}

const ShipCard: React.FC<ShipCardProps> = ({ ship, onClick }) => {
  // 稀有度颜色
  const getRarityColor = (rarity: string) => {
    if (rarity.includes('6')) return { bg: '#8E44AD', text: '#FFFFFF' };
    if (rarity.includes('5')) return { bg: '#E74C3C', text: '#FFFFFF' };
    if (rarity.includes('4')) return { bg: '#FFD700', text: '#333333' };
    if (rarity.includes('3')) return { bg: '#4A9EFF', text: '#FFFFFF' };
    if (rarity.includes('2')) return { bg: '#00D68F', text: '#FFFFFF' };
    return { bg: '#8892A4', text: '#FFFFFF' };
  };

  // 站位颜色
  const getPositionColor = (position: string) => {
    if (position.includes('前排')) return '#FF4757';
    if (position.includes('中排')) return '#FF6B35';
    if (position.includes('后排')) return '#00D68F';
    return '#8892A4';
  };

  // 评级颜色
  const getRatingClass = (rating: string) => {
    if (rating === 'S') return 'bg-success text-success';
    if (rating === 'A') return 'bg-success/50 text-success';
    if (rating === 'B') return 'bg-primary/30 text-primary';
    return 'bg-gray-700 text-text-secondary';
  };

  const rarity = getRarityColor(ship.rarity);

  return (
    <Card
      hoverable
      className="bg-bg-card border-gray-700 shadow-lg transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
      styles={{ body: { padding: '16px' } }}
      cover={
        <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
          {ship.image ? (
            <img 
              alt={ship.name} 
              src={ship.image} 
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="text-text-secondary text-center">
              <div className="text-4xl mb-2">🚀</div>
              <div className="text-sm">舰船图片</div>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <Tag 
              style={{ 
                backgroundColor: rarity.bg, 
                color: rarity.text,
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              {ship.rarity}
            </Tag>
          </div>
        </div>
      }
    >
      {/* 舰船名称和势力 */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-text-primary mb-1 line-clamp-2" title={ship.name}>
          {ship.name}
        </h3>
        <div className="text-text-secondary text-sm">{ship.faction}</div>
      </div>

      {/* 基础信息标签 */}
      <div className="flex flex-wrap gap-1 mb-3">
        <Tag color="blue" size="small" className="m-0">{ship.type}</Tag>
        {ship.weaponType && <Tag color="purple" size="small" className="m-0">{ship.weaponType}</Tag>}
        {ship.weaponRole && ship.weaponRole !== '无' && (
          <Tag color="cyan" size="small" className="m-0">{ship.weaponRole}</Tag>
        )}
        <Tag color={getPositionColor(ship.position)} size="small" className="m-0">
          {ship.position}
        </Tag>
        {ship.obtainType && ship.obtainType !== '无' && (
          <Tag color="orange" size="small" className="m-0">{ship.obtainType}</Tag>
        )}
      </div>

      {/* 关键属性 */}
      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
        <div className="text-text-secondary">对舰火力</div>
        <div className="text-accent font-semibold text-right">
          {ship.stats.antiShipFirepower.toLocaleString()}
        </div>
        <div className="text-text-secondary">结构值</div>
        <div className="text-text-primary font-semibold text-right">
          {ship.stats.structureValue.toLocaleString()}
        </div>
        <div className="text-text-secondary">指挥值</div>
        <div className="text-primary font-semibold text-right">{ship.commandValue}</div>
        <div className="text-text-secondary">最大服役</div>
        <div className="text-primary font-semibold text-right">{ship.maxService}</div>
      </div>

      {/* 标签 */}
      {ship.tags && ship.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {ship.tags.slice(0, 4).map((tag, index) => (
            <Tag key={index} color="default" size="small" className="text-xs m-0">
              {tag}
            </Tag>
          ))}
          {ship.tags.length > 4 && (
            <Tag color="default" size="small" className="text-xs m-0">
              +{ship.tags.length - 4}
            </Tag>
          )}
        </div>
      )}

      {/* 评级 */}
      <div className="grid grid-cols-3 gap-1 mt-2">
        <div className={`text-center px-1 py-1 rounded text-xs font-bold ${getRatingClass(ship.ratings.antiShip)}`}>
          对舰 {ship.ratings.antiShip}
        </div>
        <div className={`text-center px-1 py-1 rounded text-xs font-bold ${getRatingClass(ship.ratings.antiAir)}`}>
          防空 {ship.ratings.antiAir}
        </div>
        <div className={`text-center px-1 py-1 rounded text-xs font-bold ${getRatingClass(ship.ratings.survival)}`}>
          生存 {ship.ratings.survival}
        </div>
      </div>

      {/* 模块提示 */}
      {ship.modules && ship.modules.length > 0 && (
        <div className="mt-3 text-center">
          <span className="text-text-secondary text-xs">
            模块: {ship.modules.length}个
          </span>
        </div>
      )}
    </Card>
  );
};

export default ShipCard;
