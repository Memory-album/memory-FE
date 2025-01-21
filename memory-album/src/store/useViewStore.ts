import { create } from 'zustand';

interface ViewState {
  view: string;
  setView(view: string): void;
  reset(): void;
}

export const useViewStore = create<ViewState>((set) => ({
  view: '',
  setView(view) {
    set({ view });
  },

  reset() {
    set({
      view: '',
    });
  },
}));
