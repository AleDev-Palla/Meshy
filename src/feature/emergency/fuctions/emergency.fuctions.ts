export function formatEmergencyCountdown(seconds: number, isPractice: boolean): string {
  if (seconds > 0) {
    return isPractice ? `Prueba en ${seconds} s` : `Peligro en ${seconds} s`;
  }
  return isPractice
    ? 'Prueba completada. No se enviaron alertas.'
    : 'Iniciando alerta de Peligro…';
}
