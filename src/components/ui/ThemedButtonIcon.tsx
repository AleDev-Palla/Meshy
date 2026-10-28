import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedButtonIconProps = {
  icon: IconName;
  description: string;
  onPress: () => void;
  fill?: string;
  tint?: string;
  size?: number;
  iconSize?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function ThemedButtonIcon({
  icon,
  description,
  onPress,
  fill = 'transparent',
  tint,
  size = 48,
  iconSize = 22,
  disabled = false,
  style,
}: ThemedButtonIconProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={description}
      style={({ pressed }) => [
        styles.button,
        {
          width: size,
          height: size,
          backgroundColor: fill,
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
        },
        style,
      ]}>
      <ThemedIcon name={icon} size={iconSize} tintColor={tint ?? theme.ink} description={description} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Shapes.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
