import { Platform } from 'react-native';

export const Colors = {
  light: {
    primary: '#20201F',
    onPrimary: '#FFFFFF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    ink: '#20201F',
    text: '#20201F',
    surfaceMuted: '#F0F0EE',
    backgroundElement: '#F0F0EE',
    surfaceSelected: '#E7E7E4',
    backgroundSelected: '#E7E7E4',
    surfaceSoft: '#F4F4F2',
    primaryContainer: '#E0ECF9',
    onPrimaryContainer: '#162C40',
    secondary: '#72726F',
    textSecondary: '#72726F',
    line: '#E7E7E4',
    dangerBackground: '#FFEEE8',
    dangerForeground: '#66241B',
    dangerSecondary: '#7E4A41',
    helpRed: '#B64D4D',
    safePlaceGreen: '#256D52',
    pinBlue: '#3878EC',
    pinGray: '#92979D',
    error: '#B3261E',
    mapStreet: '#FFFFFF',
    mapBlock: '#EFF0EC',
    mapPark: '#E8EAE5',
    mapWater: '#E6EEF4',
    mapBorder: '#DBDFDA',
  },
  dark: {
    primary: '#F1F1ED',
    onPrimary: '#20201F',
    background: '#151616',
    surface: '#151616',
    ink: '#F1F1ED',
    text: '#F1F1ED',
    surfaceMuted: '#292B2B',
    backgroundElement: '#292B2B',
    surfaceSelected: '#393C3C',
    backgroundSelected: '#393C3C',
    surfaceSoft: '#202222',
    primaryContainer: '#253E53',
    onPrimaryContainer: '#E1ECF5',
    secondary: '#B3B7B4',
    textSecondary: '#B3B7B4',
    line: '#393C3C',
    dangerBackground: '#482A28',
    dangerForeground: '#FFDAD0',
    dangerSecondary: '#E7BBB2',
    helpRed: '#B64D4D',
    safePlaceGreen: '#256D52',
    pinBlue: '#3878EC',
    pinGray: '#92979D',
    error: '#F2B8B5',
    mapStreet: '#303434',
    mapBlock: '#242828',
    mapPark: '#303636',
    mapWater: '#223443',
    mapBorder: '#444A4A',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Shapes = {
  extraSmall: 8,
  small: 10,
  medium: 12,
  large: 16,
  extraLarge: 20,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    serif: 'Georgia',
    rounded: 'System',
    mono: 'Menlo',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: 'system-ui, -apple-system, sans-serif',
    serif: 'Georgia, serif',
    rounded: 'system-ui, sans-serif',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 76 }) ?? 0;
export const MaxContentWidth = 800;
