import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { useMessagesStore } from '@/feature/messages/states/messages.state';
import { ConversationSummary } from '@/feature/messages/types/messages.types';

export function useMessages() {
  const params = useLocalSearchParams<{ contactCode?: string; contactName?: string }>();
  const conversations = useMessagesStore((s) => s.conversations);
  const records = useMessagesStore((s) => s.records);
  const liveContactCode = useMessagesStore((s) => s.liveSharingContactCode);
  const ensureConversation = useMessagesStore((s) => s.ensureConversation);
  const markConversationRead = useMessagesStore((s) => s.markConversationRead);
  const sendChatMessage = useMessagesStore((s) => s.sendChatMessage);
  const sendLocationMessage = useMessagesStore((s) => s.sendLocationMessage);
  const stopLiveSharing = useMessagesStore((s) => s.stopLiveSharing);
  const toggleArchiveConversation = useMessagesStore((s) => s.toggleArchiveConversation);
  const deleteConversationHistory = useMessagesStore((s) => s.deleteConversationHistory);
  const saveLinkedConversationContact = useMessagesStore((s) => s.saveLinkedConversationContact);

  const [selectedContactCode, setSelectedContactCode] = useState<string | null>(null);
  const [dismissedParamCode, setDismissedParamCode] = useState<string | null>(null);
  const [archivedView, setArchivedView] = useState(false);
  const [menuConversation, setMenuConversation] = useState<ConversationSummary | null>(null);
  const [saveContactTarget, setSaveContactTarget] = useState<ConversationSummary | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ConversationSummary | null>(null);

  useEffect(() => {
    if (params.contactCode) {
      ensureConversation(params.contactCode, params.contactName || 'Contacto');
      markConversationRead(params.contactCode);
    }
  }, [params.contactCode, params.contactName, ensureConversation, markConversationRead]);

  const activeContactCode =
    selectedContactCode ??
    (params.contactCode && params.contactCode !== dismissedParamCode ? params.contactCode : null);

  const selectedConversation =
    conversations.find((c) => c.contactCode === activeContactCode) ?? null;

  const visibleConversations = conversations
    .filter((c) => !c.deleted && c.archived === archivedView)
    .sort((a, b) => {
      const aLatest = Math.max(
        0,
        ...records.filter((r) => r.contactCode === a.contactCode).map((r) => r.receivedAtMillis)
      );
      const bLatest = Math.max(
        0,
        ...records.filter((r) => r.contactCode === b.contactCode).map((r) => r.receivedAtMillis)
      );
      return bLatest - aLatest;
    });

  const openConversation = (code: string) => {
    setDismissedParamCode(null);
    setSelectedContactCode(code);
    markConversationRead(code);
  };

  const closeConversation = () => {
    if (params.contactCode) {
      setDismissedParamCode(params.contactCode);
    }
    setSelectedContactCode(null);
  };

  return {
    conversations,
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
    sendText: (code: string, name: string, text: string) => sendChatMessage(code, name, text),
    shareLocation: (code: string, name: string, live: boolean) =>
      sendLocationMessage(code, name, live),
    stopLiveLocation: stopLiveSharing,
    toggleArchive: (code: string) => {
      toggleArchiveConversation(code);
      setMenuConversation(null);
      if (activeContactCode === code) {
        closeConversation();
      }
    },
    deleteConversation: (code: string) => {
      deleteConversationHistory(code);
      setDeleteTarget(null);
      if (activeContactCode === code) {
        closeConversation();
      }
    },
    saveLinkedContact: saveLinkedConversationContact,
  };
}
