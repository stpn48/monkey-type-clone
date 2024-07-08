import { create } from 'zustand'

type ModeStoreType = {
  timeoutMs: number;
  setTimeoutMs: (val: number) => void;

  wordCount: number;
  setWordCount: (val: number) => void;
}
export const useModeStore = create<ModeStoreType>((set)=>({
  timeoutMs: 60000,
  setTimeoutMs: (val) => set((state) => ({ ...state, timeoutMs: val })),

  wordCount: 50,
  setWordCount: (val) => set(state => ({ ...state, wordCount: val})),
}))
