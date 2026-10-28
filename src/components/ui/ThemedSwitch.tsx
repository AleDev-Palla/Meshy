import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ThemedSwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export function ThemedSwitch({
  checked,
  onCheckedChange,
  disabled = false,
  accessibilityLabel,
}: ThemedSwitchProps) {
  const theme = useTheme();

  const trackColor = checked ? theme.primary : theme.surfaceMuted;
  const thumbColor = checked ? theme.onPrimary : theme.secondary;

  return (
    <Pressable
      onPress={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      style={[
        styles.track,
        {
          backgroundColor: trackColor,
          opacity: disabled ? 0.45 : 1,
          alignItems: checked ? 'flex-end' : 'flex-start',
        },
      ]}>
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: thumbColor,
            width: checked ? 22 : 18,
            height: checked ? 22 : 18,
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: 4,
    justifyContent: 'center',
  },
  thumb: {
    borderRadius: 11,
  },
});
