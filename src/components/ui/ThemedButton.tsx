import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedButtonVariant = 'primary' | 'danger' | 'ghost' | 'secondary' | 'surface';

export type ThemedButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ThemedButtonVariant;
  icon?: IconName;
  trailingIcon?: IconName;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ThemedButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  trailingIcon,
  disabled = false,
  fullWidth = false,
  style,
}: ThemedButtonProps) {
  const theme = useTheme();

  const backgroundColor =
    variant === 'primary'
      ? theme.ink
      : variant === 'danger'
        ? theme.helpRed
        : variant === 'secondary'
          ? theme.surfaceSelected
          : variant === 'surface'
            ? theme.surfaceSoft
            : 'transparent';

  const contentColor =
    variant === 'primary'
      ? theme.surface
      : variant === 'danger'
        ? '#FFFFFF'
        : theme.ink;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        variant === 'ghost' ? styles.ghostButton : styles.filledButton,
        fullWidth && styles.fullWidth,
        {
          backgroundColor,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
        style,
      ]}>
      {icon && <ThemedIcon name={icon} size={20} tintColor={contentColor} />}
      <ThemedText
        style={[
          styles.label,
          { color: contentColor },
          Boolean(trailingIcon) && fullWidth && styles.flexLabel,
        ]}>
        {label}
      </ThemedText>
      {trailingIcon && (
        <View style={styles.trailing}>
          <ThemedIcon name={trailingIcon} size={22} tintColor={contentColor} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Shapes.medium,
    gap: 8,
  },
  filledButton: {
    minHeight: 52,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  ghostButton: {
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Shapes.small,
  },
  fullWidth: {
    width: '100%',
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  flexLabel: {
    flex: 1,
  },
  trailing: {
    marginLeft: 12,
  },
});
