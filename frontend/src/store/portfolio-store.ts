"use client";

import { create } from "zustand";

interface PortfolioStoreState {
  activeTechSlug: string | null;
  selectedProjectSlug: string | null;
  commandMenuOpen: boolean;
  setActiveTechSlug: (slug: string | null) => void;
  setSelectedProjectSlug: (slug: string | null) => void;
  setCommandMenuOpen: (open: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStoreState>((set) => ({
  activeTechSlug: null,
  selectedProjectSlug: null,
  commandMenuOpen: false,
  setActiveTechSlug: (activeTechSlug) => set({ activeTechSlug }),
  setSelectedProjectSlug: (selectedProjectSlug) => set({ selectedProjectSlug }),
  setCommandMenuOpen: (commandMenuOpen) => set({ commandMenuOpen }),
}));
