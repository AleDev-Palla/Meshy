import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MESSAGES_STRINGS } from '@/feature/messages/constans/messages.constans';
import { getSharedLocationLabel } from '@/feature/messages/fuctions/messages.fuctions';
import { SharedLocationData } from '@/feature/messages/types/messages.types';

import { CustomMapCredits } from '@/components/layouts/CustomMapCredits';
import { CustomMinimalMap } from '@/components/layouts/CustomMinimalMap';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SharedLocationPreviewProps = {
  location: SharedLocationData;
  onOpen: () => void;
};

export function SharedLocationPreview({ location, onOpen }: SharedLocationPreviewProps) {
  const theme = useTheme();
  const label = getSharedLocationLabel(location);

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <View style={styles.mapBox}>
        <CustomMinimalMap
          latitude={location.latitude}
          longitude={location.longitude}
          showMarker
          markerColor={theme.primary}
        />
        <Pressable
          onPress={onOpen}
          accessibilityRole="button"
          accessibilityLabel="Abrir mapa de ubicación"
          style={StyleSheet.absoluteFill}
        />
        <CustomMapCredits style={styles.previewCredits} />
      </View>
      <Pressable onPress={onOpen} style={styles.cardFooter}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <ThemedText style={[styles.openLink, { color: theme.primary }]}>
          {MESSAGES_STRINGS.openOnMap}
        </ThemedText>
      </Pressable>
    </View>
  );
}

export type SharedLocationFullScreenModalProps = {
  visible: boolean;
  location: SharedLocationData | null;
  contactName: string;
  onClose: () => void;
};

export function SharedLocationFullScreenModal({
  visible,
  location,
  contactName,
  onClose,
}: SharedLocationFullScreenModalProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  if (!location) return null;

  const label = getSharedLocationLabel(location);

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={[styles.fullRoot, { backgroundColor: theme.background }]}>
        <CustomMinimalMap
          latitude={location.latitude}
          longitude={location.longitude}
          showMarker
          markerColor={theme.primary}
        />

        <View style={[styles.topActions, { paddingTop: Math.max(insets.top + 8, 16) }]}>
          <ThemedButtonIcon
            icon="back"
            description="Volver al chat"
            onPress={onClose}
            fill="#20201F"
            tint="#FFFFFF"
          />
          <ThemedButtonIcon
            icon="center"
            description="Centrar mi ubicación"
            onPress={() => {}}
            fill="#20201F"
            tint="#FFFFFF"
          />
        </View>

        <View style={[styles.bottomOverlay, { paddingBottom: Math.max(insets.bottom, 20) }]}>
          <CustomMapCredits style={styles.fullCredits} />
          <View style={[styles.infoSheet, { backgroundColor: theme.surface }]}>
            <ThemedText style={styles.contactTitle}>{contactName}</ThemedText>
            <ThemedText themeColor="secondary" style={styles.locationSubtitle}>
              {label}
            </ThemedText>
            <ThemedText themeColor="secondary" style={styles.coordinates}>
              {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </ThemedText>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Shapes.extraSmall,
    overflow: 'hidden',
  },
  mapBox: {
    width: '100%',
    height: 150,
    overflow: 'hidden',
  },
  previewCredits: {
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  cardFooter: {
    padding: 10,
    gap: 3,
  },
  label: {
    fontSize: 14,
  },
  openLink: {
    fontSize: 12,
    fontWeight: '500',
  },
  fullRoot: {
    flex: 1,
  },
  topActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullCredits: {
    marginLeft: 8,
    marginBottom: 4,
  },
  infoSheet: {
    marginHorizontal: 16,
    borderRadius: Shapes.medium,
    padding: 16,
    gap: 4,
  },
  contactTitle: {
    fontSize: 17,
    fontWeight: '500',
  },
  locationSubtitle: {
    fontSize: 14,
  },
  coordinates: {
    fontSize: 12,
  },
});
