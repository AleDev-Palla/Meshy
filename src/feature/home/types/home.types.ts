export type SafePlaceKind = 'casa' | 'negocio' | 'otro';

export type SafePlaceItem = {
  code: string;
  title: string;
  ownerName: string;
  kind: SafePlaceKind;
  latitude: number;
  longitude: number;
  screenXPercent: number;
  screenYPercent: number;
};

export type DevicePresenceInfo = {
  latitude: number;
  longitude: number;
  signalAvailable: boolean;
  bluetoothEnabled: boolean;
};
