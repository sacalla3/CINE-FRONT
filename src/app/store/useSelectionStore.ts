// store/useSelectionStore.ts
import { create } from 'zustand';

interface SelectionState {
  selectedFunctionId: string | null;
  selectedSeatIds: string[];
  setSelectedFunctionId: (id: string) => void;
  toggleSeatId: (id: string) => void;
  clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedFunctionId: null,
  selectedSeatIds: [],
  setSelectedFunctionId: (id) => set({ selectedFunctionId: id }),
  toggleSeatId: (id) =>
    set((state) => {
      const exists = state.selectedSeatIds.includes(id);
      return {
        selectedSeatIds: exists
          ? state.selectedSeatIds.filter((s) => s !== id)
          : [...state.selectedSeatIds, id],
      };
    }),
  clearSelection: () => set({ selectedSeatIds: [] }),
}));
