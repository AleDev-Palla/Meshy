import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedBadge } from '@/components/ui/ThemedBadge';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type TabDestination = {
  route: '/' | '/contacts' | '/messages' | '/community' | '/user';
  matchPaths: string[];
  label: string;
  icon: IconName;
};

const DESTINATIONS: TabDestination[] = [
  { route: '/', matchPaths: ['/', '/index'], label: 'Inicio', icon: 'home' },
  { route: '/contacts', matchPaths: ['/contacts'], label: 'Contactos', icon: 'contacts' },
  { route: '/messages', matchPaths: ['/messages'], label: 'Mensajes', icon: 'messages' },
  { route: '/community', matchPaths: ['/community'], label: 'Comunidad', icon: 'contacts' },
  { route: '/user', matchPaths: ['/user'], label: 'Usuario', icon: 'user' },
];

export type CustomTabBarProps = {
  unreadCount?: number;
  hidden?: boolean;
};

export function CustomTabBar({ unreadCount = 0, hidden = false }: CustomTabBarProps) {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  if (hidden) return null;

  return (
    <View
      accessibilityRole="tablist"
      style={[
        styles.bar,
        {
          backgroundColor: theme.background,
          paddingBottom: Math.max(insets.bottom, 8),
        },
      ]}>
      {DESTINATIONS.map((dest) => {
        const selected = dest.matchPaths.includes(pathname);
        const showBadge = dest.route === '/messages' && !selected && unreadCount > 0;

        return (
          <Pressable
            key={dest.route}
            onPress={() => router.navigate(dest.route)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={[
              styles.tab,
              {
                backgroundColor: selected ? theme.surfaceSelected : 'transparent',
              },
            ]}>
            <View style={styles.iconContainer}>
              <ThemedIcon name={dest.icon} size={22} />
              {showBadge ? (
                <View style={styles.badgeOverlay}>
                  <ThemedBadge count={unreadCount} />
                </View>
              ) : null}
            </View>
            <ThemedText numberOfLines={1} style={styles.label}>
              {dest.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 4,
  },
  tab: {
    flex: 1,
    minHeight: 60,
    borderRadius: Shapes.medium,
    paddingHorizontal: 3,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOverlay: {
    position: 'absolute',
    top: -6,
    right: -12,
  },
  label: {
    fontSize: 10,
    lineHeight: 13,
  },
});
