import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/ui/ThemedText';

import { Shapes, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedAvatarProps = {
  label: string;
  color?: string;
  themeColor?: ThemeColor;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function ThemedAvatar({
  label,
  color,
  themeColor = 'surfaceMuted',
  size = 46,
  style,
}: ThemedAvatarProps) {
  const theme = useTheme();
  const backgroundColor = color ?? theme[themeColor];

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          backgroundColor,
        },
        style,
      ]}>
      <ThemedText style={styles.text}>{label.slice(0, 1).toUpperCase()}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: Shapes.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 19,
    lineHeight: 24,
  },
});
