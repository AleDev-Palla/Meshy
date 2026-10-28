import { StyleSheet, View } from 'react-native';

import { ThemedLogo } from '@/components/ui/ThemedLogo';
import { ThemedText } from '@/components/ui/ThemedText';

export function CustomAppHeader() {
  return (
    <View style={styles.header}>
      <ThemedLogo width={38} height={32} />
      <ThemedText type="brand">Meshy</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
});
