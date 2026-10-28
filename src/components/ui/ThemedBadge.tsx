import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';

import { useTheme } from '@/hooks/use-theme';

export type ThemedBadgeProps = {
  count: number;
  accessibilityLabel?: string;
};

export function ThemedBadge({ count, accessibilityLabel }: ThemedBadgeProps) {
  const theme = useTheme();
  if (count <= 0) return null;

  const text = count > 99 ? '99+' : String(count);

  return (
    <View
      accessibilityLabel={accessibilityLabel ?? `${count} mensajes sin leer`}
      style={[styles.badge, { backgroundColor: theme.helpRed }]}>
      <ThemedText style={styles.label}>{text}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700',
  },
});
