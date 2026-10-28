import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ThemedDividerProps = {
  style?: StyleProp<ViewStyle>;
};

export function ThemedDivider({ style }: ThemedDividerProps) {
  const theme = useTheme();

  return <View style={[styles.divider, { backgroundColor: theme.line }, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
  },
});
