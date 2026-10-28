import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedChoiceProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  onPress: () => void;
};

export function ThemedChoice({ icon, title, subtitle, onPress }: ThemedChoiceProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.surface,
        { backgroundColor: theme.surfaceSoft, opacity: pressed ? 0.8 : 1 },
      ]}>
      <View style={styles.row}>
        <ThemedIcon name={icon} size={26} />
        <View style={styles.textColumn}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          {subtitle ? (
            <ThemedText themeColor="secondary" style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        <ThemedIcon name="arrowRight" size={18} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    borderRadius: Shapes.medium,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  textColumn: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
  },
});
