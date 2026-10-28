import {
  buildServiceAnnouncements,
  getBleStatusDescription,
} from '@/feature/ble/fuctions/ble.fuctions';
import { useBleStore } from '@/feature/ble/states/ble.state';

export function useBleRuntime() {
  const state = useBleStore();
  const announcements = buildServiceAnnouncements(state);
  const statusDescription = getBleStatusDescription(state.presence);

  return {
    state,
    announcements,
    statusDescription,
    setBluetoothEnabled: (enabled: boolean) => state.updateBle({ bluetoothEnabled: enabled }),
    setLocationEnabled: (enabled: boolean) => state.updateBle({ locationEnabled: enabled }),
    setNotificationsEnabled: (enabled: boolean) =>
      state.updateBle({ notificationsEnabled: enabled }),
    grantAllPermissions: () =>
      state.updateBle({
        hasBluetoothPermission: true,
        hasLocationPermission: true,
        bluetoothEnabled: true,
        locationEnabled: true,
      }),
    setActiveConversationCode: (code: string | null) =>
      state.updateBle({ activeConversationCode: code }),
    setUnreadMessagesCount: (count: number) => state.updateBle({ unreadMessagesCount: count }),
    clearPendingDanger: () =>
      state.updateBle({
        pendingDangerCount: 0,
        pendingDangerContactName: null,
        pendingDangerContactCode: null,
      }),
  };
}
