import { Pressable, StyleSheet, View } from 'react-native';

import { MESSAGES_STRINGS } from '@/feature/messages/constans/messages.constans';
import { ConversationSummary, MessageRecord } from '@/feature/messages/types/messages.types';

import { ThemedAvatar } from '@/components/ui/ThemedAvatar';
import { ThemedBadge } from '@/components/ui/ThemedBadge';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ConversationRowProps = {
  conversation: ConversationSummary;
  records: MessageRecord[];
  onOpen: () => void;
  onMenu: () => void;
};

export function ConversationRow({
  conversation,
  records,
  onOpen,
  onMenu,
}: ConversationRowProps) {
  const theme = useTheme();
  const unread = records.filter((r) => r.unread).length;
  const latest = [...records].sort((a, b) => b.receivedAtMillis - a.receivedAtMillis)[0];

  return (
    <Pressable
      onPress={onOpen}
      onLongPress={onMenu}
      style={({ pressed }) => [
        styles.surface,
        {
          backgroundColor: theme.surfaceSoft,
          opacity: pressed ? 0.85 : 1,
        },
      ]}>
      <View style={styles.row}>
        <ThemedAvatar label={conversation.contactName} />
        <View style={styles.textCol}>
          <ThemedText style={styles.name}>{conversation.contactName}</ThemedText>
          <ThemedText numberOfLines={2} themeColor="secondary" style={styles.preview}>
            {latest?.text ?? MESSAGES_STRINGS.noMessages}
          </ThemedText>
        </View>
        {unread > 0 ? <ThemedBadge count={unread} /> : null}
        <ThemedButtonIcon
          icon="moreVertical"
          description="Opciones de conversación"
          onPress={onMenu}
          size={36}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  surface: {
    width: '100%',
    borderRadius: Shapes.medium,
    marginTop: 12,
  },
  row: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  textCol: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 16,
  },
  preview: {
    fontSize: 13,
    lineHeight: 18,
  },
});
