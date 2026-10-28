export type BleStatus =
  | 'INACTIVE'
  | 'PERMISSION_REQUIRED'
  | 'UNSUPPORTED'
  | 'BLUETOOTH_OFF'
  | 'LOCATION_REQUIRED'
  | 'STARTING'
  | 'ACTIVE'
  | 'ERROR';

export type BlePresenceState = {
  status: BleStatus;
  scanning: boolean;
  advertising: boolean;
  peerCount: number;
};

export type EnergyMode = 'FULL' | 'NORMAL' | 'SAVER' | 'RESERVE';

export type BleRuntimeState = {
  bluetoothEnabled: boolean;
  locationEnabled: boolean;
  notificationsEnabled: boolean;
  hasBluetoothPermission: boolean;
  hasLocationPermission: boolean;
  batteryPercent: number;
  energyMode: EnergyMode;
  charging: boolean;
  systemSaver: boolean;
  emergencyBoost: boolean;
  presence: BlePresenceState;
  activeConversationCode: string | null;
  pendingDangerContactName: string | null;
  pendingDangerContactCode: string | null;
  pendingDangerCount: number;
  unreadMessagesCount: number;
};
