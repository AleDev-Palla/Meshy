import { create } from 'zustand';

import { INITIAL_PUBLIC_PROFILES } from '@/feature/community/constans/community.constans';
import { NearbyPublicProfileItem } from '@/feature/community/types/community.types';

export type CommunityStore = {
  profiles: NearbyPublicProfileItem[];
  setProfiles: (list: NearbyPublicProfileItem[]) => void;
};

export const useCommunityStore = create<CommunityStore>((set) => ({
  profiles: [...INITIAL_PUBLIC_PROFILES],
  setProfiles: (profiles) => set({ profiles }),
}));
