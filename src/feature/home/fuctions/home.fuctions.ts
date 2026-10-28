import { z } from 'zod';

import { HOME_STRINGS } from '@/feature/home/constans/home.constans';
import { DevicePresenceInfo, SafePlaceKind } from '@/feature/home/types/home.types';

export const homeTemplateSchema = z.object({
  key: z.string().trim().min(1),
  text: z.string().max(120),
});

export function validateHomeTemplate(key: string, text: string) {
  return homeTemplateSchema.safeParse({ key, text });
}

export function getSafePlaceKindLabel(kind: SafePlaceKind): string {
  switch (kind) {
    case 'casa':
      return 'Casa';
    case 'negocio':
      return 'Negocio';
    default:
      return 'Otro lugar';
  }
}

export function getPresenceAccessibilityDescription(presence: DevicePresenceInfo): string {
  if (!presence.signalAvailable) return HOME_STRINGS.noLocation;
  if (!presence.bluetoothEnabled) return HOME_STRINGS.bluetoothOff;
  return HOME_STRINGS.connectedDot;
}
