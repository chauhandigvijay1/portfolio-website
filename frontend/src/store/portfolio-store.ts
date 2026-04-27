"use client";

import { create } from "zustand";

interface PortfolioStoreState {
  activeTechSlug: string | null;
  selectedProjectSlug: string | null;
  setActiveTechSlug: (slug: string | null) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
}

export const usePortfolioStore = create<PortfolioStoreState>((set) => ({
  activeTechSlug: null,
  selectedProjectSlug: null,
  setActiveTechSlug: (activeTechSlug) => set({ activeTechSlug }),
  setSelectedProjectSlug: (selectedProjectSlug) => set({ selectedProjectSlug }),
}));
