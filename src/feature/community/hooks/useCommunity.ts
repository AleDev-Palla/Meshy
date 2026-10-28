import { router } from 'expo-router';
import { useState } from 'react';

import { useCommunityStore } from '@/feature/community/states/community.state';
import { NearbyPublicProfileItem } from '@/feature/community/types/community.types';

export function useCommunity() {
  const profiles = useCommunityStore((s) => s.profiles);
  const [enlargedProfile, setEnlargedProfile] = useState<NearbyPublicProfileItem | null>(null);

  const openChatWithProfile = (profile: NearbyPublicProfileItem) => {
    router.navigate({
      pathname: '/messages',
      params: { contactCode: profile.code, contactName: profile.name },
    });
  };

  return {
    profiles,
    enlargedProfile,
    setEnlargedProfile,
    openChatWithProfile,
  };
}
