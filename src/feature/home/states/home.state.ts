import { create } from 'zustand';

import { DEFAULT_SAFE_PLACES } from '@/feature/home/constans/home.constans';
import { validateHomeTemplate } from '@/feature/home/fuctions/home.fuctions';
import { SafePlaceItem } from '@/feature/home/types/home.types';

export type HomeStateData = {
  safePlaces: SafePlaceItem[];
  templates: Record<string, string>;
  askHelpEnabled: boolean;
};

export type HomeStore = HomeStateData & {
  updateHome: (partial: Partial<HomeStateData>) => void;
  saveTemplate: (key: string, text: string) => void;
};

export const useHomeStore = create<HomeStore>((set) => ({
  safePlaces: DEFAULT_SAFE_PLACES,
  templates: {},
  askHelpEnabled: true,
  updateHome: (partial) => set((state) => ({ ...state, ...partial })),
  saveTemplate: (key, text) => {
    const parsed = validateHomeTemplate(key, text);
    if (!parsed.success) return;
    set((state) => ({
      templates: {
        ...state.templates,
        [parsed.data.key]: parsed.data.text,
      },
    }));
  },
}));

export function getHomeState(): HomeStateData {
  return useHomeStore.getState();
}

export function updateHomeState(partial: Partial<HomeStateData>) {
  useHomeStore.getState().updateHome(partial);
}

export function saveHomeTemplate(key: string, text: string) {
  useHomeStore.getState().saveTemplate(key, text);
}
