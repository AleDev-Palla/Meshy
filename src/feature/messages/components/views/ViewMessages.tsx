import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { MESSAGES_STRINGS } from '@/feature/messages/constans/messages.constans';
import { useMessages } from '@/feature/messages/hooks/useMessages';
import { ContactConversationLayout } from '@/feature/messages/components/layouts/ContactConversationLayout';
import { ConversationRow } from '@/feature/messages/components/layouts/ConversationRow';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomMainPage } from '@/components/layouts/CustomMainPage';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedEmpty } from '@/components/ui/ThemedEmpty';
import { ThemedField } from '@/components/ui/ThemedField';
import { ThemedText } from '@/components/ui/ThemedText';

export function ViewMessages() {
  const {
    visibleConversations,
    records,
    selectedConversation,
    archivedView,
    setArchivedView,
    liveContactCode,
    menuConversation,
    setMenuConversation,
    saveContactTarget,
    setSaveContactTarget,
    deleteTarget,
    setDeleteTarget,
    openConversation,
    closeConversation,
    sendText,
    shareLocation,
    stopLiveLocation,
    toggleArchive,
    deleteConversation,
    saveLinkedContact,
  } = useMessages();

  const [newContactName, setNewContactName] = useState('');

  const otherUnreadCount = selectedConversation
    ? records.filter(
        (r) => r.contactCode !== selectedConversation.contactCode && r.unread
      ).length
    : 0;

  return (
    <>
      {selectedConversation ? (
        <ContactConversationLayout
          conversation={selectedConversation}
          records={records.filter(
            (r) => r.contactCode === selectedConversation.contactCode
          )}
          otherUnreadCount={otherUnreadCount}
          liveContactCode={liveContactCode}
          onClose={closeConversation}
          onShowMenu={() => setMenuConversation(selectedConversation)}
          onSendText={(text) =>
            sendText(
              selectedConversation.contactCode,
              selectedConversation.contactName,
              text
            )
          }
          onShareLocation={(live) =>
            shareLocation(
              selectedConversation.contactCode,
              selectedConversation.contactName,
              live
            )
          }
          onStopLiveLocation={stopLiveLocation}
        />
      ) : (
        <CustomMainPage>
          <View style={styles.headerRow}>
            {archivedView ? (
              <ThemedButtonIcon
                icon="back"
                description="Volver a conversaciones"
                onPress={() => setArchivedView(false)}
              />
            ) : null}
            <ThemedText type="sectionTitle" themeColor="secondary">
              {archivedView ? MESSAGES_STRINGS.archivedTitle : MESSAGES_STRINGS.chatsTitle}
            </ThemedText>
          </View>

          {visibleConversations.length === 0 ? (
            <ThemedEmpty
              icon="messages"
              title={MESSAGES_STRINGS.emptyTitle}
              style={styles.emptySpace}
            />
          ) : (
            <View>
              {visibleConversations.map((conv) => (
                <ConversationRow
                  key={conv.contactCode}
                  conversation={conv}
                  records={records.filter((r) => r.contactCode === conv.contactCode)}
                  onOpen={() => openConversation(conv.contactCode)}
                  onMenu={() => setMenuConversation(conv)}
                />
              ))}
            </View>
          )}

          {!archivedView ? (
            <View style={styles.archiveTriggerRow}>
              <ThemedButton
                label={MESSAGES_STRINGS.archivedTitle}
                icon="archive"
                variant="ghost"
                onPress={() => setArchivedView(true)}
              />
            </View>
          ) : null}
        </CustomMainPage>
      )}

      <CustomSheet
        visible={Boolean(menuConversation)}
        title={menuConversation?.contactName ?? ''}
        onDismiss={() => setMenuConversation(null)}>
        {menuConversation ? (
          <View style={styles.sheetMenu}>
            <ThemedButton
              label={
                menuConversation.archived
                  ? MESSAGES_STRINGS.unarchiveChat
                  : MESSAGES_STRINGS.archiveChat
              }
              icon={menuConversation.archived ? 'unarchive' : 'archive'}
              variant="ghost"
              onPress={() => toggleArchive(menuConversation.contactCode)}
            />
            {!menuConversation.isSavedContact ? (
              <ThemedButton
                label={MESSAGES_STRINGS.saveContact}
                icon="contactCard"
                variant="ghost"
                onPress={() => {
                  const target = menuConversation;
                  setMenuConversation(null);
                  setNewContactName(target.contactName);
                  setSaveContactTarget(target);
                }}
              />
            ) : null}
            <ThemedButton
              label={MESSAGES_STRINGS.deleteChat}
              icon="delete"
              variant="ghost"
              onPress={() => {
                const target = menuConversation;
                setMenuConversation(null);
                setDeleteTarget(target);
              }}
            />
          </View>
        ) : null}
      </CustomSheet>

      <CustomSheet
        visible={Boolean(saveContactTarget)}
        title={MESSAGES_STRINGS.saveContact}
        onDismiss={() => setSaveContactTarget(null)}>
        <View style={styles.saveForm}>
          <ThemedField
            value={newContactName}
            onValueChange={(v) => setNewContactName(v.slice(0, 50))}
            label="Nombre"
          />
          <ThemedButton
            label="Guardar"
            fullWidth
            disabled={!newContactName.trim()}
            onPress={() => {
              if (saveContactTarget) {
                saveLinkedContact(saveContactTarget.contactCode, newContactName);
                setSaveContactTarget(null);
              }
            }}
          />
        </View>
      </CustomSheet>

      <CustomDialog
        visible={Boolean(deleteTarget)}
        message={MESSAGES_STRINGS.deleteQuestion}
        confirmLabel={MESSAGES_STRINGS.deleteChat}
        dismissLabel="Cancelar"
        onConfirm={() => {
          if (deleteTarget) {
            deleteConversation(deleteTarget.contactCode);
          }
        }}
        onDismiss={() => setDeleteTarget(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emptySpace: {
    marginTop: 48,
  },
  archiveTriggerRow: {
    marginTop: 20,
    alignItems: 'center',
  },
  sheetMenu: {
    alignItems: 'flex-start',
    gap: 6,
  },
  saveForm: {
    gap: 16,
  },
});
