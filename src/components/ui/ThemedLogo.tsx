import { Image } from 'expo-image';
import { type StyleProp, type ImageStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

const logoSource = require('@/assets/images/meshy-manada.png');

export type ThemedLogoProps = {
  width?: number;
  height?: number;
  tintColor?: string;
  description?: string;
  style?: StyleProp<ImageStyle>;
};

export function ThemedLogo({
  width = 38,
  height = 32,
  tintColor,
  description = 'La manada: un elefante adulto acompaña a uno pequeño',
  style,
}: ThemedLogoProps) {
  const theme = useTheme();

  return (
    <Image
      source={logoSource}
      style={[{ width, height }, style]}
      tintColor={tintColor ?? theme.ink}
      contentFit="contain"
      accessibilityLabel={description}
    />
  );
}
