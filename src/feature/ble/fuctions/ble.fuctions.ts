import { BLE_STATUS_DESCRIPTIONS } from '@/feature/ble/constans/ble.constans';
import { BlePresenceState, BleRuntimeState } from '@/feature/ble/types/ble.types';

import { AnnouncementItem } from '@/components/layouts/CustomAnnouncementHeader';

export function getBleStatusDescription(state: BlePresenceState): string {
  if (state.status === 'ACTIVE') {
    return `Detección BLE activa · dispositivos cercanos: ${state.peerCount}. No se establece un emparejamiento Bluetooth.`;
  }
  return BLE_STATUS_DESCRIPTIONS[state.status];
}

export function buildServiceAnnouncements(runtime: BleRuntimeState): AnnouncementItem[] {
  const list: AnnouncementItem[] = [];

  if (!runtime.hasBluetoothPermission) {
    list.push({
      kind: 'BLUETOOTH_PERMISSION',
      title: 'Permite usar Bluetooth',
      body: 'Meshy necesita acceso a dispositivos cercanos.',
      icon: 'bluetoothOff',
      action: 'Permitir',
    });
  } else if (!runtime.bluetoothEnabled) {
    list.push({
      kind: 'BLUETOOTH_OFF',
      title: 'Bluetooth desactivado',
      body: 'Actívalo para poder conectar con la red.',
      icon: 'bluetoothOff',
      action: 'Activar',
    });
  }

  if (!runtime.locationEnabled) {
    list.push({
      kind: 'GPS_OFF',
      title: 'GPS desactivado',
      body: 'Activa la ubicación para situarte en el mapa.',
      icon: 'locationOff',
      action: 'Activar',
    });
  } else if (!runtime.hasLocationPermission) {
    list.push({
      kind: 'LOCATION_PERMISSION',
      title: 'Permite tu ubicación',
      body: 'Hace falta para el mapa y los avisos con ubicación.',
      icon: 'locationOff',
      action: 'Permitir',
    });
  }

  return list;
}
