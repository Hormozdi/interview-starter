"use client";

import { create } from "zustand";

interface State {
  selectedIndex: number;
  selectFirstIndex: () => void;
  resetIndex: () => void;
  increaseIndex: () => void;
  decreaseIndex: () => void;
}

const useSearchStore = create<State>()((set) => ({
  selectedIndex: -1,
  selectFirstIndex: () => set({ selectedIndex: 0 }),
  resetIndex: () => set({ selectedIndex: -1 }),
  increaseIndex: () =>
    set((state) => ({ selectedIndex: state.selectedIndex + 1 })),
  decreaseIndex: () =>
    set((state) => ({ selectedIndex: state.selectedIndex - 1 })),
}));

export default useSearchStore;
