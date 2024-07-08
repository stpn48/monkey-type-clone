import { create } from "zustand";

export type StatsStoreType = {
  perfectWords: number;
  totalLettersTyped: number;
  mistakes: number;
  totalWordsTyped: number;
  timeTypingMs: number;
  setPerfectWords: (value: number | ((prev: number) => number)) => void;
  setTotalLettersTyped: (value: number | ((prev: number) => number)) => void;
  setMistakes: (value: number | ((prev: number) => number)) => void;
  setTotalWordsTyped: (value: number | ((prev: number) => number)) => void;
  resetStats: () => void;
  setTimeTypingMs: (newTime: number | ((prev: number) => number)) => void;
};
export const useStatsStore = create<StatsStoreType>((set) => ({
  mistakes: 0,
  totalLettersTyped: 0,
  perfectWords: 0,
  totalWordsTyped: 0,
  timeTypingMs: 0,

  setPerfectWords: (value) =>
    set((state) => ({
      perfectWords:
        typeof value === "function" ? value(state.perfectWords) : value,
    })),

  setTotalLettersTyped: (value) =>
    set((state) => ({
      totalLettersTyped:
        typeof value === "function" ? value(state.totalLettersTyped) : value,
    })),
  setMistakes: (value) =>
    set((state) => ({
      mistakes: typeof value === "function" ? value(state.mistakes) : value,
    })),
  setTotalWordsTyped: (value) =>
    set((state) => ({
      totalWordsTyped:
        typeof value === "function" ? value(state.totalWordsTyped) : value,
    })),

  resetStats: () =>
    set(() => ({
      perfectWords: 0,
      totalLettersTyped: 0,
      mistakes: 0,
      totalWordsTyped: 0,
    })),

  setTimeTypingMs: (value) =>
    set((state) => ({
      timeTypingMs:
        typeof value === "function" ? value(state.timeTypingMs) : value,
    })),
}));
