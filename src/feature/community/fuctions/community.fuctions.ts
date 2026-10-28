import { NearbyPublicProfileItem } from '@/feature/community/types/community.types';

export function getPublicProfilePhotoDescription(profile: NearbyPublicProfileItem): string {
  return `Foto de ${profile.name}`;
}
