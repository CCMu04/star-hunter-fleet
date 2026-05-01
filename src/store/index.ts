import { create } from 'zustand';
import { Ship } from '../types/ship';

interface AppState {
  currentPage: string;
  ships: Ship[];
  selectedShips: Ship[];
  baseLevel: number;
  setCurrentPage: (page: string) => void;
  setShips: (ships: Ship[]) => void;
  setSelectedShips: (ships: Ship[]) => void;
  setBaseLevel: (level: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentPage: 'ships',
  ships: [],
  selectedShips: [],
  baseLevel: 7,
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setShips: (ships) => set({ ships }),
  setSelectedShips: (ships) => set({ selectedShips: ships }),
  setBaseLevel: (level) => set({ baseLevel: level })
}));
