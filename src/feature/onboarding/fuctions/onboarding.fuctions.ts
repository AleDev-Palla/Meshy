import { OnboardingIllustrationKind } from '@/feature/onboarding/types/onboarding.types';

export function getOnboardingSceneDescription(kind: OnboardingIllustrationKind): string {
  switch (kind) {
    case 'HELP':
      return 'Un botón de ayuda conectado a un aviso';
    case 'CONTACTS':
      return 'Tres contactos conectados mediante un QR';
    case 'ALERTS':
      return 'Situaciones con mensajes personalizables';
    case 'COMMUNITY':
      return 'Dispositivos que se ayudan como puente';
    default:
      return '';
  }
}
