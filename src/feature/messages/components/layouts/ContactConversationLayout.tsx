import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import {
  SharedLocationFullScreenModal,
  SharedLocationPreview,
} from '@/feature/messages/components/layouts/SharedLocationCard';
import { MESSAGES_STRINGS } from '@/feature/messages/constans/messages.constans';
import {
  formatConversationStatus,
  getSituationBadgeTitle,
} from '@/feature/messages/fuctions/messages.fuctions';
import { ConversationSummary, MessageRecord } from '@/feature/messages/types/messages.types';

import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedBadge } from '@/components/ui/ThemedBadge';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ContactConversationLayoutProps = {
  conversation: ConversationSummary;
  records: MessageRecord[];
  otherUnreadCount: number;
  liveContactCode: string | null;
  onClose: () => void;
  onShowMenu: () => void;
  onSendText: (text: string) => void;
  onShareLocation: (live: boolean) => void;
  onStopLiveLocation: () => void;
};

export function ContactConversationLayout({
  conversation,
  records,
  otherUnreadCount,
  liveContactCode,
  onClose,
  onShowMenu,
  onSendText,
  onShareLocation,
  onStopLiveLocation,
}: ContactConversationLayoutProps) {
  const theme = useTheme();
  const [draft, setDraft] = useState('');
  const [attachmentVisible, setAttachmentVisible] = useState(false);
  const [selectedMapRecord, setSelectedMapRecord] = useState<MessageRecord | null>(null);

  const sortedMessages = [...records].sort(
    (a, b) => a.receivedAtMillis - b.receivedAtMillis
  );

  const handleSend = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onSendText(trimmed);
    setDraft('');
  };

  return (
    <ThemedView style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}>
        <View style={styles.headerRow}>
          <View style={styles.backBox}>
            <ThemedButtonIcon
              icon="back"
              description="Volver a conversaciones"
              onPress={onClose}
            />
            {otherUnreadCount > 0 ? (
              <View style={styles.backBadge}>
                <ThemedBadge count={otherUnreadCount} />
              </View>
            ) : null}
          </View>
          <ThemedText style={styles.headerTitle}>{conversation.contactName}</ThemedText>
          <ThemedButtonIcon
            icon="moreVertical"
            description="Opciones de conversación"
            onPress={onShowMenu}
            size={44}
          />
        </View>

        {sortedMessages.length === 0 ? (
          <View style={styles.emptyBox}>
            <ThemedText themeColor="secondary">{MESSAGES_STRINGS.noMessages}</ThemedText>
          </View>
        ) : (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}>
            {sortedMessages.map((record) => {
              const situationTitle = getSituationBadgeTitle(record.situation);
              return (
                <View
                  key={record.id}
                  style={[
                    styles.bubbleRow,
                    record.outgoing ? styles.bubbleRowEnd : styles.bubbleRowStart,
                  ]}>
                  <View
                    style={[
                      styles.bubble,
                      {
                        backgroundColor: record.outgoing
                          ? theme.primaryContainer
                          : theme.surfaceSoft,
                      },
                    ]}>
                    {situationTitle ? (
                      <ThemedText themeColor="secondary" style={styles.situationLabel}>
                        {situationTitle}
                      </ThemedText>
                    ) : null}

                    {!record.location || record.situation !== 'chat' ? (
                      <ThemedText style={styles.messageText}>{record.text}</ThemedText>
                    ) : null}

                    {record.location ? (
                      <SharedLocationPreview
                        location={record.location}
                        onOpen={() => setSelectedMapRecord(record)}
                      />
                    ) : null}

                    <ThemedText themeColor="secondary" style={styles.statusLabel}>
                      {formatConversationStatus(record)}
                    </ThemedText>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        {liveContactCode === conversation.contactCode ? (
          <View style={styles.stopLiveRow}>
            <ThemedButton
              label={MESSAGES_STRINGS.stopLiveLocation}
              icon="locationStop"
              variant="ghost"
              onPress={onStopLiveLocation}
            />
          </View>
        ) : null}

        <View style={styles.composerRow}>
          <ThemedButtonIcon
            icon="plus"
            description={MESSAGES_STRINGS.attach}
            onPress={() => setAttachmentVisible(true)}
          />
          <View style={[styles.inputWrapper, { backgroundColor: theme.surfaceSoft }]}>
            <TextInput
              value={draft}
              onChangeText={(v) => setDraft(v.slice(0, 280))}
              placeholder={MESSAGES_STRINGS.writePlaceholder}
              placeholderTextColor={theme.secondary}
              multiline
              maxLength={280}
              style={[styles.input, { color: theme.ink }]}
            />
          </View>
          <ThemedButton
            label={MESSAGES_STRINGS.send}
            icon="send"
            disabled={!draft.trim()}
            onPress={handleSend}
            style={styles.sendButton}
          />
        </View>
      </KeyboardAvoidingView>

      <CustomSheet
        visible={attachmentVisible}
        title={MESSAGES_STRINGS.attach}
        onDismiss={() => setAttachmentVisible(false)}>
        <View style={styles.sheetMenu}>
          <ThemedButton
            label={MESSAGES_STRINGS.shareCurrentLocation}
            icon="locationCurrent"
            variant="ghost"
            onPress={() => {
              setAttachmentVisible(false);
              onShareLocation(false);
            }}
          />
          <ThemedButton
            label={MESSAGES_STRINGS.shareLiveLocation}
            icon="locationLive"
            variant="ghost"
            onPress={() => {
              setAttachmentVisible(false);
              onShareLocation(true);
            }}
          />
        </View>
      </CustomSheet>

      <SharedLocationFullScreenModal
        visible={Boolean(selectedMapRecord?.location)}
        location={selectedMapRecord?.location ?? null}
        contactName={conversation.contactName}
        onClose={() => setSelectedMapRecord(null)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
  },
  flex: {
    flex: 1,
  },
  headerRow: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBox: {
    position: 'relative',
  },
  backBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    marginLeft: 12,
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesList: {
    paddingVertical: 12,
    gap: 10,
  },
  bubbleRow: {
    width: '100%',
    flexDirection: 'row',
  },
  bubbleRowStart: {
    justifyContent: 'flex-start',
  },
  bubbleRowEnd: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: 300,
    minWidth: 160,
    borderRadius: Shapes.medium,
    padding: 12,
    gap: 5,
  },
  situationLabel: {
    fontSize: 12,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  statusLabel: {
    fontSize: 11,
  },
  stopLiveRow: {
    alignItems: 'flex-start',
    paddingVertical: 4,
  },
  composerRow: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: Shapes.small,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 52,
    justifyContent: 'center',
  },
  input: {
    fontSize: 15,
    maxHeight: 96,
  },
  sendButton: {
    minHeight: 52,
    paddingHorizontal: 14,
    borderRadius: Shapes.small,
  },
  sheetMenu: {
    alignItems: 'flex-start',
    gap: 6,
  },
});
