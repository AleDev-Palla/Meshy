import { create } from 'zustand';

import {
  validateHelperProfile,
  validateSafePlaceDraft,
} from '@/feature/user/fuctions/user.fuctions';
import {
  HelperProfileData,
  OwnSafePlaceDraft,
  ParticipationSettings,
  UserDialogKind,
} from '@/feature/user/types/user.types';

export type UserFeatureState = {
  userCode: string;
  invitationPayload: string;
  participation: ParticipationSettings;
  helperProfile: HelperProfileData;
  ownSafePlace: OwnSafePlaceDraft;
  activeDialog: UserDialogKind;
};

export type UserStore = UserFeatureState & {
  setDialog: (dialog: UserDialogKind) => void;
  saveParticipation: (participation: ParticipationSettings) => void;
  saveHelperProfile: (helperProfile: HelperProfileData) => boolean;
  saveSafePlace: (draft: OwnSafePlaceDraft) => void;
};

export const useUserStore = create<UserStore>((set, get) => ({
  userCode: 'MESHY-94B8E21A3C7D50F6',
  invitationPayload: 'meshy://invite/v3/MESHY-94B8E21A3C7D50F6',
  participation: {
    askHelp: true,
    bridge: true,
    receiveAlerts: true,
    publicProfile: false,
  },
  helperProfile: {
    name: '',
    contact: '',
    hasPhoto: false,
    consent: false,
  },
  ownSafePlace: {
    title: '',
    kind: 'casa',
    latitude: null,
    longitude: null,
    published: false,
  },
  activeDialog: null,
  setDialog: (activeDialog) => set({ activeDialog }),
  saveParticipation: (participation) => set({ participation }),
  saveHelperProfile: (helperProfile) => {
    const validated = validateHelperProfile(
      helperProfile,
      get().participation.publicProfile
    );
    if (!validated) return false;
    set({ helperProfile: validated });
    return true;
  },
  saveSafePlace: (draft) => {
    const validated = validateSafePlaceDraft(draft);
    if (!validated) return;
    set({ ownSafePlace: validated });
  },
}));

export function setUserDialog(dialog: UserDialogKind) {
  useUserStore.getState().setDialog(dialog);
}
