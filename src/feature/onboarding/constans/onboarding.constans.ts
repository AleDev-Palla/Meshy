import { OnboardingPageItem } from '@/feature/onboarding/types/onboarding.types';

export const MESHY_ONBOARDING_PAGES: OnboardingPageItem[] = [
  {
    eyebrow: 'UNA RED QUE ES DE TODOS',
    title: 'Tu cuidado.\nTu red.\nTus reglas.',
    body: 'Meshy propone una red descentralizada que conecta a las personas por Bluetooth, sin depender de internet.',
    secondaryBody:
      'Tu privacidad va primero. Diseñada para que tus mensajes y tu ubicación sirvan para ayudarte, no para publicidad ni otros fines.',
    action: 'Conoce cómo funciona',
    illustration: 'NONE',
  },
  {
    eyebrow: 'UNA SEÃ‘AL PARA LOS TUYOS',
    title: 'Tu aviso.\nA un botón.',
    body: 'Envía un aviso desde la app. El atajo propuesto consiste en mantener pulsado un botón de volumen durante 20 segundos para compartir tu mensaje de peligro y tu ubicación por una ruta Bluetooth disponible.',
    note: 'La entrega necesita una ruta conectada. El atajo de volumen está pendiente de implementación.',
    action: 'Conoce tu círculo',
    illustration: 'HELP',
  },
  {
    eyebrow: 'LA CONFIANZA CONECTA',
    title: 'Tu círculo.\nNuestra red.',
    body: 'Añade hasta 3 contactos con un QR. Necesitan instalar Meshy y aceptar tu invitación. Además de acompañarte, ayudan a crear una red para cuidarnos entre todos.',
    note: 'Nombres y códigos QR ilustrativos.',
    action: 'Personaliza tus avisos',
    illustration: 'CONTACTS',
  },
  {
    eyebrow: 'A TU MANERA',
    title: 'Tus avisos.\nA tu manera.',
    body: 'Personaliza tus alertas y elige a quién avisar primero. Tus personas sabrán qué tipo de apoyo necesitas.',
    note: 'Por ejemplo: primero Ana, después Leo y Mar.',
    action: 'Encuentra tu lugar',
    illustration: 'ALERTS',
  },
  {
    eyebrow: 'AQUÍ TAMBIÃ‰N HACES FALTA',
    title: 'Más personas.\nMás apoyo.',
    body: 'Invita a otros a unirse, aunque no sean tus contactos de confianza. Pueden ampliar la red sin recibir avisos: su teléfono ayuda como puente.',
    action: 'Empezar con Meshy',
    illustration: 'COMMUNITY',
  },
];

export const ONBOARDING_EXAMPLE_CONTACTS = ['Ana', 'Leo', 'Mar'] as const;
