import { create } from "zustand"

interface NoteStore {
  id: number | undefined;
  setId: (id: number) => void;
}

const useNoteStore = create<NoteStore>((set) => ({
  id: undefined,
  setId: (id: number) => set(() => ({ id })),
}));
export default useNoteStore;