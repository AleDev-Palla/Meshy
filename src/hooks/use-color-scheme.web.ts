import { useColorScheme as useNativeColorScheme } from '@/hooks/use-color-scheme';

export { setAppColorScheme, getAppColorScheme } from '@/hooks/use-color-scheme';

export function useColorScheme() {
  return useNativeColorScheme();
}
