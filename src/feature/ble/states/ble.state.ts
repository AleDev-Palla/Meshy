import { create } from 'zustand';

import { BleRuntimeState } from '@/feature/ble/types/ble.types';

export type BleStore = BleRuntimeState & {
  updateBle: (partial: Partial<BleRuntimeState>) => void;
};

const initialBleState: BleRuntimeState = {
  bluetoothEnabled: true,
  locationEnabled: true,
  notificationsEnabled: true,
  hasBluetoothPermission: true,
  hasLocationPermission: true,
  batteryPercent: 84,
  energyMode: 'NORMAL',
  charging: false,
  systemSaver: false,
  emergencyBoost: false,
  presence: {
    status: 'ACTIVE',
    scanning: true,
    advertising: true,
    peerCount: 3,
  },
  activeConversationCode: null,
  pendingDangerContactName: null,
  pendingDangerContactCode: null,
  pendingDangerCount: 0,
  unreadMessagesCount: 1,
};

export const useBleStore = create<BleStore>((set) => ({
  ...initialBleState,
  updateBle: (partial) =>
    set((current) => {
      const next = { ...current, ...partial };
      const active =
        next.bluetoothEnabled &&
        next.hasBluetoothPermission &&
        next.locationEnabled &&
        next.hasLocationPermission;

      return {
        ...partial,
        presence: {
          status: !next.hasBluetoothPermission
            ? 'PERMISSION_REQUIRED'
            : !next.bluetoothEnabled
              ? 'BLUETOOTH_OFF'
              : !next.locationEnabled
                ? 'LOCATION_REQUIRED'
                : 'ACTIVE',
          scanning: active,
          advertising: active,
          peerCount: active ? 3 : 0,
        },
      };
    }),
}));

export function getBleState(): BleRuntimeState {
  return useBleStore.getState();
}

export function updateBleState(partial: Partial<BleRuntimeState>) {
  useBleStore.getState().updateBle(partial);
}
