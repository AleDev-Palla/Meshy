import { BleStatus, EnergyMode } from '@/feature/ble/types/ble.types';

export const BLE_STATUS_DESCRIPTIONS: Record<BleStatus, string> = {
  INACTIVE: 'La detección BLE está en pausa.',
  PERMISSION_REQUIRED: 'Permite el acceso a dispositivos cercanos para detectar señales BLE.',
  UNSUPPORTED: 'Este dispositivo no admite el escaneo y la emisión BLE necesarios.',
  BLUETOOTH_OFF: 'Activa Bluetooth para detectar señales BLE cercanas.',
  LOCATION_REQUIRED: 'Activa la ubicación para permitir la detección BLE en esta versión de Android.',
  STARTING: 'Iniciando la detección de señales BLE.',
  ACTIVE: 'Detección BLE activa · dispositivos cercanos: 3. No se establece un emparejamiento Bluetooth.',
  ERROR:
    'No se pudo iniciar la detección BLE. Revisa Bluetooth y los permisos o vuelve a abrir la aplicación.',
};

export const ENERGY_MODE_TITLES: Record<EnergyMode, string> = {
  FULL: 'Participación alta',
  NORMAL: 'Equilibrado',
  SAVER: 'Ahorro',
  RESERVE: 'Reserva',
};

export const ENERGY_MODE_HINTS: Record<EnergyMode, string> = {
  FULL: 'Mayor disponibilidad para ayudar a transmitir, si activaste la función de nodo.',
  NORMAL: 'Mensajes propios primero y colaboración moderada con otros usuarios.',
  SAVER:
    'Menos búsquedas y reintentos para conservar tu batería. La ubicación en vivo se actualiza con menos frecuencia.',
  RESERVE:
    'El reenvío para otros usuarios queda pausado. Tus envíos y la recepción siguen habilitados, con menor actividad de búsqueda.',
};
