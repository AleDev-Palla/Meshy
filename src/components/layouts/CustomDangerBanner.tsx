import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CustomDangerBannerProps = {
  contactName: string;
  count: number;
  onOpenConversation: () => void;
};

export function CustomDangerBanner({
  contactName,
  count,
  onOpenConversation,
}: CustomDangerBannerProps) {
  const theme = useTheme();

  if (count <= 0) return null;

  return (
    <View style={[styles.outer, { backgroundColor: theme.background }]}>
      <Pressable
        onPress={onOpenConversation}
        accessibilityRole="button"
        accessibilityLabel={`Aviso de peligro de ${contactName}. ${count} sin leer. Abrir conversación.`}
        style={({ pressed }) => [
          styles.banner,
          {
            backgroundColor: theme.dangerBackground,
            opacity: pressed ? 0.85 : 1,
          },
        ]}>
        <ThemedIcon name="danger" size={22} tintColor={theme.dangerForeground} />
        <View style={styles.textCol}>
          <ThemedText style={[styles.title, { color: theme.dangerForeground }]}>
            Avisos de peligro sin leer: {count}
          </ThemedText>
          <ThemedText style={[styles.body, { color: theme.dangerSecondary }]}>
            {contactName} · abre la conversación para leer el aviso.
          </ThemedText>
        </View>
        <ThemedText style={[styles.action, { color: theme.dangerForeground }]}>Leer</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  banner: {
    width: '100%',
    borderRadius: Shapes.medium,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textCol: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '500',
  },
  body: {
    fontSize: 12,
    lineHeight: 16,
  },
  action: {
    fontSize: 12,
    fontWeight: '600',
  },
});
