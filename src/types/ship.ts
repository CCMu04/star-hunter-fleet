export interface ShipStats {
  antiShipFirepower: number
  antiAirFirepower: number
  siegeFirepower: number
  structureValue: number
  damageResistance: number
  shieldValue?: string
  cruiseSpeed: number
  warpSpeed: number
  storageCapacity: number
}

export interface ShipRatings {
  antiShip: string
  antiAir: string
  siege: string
  support: string
  survival: string
  strategy: string
}

export interface ShipBuild {
  metal: number
  crystal: number
  deuterium: number
  time: string
  repairSpeed: string
}

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
  stats: ShipStats
  ratings: ShipRatings
  build: ShipBuild
  commandValue: number
  maxService: number
  flagshipSkill?: string
  tags: string[]
  modules: string[]
  image?: string
  wikiUrl?: string
}