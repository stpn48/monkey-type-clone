import { create } from "zustand";

type TypingFieldType = {
  currDisplayingWords: string[];
  setCurrDisplayingWords: (
    newWords: string[] | ((prev: string[]) => string[])
  ) => void;

  userWords: string[];
  setUserWords: (newWords: string[] | ((prev: string[]) => string[])) => void;

  currWordIndex: number;
  setCurrWordIndex: (newIndex: number | ((prev: number) => number)) => void;

  currGameMode: "time" | "wordCount";
  setCurrGameMode: (newGameMode: "time" | "wordCount") => void;

  isTyping: boolean;
  setIsTyping: (newTyping: boolean | ((prev: boolean) => boolean)) => void;

  currRowDistancePx: number;
  setCurrRowDistancePx: (
    newDistance: number | ((prev: number) => number)
  ) => void;

  currRow: number;
  setCurrRow: (newRow: number | ((prev: number) => number)) => void;
};

export const useTypingFieldStore = create<TypingFieldType>((set) => ({
  currDisplayingWords: [],
  setCurrDisplayingWords: (newWords) =>
    set((state) => ({
      currDisplayingWords:
        typeof newWords === "function"
          ? newWords(state.currDisplayingWords)
          : newWords,
    })),

  userWords: [""],
  setUserWords: (newWords) =>
    set((state) => ({
      userWords:
        typeof newWords === "function" ? newWords(state.userWords) : newWords,
    })),

  currWordIndex: 0,
  setCurrWordIndex: (newIndex) =>
    set((state) => ({
      currWordIndex:
        typeof newIndex === "function"
          ? newIndex(state.currWordIndex)
          : newIndex,
    })),

  currGameMode: "time",
  setCurrGameMode: (newGameMode) =>
    set((state) => ({ currGameMode: newGameMode })),

  isTyping: false,
  setIsTyping: (newTyping) =>
    set((state) => ({
      isTyping:
        typeof newTyping === "function" ? newTyping(state.isTyping) : newTyping,
    })),

  currRowDistancePx: 0,
  setCurrRowDistancePx: (newDistance) =>
    set((state) => ({
      currRowDistancePx:
        typeof newDistance === "function"
          ? newDistance(state.currRowDistancePx)
          : newDistance,
    })),

  currRow: 0,
  setCurrRow: (newRow) =>
    set((state) => ({
      currRow: typeof newRow === "function" ? newRow(state.currRow) : newRow,
    })),
}));
