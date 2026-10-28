import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextType =
  | 'default'
  | 'welcome'
  | 'title'
  | 'subtitle'
  | 'sectionTitle'
  | 'eyebrow'
  | 'body'
  | 'small'
  | 'smallBold'
  | 'caption'
  | 'brand'
  | 'code';

export type ThemedTextProps = TextProps & {
  type?: ThemedTextType;
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor = 'ink', ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return <Text style={[{ color: theme[themeColor] }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  welcome: {
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -1.8,
    fontWeight: '400',
  },
  title: {
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -1.3,
    fontWeight: '400',
  },
  subtitle: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  eyebrow: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400',
  },
  small: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400',
  },
  smallBold: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '600',
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
  },
  brand: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700', default: '500' }),
    fontSize: 11,
    lineHeight: 16,
  },
});
