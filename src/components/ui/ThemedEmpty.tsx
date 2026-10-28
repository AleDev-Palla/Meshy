import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedEmptyProps = {
  icon: IconName;
  title: string;
  body?: string;
  style?: StyleProp<ViewStyle>;
};

export function ThemedEmpty({ icon, title, body, style }: ThemedEmptyProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconBox, { backgroundColor: theme.surfaceSoft }]}>
        <ThemedIcon name={icon} size={30} tintColor={theme.secondary} />
      </View>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {body ? (
        <ThemedText themeColor="secondary" style={styles.body}>
          {body}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: Shapes.large,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
});
