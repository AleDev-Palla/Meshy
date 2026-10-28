import { z } from 'zod';

import { PARTICIPATION_PRESETS, USER_STRINGS } from '@/feature/user/constans/user.constans';
import {
  HelperProfileData,
  OwnSafePlaceDraft,
  ParticipationSettings,
} from '@/feature/user/types/user.types';

export const helperProfileSchema = z.object({
  name: z.string().trim().max(50),
  contact: z.string().trim().max(100),
  hasPhoto: z.boolean(),
  consent: z.boolean(),
});

export const coordinatesInputSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const safePlaceDraftSchema = z.object({
  title: z.string().trim().max(60),
  kind: z.enum(['casa', 'negocio', 'otro']),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  published: z.boolean(),
});

export function validateCoordinatesInput(latRaw: string, lonRaw: string) {
  const lat = Number.parseFloat(latRaw.replace(',', '.'));
  const lon = Number.parseFloat(lonRaw.replace(',', '.'));
  if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
  const parsed = coordinatesInputSchema.safeParse({ latitude: lat, longitude: lon });
  return parsed.success ? parsed.data : null;
}

export function validateHelperProfile(
  profile: HelperProfileData,
  publicProfileEnabled: boolean
): HelperProfileData | null {
  const parsed = helperProfileSchema.safeParse(profile);
  if (!parsed.success) return null;
  const data = parsed.data;
  if (
    publicProfileEnabled &&
    data.consent &&
    (!data.name || !data.contact || !data.hasPhoto)
  ) {
    return null;
  }
  return data;
}

export function validateSafePlaceDraft(draft: OwnSafePlaceDraft): OwnSafePlaceDraft | null {
  const parsed = safePlaceDraftSchema.safeParse(draft);
  if (!parsed.success) return null;
  if (
    parsed.data.published &&
    (!parsed.data.title || parsed.data.latitude === null || parsed.data.longitude === null)
  ) {
    return null;
  }
  return parsed.data;
}

export function isSameParticipation(
  a: ParticipationSettings,
  b: ParticipationSettings
): boolean {
  return (
    a.askHelp === b.askHelp &&
    a.bridge === b.bridge &&
    a.receiveAlerts === b.receiveAlerts &&
    a.publicProfile === b.publicProfile
  );
}

export function getParticipationPresetTitle(settings: ParticipationSettings): string {
  const matched = PARTICIPATION_PRESETS.find((preset) =>
    isSameParticipation(preset.settings, settings)
  );
  return matched ? matched.title : USER_STRINGS.customPreset;
}

export function getShortNearbyAlias(userCode: string): string {
  return userCode.replace(/^MESHY-/, '').slice(-8).toUpperCase();
}
