import { ParticipationPresetItem } from '@/feature/user/types/user.types';

export const PARTICIPATION_PRESETS: ParticipationPresetItem[] = [
  {
    key: 'COMPLETE',
    title: 'Ollin',
    subtitle: 'Completo',
    description:
      'Pides ayuda a tus contactos, recibes sus avisos y conectas comunicaciones de otras personas. Tu perfil es privado.',
    icon: 'trustedContact',
    settings: {
      askHelp: true,
      bridge: true,
      receiveAlerts: true,
      publicProfile: false,
    },
  },
  {
    key: 'BRIDGE',
    title: 'Paynani',
    subtitle: 'Solo puente',
    description:
      'Tu teléfono ayuda como puente cuando Bluetooth está disponible. No pide ayuda ni recibe alertas, y tu perfil es privado.',
    icon: 'peer',
    settings: {
      askHelp: false,
      bridge: true,
      receiveAlerts: false,
      publicProfile: false,
    },
  },
  {
    key: 'NEARBY',
    title: 'Cuauhtli',
    subtitle: 'Ayuda cercana',
    description:
      'Además de pedir ayuda, recibir avisos y servir de puente, te ofreces a ayudar a personas cercanas con perfil público.',
    icon: 'healthcare',
    settings: {
      askHelp: true,
      bridge: true,
      receiveAlerts: true,
      publicProfile: true,
    },
  },
  {
    key: 'RECEIVER',
    title: 'Calli',
    subtitle: 'Solo receptor',
    description:
      'Recibes los avisos de tus contactos de confianza con un perfil privado. El puente y la opción de pedir ayuda quedan desactivados.',
    icon: 'messages',
    settings: {
      askHelp: false,
      bridge: false,
      receiveAlerts: true,
      publicProfile: false,
    },
  },
];

export const USER_STRINGS = {
  sectionTitle: 'USUARIO',
  qrTitle: 'Tu QR de Meshy',
  qrHint: 'Escanea para conectar conmigo',
  nearbyCodePrefix: 'Código cercano · ',
  nearbyHint: 'Ãšsalo cerca y con esta pantalla abierta.',
  share: 'Compartir',
  copyNearbyCode: 'Copiar código',
  accountType: 'Tipo de cuenta',
  configuration: 'Configuración',
  privacy: 'Privacidad y permisos',
  privacyBody:
    'Tus chats se envían cifrados. Protege tu dispositivo con un bloqueo de pantalla para cuidar también tu historial.',
  version: 'Meshy · Versión 1.0.0',
  customPreset: 'Personalizado',
  participationTitle: 'Cómo participas',
} as const;
