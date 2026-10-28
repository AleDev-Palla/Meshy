import { Appearance } from 'react-native';
import { create } from 'zustand';

type ColorSchemeName = 'light' | 'dark';

type ColorSchemeStore = {
  scheme: ColorSchemeName;
  setScheme: (scheme: ColorSchemeName) => void;
};

export const useColorSchemeStore = create<ColorSchemeStore>((set) => ({
  scheme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  setScheme: (scheme) => set({ scheme }),
}));

export function setAppColorScheme(scheme: ColorSchemeName | null) {
  const resolved = scheme ?? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light');
  useColorSchemeStore.getState().setScheme(resolved);
}

export function getAppColorScheme(): ColorSchemeName {
  return useColorSchemeStore.getState().scheme;
}

export function useColorScheme(): ColorSchemeName {
  return useColorSchemeStore((state) => state.scheme);
}
