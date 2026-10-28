import { SafePlaceItem } from '@/feature/home/types/home.types';

export const DEFAULT_SAFE_PLACES: SafePlaceItem[] = [
  {
    code: 'MESHY-PLACE-01',
    title: 'Cafetería El Faro',
    ownerName: 'Elena Ruiz',
    kind: 'negocio',
    latitude: 19.4188,
    longitude: -99.1632,
    screenXPercent: 68,
    screenYPercent: 34,
  },
  {
    code: 'MESHY-PLACE-02',
    title: 'Casa Familia Morales',
    ownerName: 'Carlos Morales',
    kind: 'casa',
    latitude: 19.4159,
    longitude: -99.1668,
    screenXPercent: 28,
    screenYPercent: 62,
  },
];

export const HOME_STRINGS = {
  centerDescription: 'Centrar mi ubicación',
  helpLabel: 'Ayuda',
  helpTitle: '¿Qué apoyo necesitas?',
  helpDisabled:
    'La opción Pedir ayuda está desactivada. Puedes cambiarla en Usuario → Tipo de cuenta.',
  noLocation: 'Ubicación no disponible, indicador gris',
  bluetoothOff: 'Bluetooth no disponible, indicador gris',
  connectedDot: 'Ubicación y Bluetooth activos, punto azul con señal',
  unverifiedPlaceNote:
    'Lugar ofrecido por su propietario. Su seguridad no ha sido verificada.',
} as const;
