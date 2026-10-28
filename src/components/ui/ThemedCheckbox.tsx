import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';

import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
};

export function ThemedCheckbox({ checked, onChange, label }: ThemedCheckboxProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={styles.row}>
      <View
        style={[
          styles.box,
          {
            borderColor: checked ? theme.ink : theme.secondary,
            backgroundColor: checked ? theme.ink : 'transparent',
          },
        ]}>
        {checked && <View style={[styles.checkMark, { borderColor: theme.surface }]} />}
      </View>
      <ThemedText themeColor="secondary" style={styles.label}>
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    borderRadius: Shapes.small,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: 10,
    height: 5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '-45deg' }, { translateY: -1 }],
  },
  label: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
  },
});
