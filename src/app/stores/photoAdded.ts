import { create } from "zustand";

type FileWithPreview = File & {
  preview: string;
};

type PhotoAddedState = {
  images: FileWithPreview[];
  addImages: (files: FileWithPreview[]) => void;
  removeImage: (index: number) => void;
  updateImages: (files: FileWithPreview[]) => void;
};

export const usePhotoAddedStore = create<PhotoAddedState>((set) => ({
  images: [],
  addImages: (files) =>
    set((state) => ({ images: [...state.images, ...files] })),
  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index),
    })),
  updateImages: (files) => set(() => ({ images: files })),
}));
