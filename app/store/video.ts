import { create } from "zustand"

interface VideoStore {
  page: number;
  size: number;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setSize: (size: number) => void;
  init: () => void;
}

const useVideoStore = create<VideoStore>((set) => ({
  page: 1,
  size: 12,
  search: '',
  setSearch: (search: string) => set(() => ({search})),
  setPage: (page: number) => set(() => ({page})),
  setSize: (size: number) => set(() => ({size})),
  init:() => set(() => ({page: 1, size: 12, search: ''})),
}));
export default useVideoStore;