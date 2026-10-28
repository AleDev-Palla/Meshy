import { NearbyPublicProfileItem } from '@/feature/community/types/community.types';

export const INITIAL_PUBLIC_PROFILES: NearbyPublicProfileItem[] = [
  {
    code: 'MESHY-P1A2B3C4',
    name: 'Sofía Hernández',
    contact: 'Enfermera · Col. Roma Norte',
  },
  {
    code: 'MESHY-P5D6E7F8',
    name: 'Diego Vázquez',
    contact: 'Brigadista vecinal · Condesa',
  },
];

export const COMMUNITY_STRINGS = {
  title: 'Personas cercanas',
  emptyBody: 'Aquí aparecerán quienes comparten su perfil para ayudar.',
  messageAction: 'Mensaje',
  closeAction: 'Cerrar',
} as const;
