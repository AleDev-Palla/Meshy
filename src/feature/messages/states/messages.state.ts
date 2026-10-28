import { create } from 'zustand';

import {
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGE_RECORDS,
} from '@/feature/messages/constans/messages.constans';
import {
  chatMessageSchema,
  linkedContactNameSchema,
} from '@/feature/messages/fuctions/messages.fuctions';
import { ConversationSummary, MessageRecord } from '@/feature/messages/types/messages.types';

export type MessagesStore = {
  conversations: ConversationSummary[];
  records: MessageRecord[];
  liveSharingContactCode: string | null;
  ensureConversation: (contactCode: string, contactName: string, isSaved?: boolean) => void;
  markConversationRead: (contactCode: string) => void;
  sendChatMessage: (contactCode: string, contactName: string, text: string) => void;
  sendLocationMessage: (contactCode: string, contactName: string, live: boolean) => void;
  stopLiveSharing: () => void;
  toggleArchiveConversation: (contactCode: string) => void;
  deleteConversationHistory: (contactCode: string) => void;
  saveLinkedConversationContact: (contactCode: string, newName: string) => boolean;
};

export const useMessagesStore = create<MessagesStore>((set, get) => ({
  conversations: [...INITIAL_CONVERSATIONS],
  records: [...INITIAL_MESSAGE_RECORDS],
  liveSharingContactCode: null,
  ensureConversation: (contactCode, contactName, isSaved = true) => {
    const current = get().conversations;
    const exists = current.find((c) => c.contactCode === contactCode);
    if (!exists) {
      set({
        conversations: [
          ...current,
          {
            contactCode,
            contactName,
            isSavedContact: isSaved,
            archived: false,
            deleted: false,
          },
        ],
      });
    } else if (exists.deleted) {
      set({
        conversations: current.map((c) =>
          c.contactCode === contactCode ? { ...c, deleted: false } : c
        ),
      });
    }
  },
  markConversationRead: (contactCode) => {
    const currentRecords = get().records;
    const hasUnread = currentRecords.some((r) => r.contactCode === contactCode && r.unread);
    if (!hasUnread) return;
    set({
      records: currentRecords.map((r) =>
        r.contactCode === contactCode && r.unread ? { ...r, unread: false } : r
      ),
    });
  },
  sendChatMessage: (contactCode, contactName, text) => {
    const parsed = chatMessageSchema.safeParse({ contactCode, contactName, text });
    if (!parsed.success) return;
    get().ensureConversation(parsed.data.contactCode, parsed.data.contactName);
    const newRecord: MessageRecord = {
      id: `msg-${Date.now()}`,
      contactCode: parsed.data.contactCode,
      contactName: parsed.data.contactName,
      outgoing: true,
      situation: 'chat',
      text: parsed.data.text,
      receivedAtMillis: Date.now(),
      unread: false,
      status: 'DELIVERED',
    };
    set((state) => ({ records: [...state.records, newRecord] }));
  },
  sendLocationMessage: (contactCode, contactName, live) => {
    get().ensureConversation(contactCode, contactName);
    const newRecord: MessageRecord = {
      id: `msg-loc-${Date.now()}`,
      contactCode,
      contactName,
      outgoing: true,
      situation: 'chat',
      text: live ? 'Ubicación en vivo' : 'Ubicación actual',
      receivedAtMillis: Date.now(),
      unread: false,
      status: 'DELIVERED',
      location: {
        latitude: 19.4174,
        longitude: -99.1649,
        live,
        ended: false,
        sessionId: live ? `sess-${Date.now()}` : undefined,
      },
    };
    set((state) => ({
      liveSharingContactCode: live ? contactCode : state.liveSharingContactCode,
      records: [...state.records, newRecord],
    }));
  },
  stopLiveSharing: () => {
    const activeCode = get().liveSharingContactCode;
    set((state) => ({
      liveSharingContactCode: null,
      records: activeCode
        ? state.records.map((r) =>
            r.outgoing && r.contactCode === activeCode && r.location?.live
              ? { ...r, location: { ...r.location, ended: true } }
              : r
          )
        : state.records,
    }));
  },
  toggleArchiveConversation: (contactCode) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.contactCode === contactCode ? { ...c, archived: !c.archived } : c
      ),
    }));
  },
  deleteConversationHistory: (contactCode) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.contactCode === contactCode ? { ...c, deleted: true } : c
      ),
      records: state.records.filter((r) => r.contactCode !== contactCode),
    }));
  },
  saveLinkedConversationContact: (contactCode, newName) => {
    const parsed = linkedContactNameSchema.safeParse(newName);
    if (!parsed.success) return false;
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.contactCode === contactCode
          ? { ...c, contactName: parsed.data, isSavedContact: true }
          : c
      ),
      records: state.records.map((r) =>
        r.contactCode === contactCode ? { ...r, contactName: parsed.data } : r
      ),
    }));
    return true;
  },
}));
