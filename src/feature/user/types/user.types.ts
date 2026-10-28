import { IconName } from '@/constants/icons';

export type ParticipationSettings = {
  askHelp: boolean;
  bridge: boolean;
  receiveAlerts: boolean;
  publicProfile: boolean;
};

export type ParticipationPresetKey = 'COMPLETE' | 'BRIDGE' | 'NEARBY' | 'RECEIVER';

export type ParticipationPresetItem = {
  key: ParticipationPresetKey;
  title: string;
  subtitle: string;
  description: string;
  icon: IconName;
  settings: ParticipationSettings;
};

export type HelperProfileData = {
  name: string;
  contact: string;
  hasPhoto: boolean;
  consent: boolean;
};

export type OwnSafePlaceDraft = {
  title: string;
  kind: 'casa' | 'negocio' | 'otro';
  latitude: number | null;
  longitude: number | null;
  published: boolean;
};

export type UserDialogKind =
  | null
  | 'account'
  | 'settings'
  | 'profile'
  | 'safe_place'
  | 'battery'
  | 'messages'
  | 'privacy';
