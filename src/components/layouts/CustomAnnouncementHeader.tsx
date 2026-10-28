import { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomAppHeader } from '@/components/layouts/CustomAppHeader';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AnnouncementKind =
  | 'PROFILE'
  | 'BLUETOOTH_PERMISSION'
  | 'BLUETOOTH_OFF'
  | 'BLUETOOTH_UNAVAILABLE'
  | 'GPS_OFF'
  | 'LOCATION_PERMISSION'
  | 'RECEIVING_LOCATION'
  | 'SHARING_LOCATION';

export type AnnouncementItem = {
  kind: AnnouncementKind;
  title: string;
  body: string;
  icon: IconName;
  action?: string;
  person?: string;
};

export type CustomAnnouncementHeaderProps = {
  announcements: AnnouncementItem[];
  onAction: (announcement: AnnouncementItem) => void;
};

export function CustomAnnouncementHeader({
  announcements,
  onAction,
}: CustomAnnouncementHeaderProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState(0);

  const cardWidth = Math.max(width - 48, 240);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / cardWidth);
    if (index !== currentPage) {
      setCurrentPage(index);
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          paddingTop: insets.top + 8,
          backgroundColor: theme.background,
        },
      ]}>
      {announcements.length === 0 ? (
        <CustomAppHeader />
      ) : (
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleScroll}
            contentContainerStyle={styles.carousel}>
            {announcements.map((item) => (
              <Pressable
                key={item.kind}
                onPress={() => onAction(item)}
                accessibilityRole="button"
                accessibilityLabel={item.title}
                style={({ pressed }) => [
                  styles.card,
                  {
                    width: cardWidth,
                    backgroundColor: theme.surfaceMuted,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}>
                <ThemedIcon name={item.icon} size={22} />
                <View style={styles.cardBody}>
                  <ThemedText numberOfLines={2} style={styles.cardTitle}>
                    {item.title}
                  </ThemedText>
                  {item.person ? (
                    <ThemedText numberOfLines={1} themeColor="secondary" style={styles.cardPerson}>
                      {item.person}
                    </ThemedText>
                  ) : null}
                </View>
                {item.action ? (
                  <ThemedText style={styles.cardAction}>{item.action}</ThemedText>
                ) : null}
              </Pressable>
            ))}
          </ScrollView>
          {announcements.length > 1 ? (
            <View style={styles.dotsRow}>
              {announcements.map((item, idx) => (
                <View
                  key={item.kind}
                  style={[
                    styles.dot,
                    {
                      width: idx === currentPage ? 18 : 8,
                      backgroundColor: idx === currentPage ? theme.ink : theme.surfaceSelected,
                    },
                  ]}
                />
              ))}
            </View>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  carousel: {
    gap: 12,
  },
  card: {
    minHeight: 64,
    borderRadius: Shapes.medium,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardBody: {
    flex: 1,
    gap: 3,
  },
  cardTitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  cardPerson: {
    fontSize: 11,
    lineHeight: 15,
  },
  cardAction: {
    fontSize: 12,
    fontWeight: '500',
  },
  dotsRow: {
    width: '100%',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    height: 3,
    borderRadius: 1.5,
  },
});
