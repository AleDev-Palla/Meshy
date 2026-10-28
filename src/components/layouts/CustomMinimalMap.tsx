import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type CustomMinimalMapProps = {
  latitude?: number;
  longitude?: number;
  showMarker?: boolean;
  markerColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function CustomMinimalMap({
  latitude = 19.4174,
  longitude = -99.1649,
  showMarker = false,
  markerColor,
  style,
}: CustomMinimalMapProps) {
  const theme = useTheme();
  const offsetSeed = Math.abs(Math.round((latitude * 1000 + longitude * 1000) % 24));
  const pinColor = markerColor ?? theme.ink;

  return (
    <View style={[styles.container, { backgroundColor: theme.mapBlock }, style]}>
      <View
        style={[
          styles.parkBlock,
          {
            backgroundColor: theme.mapPark,
            top: `${16 + (offsetSeed % 8)}%`,
            left: `${12 + (offsetSeed % 10)}%`,
          },
        ]}
      />
      <View
        style={[
          styles.parkBlockSmall,
          {
            backgroundColor: theme.mapPark,
            bottom: `${22 + (offsetSeed % 6)}%`,
            right: `${14 + (offsetSeed % 8)}%`,
          },
        ]}
      />
      <View
        style={[
          styles.waterFeature,
          {
            backgroundColor: theme.mapWater,
            top: `${58 - (offsetSeed % 7)}%`,
            left: `${8 + (offsetSeed % 6)}%`,
          },
        ]}
      />

      {[14, 28, 44, 62, 78, 90].map((pct, i) => (
        <View
          key={`h-${pct}`}
          style={[
            styles.hStreet,
            {
              top: `${(pct + (offsetSeed % 5)) % 95}%`,
              height: i % 2 === 0 ? 10 : 6,
              backgroundColor: theme.mapStreet,
              borderColor: theme.mapBorder,
            },
          ]}
        />
      ))}

      {[16, 34, 52, 70, 86].map((pct, i) => (
        <View
          key={`v-${pct}`}
          style={[
            styles.vStreet,
            {
              left: `${(pct + (offsetSeed % 7)) % 94}%`,
              width: i % 2 === 1 ? 11 : 6,
              backgroundColor: theme.mapStreet,
              borderColor: theme.mapBorder,
            },
          ]}
        />
      ))}

      <View
        style={[
          styles.diagonalAvenue,
          {
            backgroundColor: theme.mapStreet,
            borderColor: theme.mapBorder,
          },
        ]}
      />

      {showMarker ? (
        <View style={styles.centerPinWrapper} pointerEvents="none">
          <View style={[styles.pinHalo, { backgroundColor: `${pinColor}2E` }]} />
          <View style={styles.pinOuter}>
            <View style={[styles.pinInner, { backgroundColor: pinColor }]} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  parkBlock: {
    position: 'absolute',
    width: '32%',
    height: '24%',
    borderRadius: 14,
  },
  parkBlockSmall: {
    position: 'absolute',
    width: '26%',
    height: '18%',
    borderRadius: 12,
  },
  waterFeature: {
    position: 'absolute',
    width: '22%',
    height: '14%',
    borderRadius: 20,
  },
  hStreet: {
    position: 'absolute',
    left: -10,
    right: -10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  vStreet: {
    position: 'absolute',
    top: -10,
    bottom: -10,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  diagonalAvenue: {
    position: 'absolute',
    left: '-20%',
    right: '-20%',
    top: '48%',
    height: 12,
    transform: [{ rotate: '-24deg' }],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  centerPinWrapper: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinHalo: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  pinOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
