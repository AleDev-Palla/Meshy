import { StyleSheet, View } from 'react-native';

import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedLogo } from '@/components/ui/ThemedLogo';
import { ThemedText } from '@/components/ui/ThemedText';

export type OnboardingBrandHeaderProps = {
  canGoBack: boolean;
  onBack: () => void;
};

export function OnboardingBrandHeader({ canGoBack, onBack }: OnboardingBrandHeaderProps) {
  return (
    <View style={styles.container}>
      {canGoBack ? (
        <View style={styles.backSlot}>
          <ThemedButtonIcon icon="back" description="Volver" onPress={onBack} />
        </View>
      ) : null}
      <View style={styles.brandRow}>
        <ThemedLogo width={39} height={32} />
        <ThemedText type="brand">Meshy</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 460,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backSlot: {
    position: 'absolute',
    left: 0,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
});
