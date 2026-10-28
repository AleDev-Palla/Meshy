import { Pressable, StyleSheet, View } from 'react-native';

import { HomeLocationSignal } from '@/feature/home/components/layouts/HomeLocationSignal';
import { HOME_STRINGS } from '@/feature/home/constans/home.constans';
import { getSafePlaceKindLabel } from '@/feature/home/fuctions/home.fuctions';
import { DevicePresenceInfo, SafePlaceItem } from '@/feature/home/types/home.types';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomMapCredits } from '@/components/layouts/CustomMapCredits';
import { CustomMinimalMap } from '@/components/layouts/CustomMinimalMap';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type HomeMapCanvasProps = {
  presence: DevicePresenceInfo;
  signalDescription: string;
  safePlaces: SafePlaceItem[];
  selectedPlace: SafePlaceItem | null;
  onSelectPlace: (place: SafePlaceItem | null) => void;
  onCenter: () => void;
  onHelp: () => void;
};

export function HomeMapCanvas({
  presence,
  signalDescription,
  safePlaces,
  selectedPlace,
  onSelectPlace,
  onCenter,
  onHelp,
}: HomeMapCanvasProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomMinimalMap latitude={presence.latitude} longitude={presence.longitude} />

      <View
        pointerEvents="none"
        style={[styles.topFade, { backgroundColor: theme.background }]}
      />
      <View
        pointerEvents="none"
        style={[styles.bottomFade, { backgroundColor: theme.background }]}
      />

      <HomeLocationSignal
        active={presence.signalAvailable && presence.bluetoothEnabled}
        description={signalDescription}
      />

      {safePlaces.map((place) => (
        <Pressable
          key={place.code}
          onPress={() => onSelectPlace(place)}
          accessibilityRole="button"
          accessibilityLabel={`Lugar seguro: ${place.title}`}
          style={[
            styles.safePlacePin,
            {
              backgroundColor: theme.safePlaceGreen,
              left: `${place.screenXPercent}%`,
              top: `${place.screenYPercent}%`,
            },
          ]}>
          <ThemedIcon
            name="safePlace"
            size={22}
            tintColor="#FFFFFF"
            description={`Lugar seguro: ${place.title}`}
          />
        </Pressable>
      ))}

      <CustomMapCredits style={styles.credits} />

      <View style={styles.bottomControls}>
        <ThemedButtonIcon
          icon="center"
          description={HOME_STRINGS.centerDescription}
          onPress={onCenter}
          fill="#20201F"
          tint="#FFFFFF"
          size={52}
          style={styles.centerButton}
        />

        <ThemedButton
          label={HOME_STRINGS.helpLabel}
          variant="danger"
          trailingIcon="arrowRight"
          onPress={onHelp}
          style={styles.helpButton}
        />
      </View>

      <CustomDialog
        visible={Boolean(selectedPlace)}
        title={selectedPlace?.title}
        onDismiss={() => onSelectPlace(null)}>
        {selectedPlace ? (
          <View style={styles.placeDialogBody}>
            <View style={[styles.placePhotoBox, { backgroundColor: theme.surfaceSoft }]}>
              <ThemedIcon name="user" size={32} tintColor={theme.secondary} />
            </View>
            <ThemedText style={styles.placeOwner}>{selectedPlace.ownerName}</ThemedText>
            <ThemedText>{getSafePlaceKindLabel(selectedPlace.kind)}</ThemedText>
            <ThemedText type="small" themeColor="secondary">
              {HOME_STRINGS.unverifiedPlaceNote}
            </ThemedText>
          </View>
        ) : null}
      </CustomDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  topFade: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 36,
    opacity: 0.72,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 88,
    opacity: 0.82,
  },
  safePlacePin: {
    position: 'absolute',
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -44,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  credits: {
    position: 'absolute',
    bottom: 78,
    left: 12,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerButton: {
    borderRadius: Shapes.medium,
  },
  helpButton: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: Shapes.medium,
  },
  placeDialogBody: {
    gap: 10,
  },
  placePhotoBox: {
    width: 88,
    height: 88,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOwner: {
    fontSize: 16,
    fontWeight: '600',
  },
});
