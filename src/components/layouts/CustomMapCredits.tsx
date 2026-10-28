import { useEffect, useState } from 'react';
import { Linking, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { CustomDialog } from '@/components/layouts/CustomDialog';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';

export type CustomMapCreditsProps = {
  style?: StyleProp<ViewStyle>;
};

export function CustomMapCredits({ style }: CustomMapCreditsProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCollapsed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Pressable
        onPress={() => setExpanded(true)}
        accessibilityRole="button"
        accessibilityLabel="Créditos del mapa"
        style={[styles.trigger, style]}>
        {collapsed ? (
          <ThemedIcon name="info" size={20} />
        ) : (
          <ThemedText style={styles.creditText}>© OpenStreetMap · OpenFreeMap</ThemedText>
        )}
      </Pressable>

      <CustomDialog
        visible={expanded}
        title="Créditos del mapa"
        message="Calles: colaboradores de OpenStreetMap. Teselas: OpenFreeMap. Esquema: OpenMapTiles."
        onDismiss={() => setExpanded(false)}>
        <View style={styles.links}>
          <ThemedButton
            label="OpenStreetMap"
            variant="ghost"
            onPress={() => Linking.openURL('https://www.openstreetmap.org/copyright')}
          />
          <ThemedButton
            label="OpenFreeMap"
            variant="ghost"
            onPress={() => Linking.openURL('https://openfreemap.org/')}
          />
          <ThemedButton
            label="OpenMapTiles"
            variant="ghost"
            onPress={() => Linking.openURL('https://openmaptiles.org/')}
          />
        </View>
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    borderRadius: Shapes.small,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  creditText: {
    fontSize: 11,
    lineHeight: 15,
  },
  links: {
    alignItems: 'flex-start',
    gap: 2,
  },
});
