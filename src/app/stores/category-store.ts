import { create } from "zustand";

type Category = {
  id: number;
  name: string;
  price: number;
  description: string;
  workingMinutes: number;
};

type CategoryStore = {
  selectedCategory: Category | null;
  showUpdate: boolean;
  upCategory: boolean;
  setSelectedCategory: (category: Category | null) => void;
  setShowUpdate: (show: boolean) => void;
  setUpCategory: (show: boolean) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  showUpdate: false,
  upCategory: false,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setShowUpdate: (show) => set({ showUpdate: show }),
  setUpCategory: (show) => set({ upCategory: show }),
}));
