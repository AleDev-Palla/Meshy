import { create } from 'zustand';

export type OnboardingStore = {
  completed: boolean;
  setCompleted: (value: boolean) => void;
};

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  completed: false,
  setCompleted: (value) => set({ completed: value }),
}));

export function isOnboardingCompleted(): boolean {
  return useOnboardingStore.getState().completed;
}

export function setOnboardingCompleted(value: boolean) {
  useOnboardingStore.getState().setCompleted(value);
}
