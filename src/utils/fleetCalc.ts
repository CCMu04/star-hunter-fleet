import { Ship } from '../types/ship';

export interface FleetShip {
  ship: Ship;
  count: number;
}

export interface FleetStats {
  totalAntiShip: number;
  totalAntiAir: number;
  totalSiege: number;
  totalStructure: number;
  totalCommandValue: number;
  kineticRatio: number;
  energyRatio: number;
  antiAirRating: string;
  frontlineSurvival: number;
  activeFlagshipSkills: string[];
}

export const calculateFleetStats = (fleet: FleetShip[]): FleetStats => {
  let totalAntiShip = 0;
  let totalAntiAir = 0;
  let totalSiege = 0;
  let totalStructure = 0;
  let totalCommandValue = 0;
  const activeFlagshipSkills: string[] = [];

  fleet.forEach(item => {
    const { ship, count } = item;
    totalAntiShip += ship.stats.antiShipFirepower * count;
    totalAntiAir += ship.stats.antiAirFirepower * count;
    totalSiege += ship.stats.siegeFirepower * count;
    totalStructure += ship.stats.structureValue * count;
    totalCommandValue += ship.commandValue * count;

    if (ship.flagshipSkill) {
      activeFlagshipSkills.push(ship.flagshipSkill);
    }
  });

  const kineticRatio = 0.6; // 占位值，实际需要计算
  const energyRatio = 0.4;
  const antiAirRating = 'A';
  const frontlineSurvival = 85;

  return {
    totalAntiShip,
    totalAntiAir,
    totalSiege,
    totalStructure,
    totalCommandValue,
    kineticRatio,
    energyRatio,
    antiAirRating,
    frontlineSurvival,
    activeFlagshipSkills
  };
};

export const validateFleet = (
  fleet: FleetShip[],
  maxCommandValue: number
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  const stats = calculateFleetStats(fleet);

  if (stats.totalCommandValue > maxCommandValue) {
    errors.push(`指挥值超过限制: ${stats.totalCommandValue}/${maxCommandValue}`);
  }

  fleet.forEach(item => {
    if (item.count > item.ship.maxService) {
      errors.push(`${item.ship.name} 数量超过限制: ${item.count}/${item.ship.maxService}`);
    }
  });

  return { valid: errors.length === 0, errors };
};
