import { create } from "zustand";

interface TStore {
  imageName?: string | null;
  setImage: (name: string) => void;
  reset: () => void;
}

const useImageModal = create<TStore>((set) => ({
  imageName: null,
  setImage: (name) => set(() => ({ imageName: name })),
  reset: () => set(() => ({ imageName: null })),
}));

export default useImageModal;
