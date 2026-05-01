import { create } from 'zustand'
import type { Ship, FleetShip } from '@/types'

interface FleetStore {
  fleet: FleetShip[]
  addToFleet: (ship: Ship) => void
  removeFromFleet: (shipId: string) => void
  updateShipCount: (shipId: string, count: number) => void
  clearFleet: () => void
}

export const useFleetStore = create<FleetStore>((set) => ({
  fleet: [],
  addToFleet: (ship) =>
    set((state) => {
      const existing = state.fleet.find((s) => s.id === ship.id)
      if (existing) {
        return {
          fleet: state.fleet.map((s) =>
            s.id === ship.id ? { ...s, count: s.count + 1 } : s
          ),
        }
      }
      return {
        fleet: [...state.fleet, { ...ship, count: 1 }],
      }
    }),
  removeFromFleet: (shipId) =>
    set((state) => {
      const existing = state.fleet.find((s) => s.id === shipId)
      if (existing && existing.count > 1) {
        return {
          fleet: state.fleet.map((s) =>
            s.id === shipId ? { ...s, count: s.count - 1 } : s
          ),
        }
      }
      return {
        fleet: state.fleet.filter((s) => s.id !== shipId),
      }
    }),
  updateShipCount: (shipId, count) =>
    set((state) => ({
      fleet: state.fleet.map((s) =>
        s.id === shipId ? { ...s, count: Math.max(1, count) } : s
      ),
    })),
  clearFleet: () => set({ fleet: [] }),
}))