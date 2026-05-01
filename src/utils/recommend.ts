import { Ship } from '../types/ship';

export interface RecommendOptions {
  baseLevel: number; // 基地等级
  availableShips: Ship[];
  purpose: 'pvp' | 'pve' | 'siege' | 'general';
  preferedFaction?: string;
  preferedType?: string;
}

export interface RecommendedFleet {
  ships: { ship: Ship; count: number }[];
  totalCommandValue: number;
  analysis: string;
  strengths: string[];
  weaknesses: string[];
}

export const generateRecommendation = (options: RecommendOptions): RecommendedFleet => {
  const { availableShips, purpose } = options;
  
  // 简单的推荐算法
  const recommended: RecommendedFleet = {
    ships: [],
    totalCommandValue: 0,
    analysis: '根据您的需求生成的推荐阵容',
    strengths: ['平衡的输出与防御'],
    weaknesses: ['需要根据实际情况调整']
  };

  // 根据用途筛选舰船
  const sortedShips = [...availableShips].sort((a, b) => {
    switch (purpose) {
      case 'pvp':
        return (b.stats.antiShipFirepower + b.stats.antiAirFirepower) - 
               (a.stats.antiShipFirepower + a.stats.antiAirFirepower);
      case 'siege':
        return b.stats.siegeFirepower - a.stats.siegeFirepower;
      case 'pve':
        return b.stats.antiShipFirepower - a.stats.antiShipFirepower;
      default:
        return (b.stats.antiShipFirepower + b.stats.structureValue) - 
               (a.stats.antiShipFirepower + a.stats.structureValue);
    }
  });

  const maxCommandValue = options.baseLevel * 30 + 100; // 估算的指挥值上限
  let currentCommandValue = 0;

  for (const ship of sortedShips) {
    if (currentCommandValue + ship.commandValue <= maxCommandValue) {
      const count = Math.min(
        ship.maxService,
        Math.floor((maxCommandValue - currentCommandValue) / ship.commandValue)
      );
      
      if (count > 0) {
        recommended.ships.push({ ship, count: Math.max(1, Math.min(count, 3)) });
        currentCommandValue += ship.commandValue * Math.max(1, Math.min(count, 3));
      }
    }
  }

  recommended.totalCommandValue = currentCommandValue;
  return recommended;
};
