import { create } from "zustand";

type ThemeType = {
  bgColor: string;
  mainColor: string;
  mainText: string;
  textColor: string;
  errorColor: string;
  errorExtraColor: string;
  caretColor: string;
  secondaryBg: string;

};

type ThemeStoreType = {
  theme: ThemeType;
  setTheme: (newTheme: ThemeType) => void;
};

export const useThemeStore = create<ThemeStoreType>((set) => ({
  theme: {
    bgColor: "#eae4cf",
    mainColor: "#9abbcd",
    mainText: "#ada998",
    textColor: "#646669",
    errorColor: "#ca4754",
    errorExtraColor: "#7e2a33",
    caretColor: "#f4d476",
    secondaryBg: "#ded9c9",
  },
  setTheme: (newTheme) => set(state => ({ ...state, theme: newTheme }))
}));