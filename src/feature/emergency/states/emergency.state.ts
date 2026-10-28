import { create } from 'zustand';

import { EmergencyFeatureState } from '@/feature/emergency/types/emergency.types';

export type EmergencyStore = EmergencyFeatureState & {
  updateEmergency: (partial: Partial<EmergencyFeatureState>) => void;
};

export const useEmergencyStore = create<EmergencyStore>((set) => ({
  enabled: true,
  assistantSelected: true,
  practiceArmed: false,
  counting: false,
  secondsRemaining: 5,
  countdownStatus: 'Acceso de emergencia',
  updateEmergency: (partial) => set((state) => ({ ...state, ...partial })),
}));
