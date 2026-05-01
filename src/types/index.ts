export interface Ship {
  id: string
  name: string
  rarity: string
  faction: string
  type: string
  weaponType: string
  weaponRole: string
  attackAttr: string
  position: string
  obtainType: string
  stats: {
    antiShipFirepower: number
    antiAirFirepower: number
    siegeFirepower: number
    structureValue: number
    damageResistance: number
    shieldValue: string
    cruiseSpeed: number
    warpSpeed: number
    storageCapacity: number
  }
  ratings: {
    antiShip: string
    antiAir: string
    siege: string
    support: string
    survival: string
    strategy: string
  }
  build: {
    metal: number
    crystal: number
    deuterium: number
    time: string
    repairSpeed: string
  }
  commandValue: number
  maxService: number
  flagshipSkill: string
  tags: string[]
  modules: string[]
  image: string
  wikiUrl: string
}

export interface FleetShip extends Ship {
  count: number
}