import { IconName } from '@/constants/icons';

export type EmergencyTutorialStepItem = {
  number: number;
  text: string;
  icon: IconName;
};

export type EmergencyFeatureState = {
  enabled: boolean;
  assistantSelected: boolean;
  practiceArmed: boolean;
  counting: boolean;
  secondsRemaining: number;
  countdownStatus: string;
};
