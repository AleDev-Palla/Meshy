import { EmergencyTutorialStepItem } from '@/feature/emergency/types/emergency.types';

export const EMERGENCY_TUTORIAL_STEPS: EmergencyTutorialStepItem[] = [
  {
    number: 1,
    text: 'Si la pantalla está apagada, pulsa encendido brevemente para activarla. Puedes dejar el teléfono bloqueado.',
    icon: 'power',
  },
  {
    number: 2,
    text: 'Mantén encendido solo hasta que aparezca Meshy y suelta el botón. No lo mantengas hasta sentir la vibración: podrías apagar el teléfono.',
    icon: 'power',
  },
  {
    number: 3,
    text: 'Meshy cuenta 5 segundos. Puedes cancelar. Después, dos vibraciones indican el inicio del envío de Peligro, no que ya se haya recibido.',
    icon: 'vibrate',
  },
];

export const EMERGENCY_STRINGS = {
  title: 'Acceso de emergencia',
  hint: 'Recomendado · Opcional',
  intro: 'Avisa a tus contactos de confianza desde el botón de encendido, sin abrir un chat.',
  enableSwitchLabel: 'Activar acceso de emergencia',
  selectedStatus: 'Meshy está elegido como asistente',
  notSelectedStatus: 'Falta elegir Meshy como asistente de Android',
  chooseButton: 'Elegir asistente en Android',
  practiceButton: 'Probar sin enviar alertas',
  practiceHint:
    'La prueba permite practicar el gesto y sentir las dos vibraciones. Prepararla no activa los envíos de emergencia.',
  disabledNote: 'Desactivado. Puedes restaurar tu asistente anterior en Android.',
  assistantNotice:
    'Elegir Meshy sustituye a Google/Gemini como asistente. Meshy no graba audio ni lee tu pantalla. Al desactivar esta función, vuelve a elegir tu asistente anterior en Ajustes de Android.',
  helpMore: 'Qué debes preparar',
  helpLess: 'Ver menos',
  requirements:
    'Designa hasta 3 contactos de confianza y comprueba antes la conexión con ellos. El aviso incluye tu ubicación cuando está disponible. Activa Bluetooth, ubicación y sus permisos en Meshy.',
  limits:
    'El gesto del botón depende de tu teléfono y sus ajustes. Pruébalo antes de necesitarlo. El aviso viaja por la red cercana: sin conexión con tus contactos no hay entrega inmediata.',
  countingInstruction: 'Suelta encendido. La app continúa la cuenta.',
  completedInstruction: 'Las dos vibraciones indican que se inició la alerta.',
  cancelAlert: 'Cancelar alerta',
  close: 'Cerrar',
} as const;
