import { Image } from 'expo-image';
import { type StyleProp, type ImageStyle } from 'react-native';

import { Icons, IconName } from '@/constants/icons';
import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedIconProps = {
  name: IconName;
  size?: number;
  tintColor?: string;
  themeColor?: ThemeColor;
  description?: string;
  style?: StyleProp<ImageStyle>;
};

export function ThemedIcon({
  name,
  size = 22,
  tintColor,
  themeColor = 'ink',
  description,
  style,
}: ThemedIconProps) {
  const theme = useTheme();
  const resolvedTint = tintColor ?? theme[themeColor];

  return (
    <Image
      source={Icons[name]}
      style={[{ width: size, height: size }, style]}
      tintColor={resolvedTint}
      contentFit="contain"
      accessibilityLabel={description}
    />
  );
}
