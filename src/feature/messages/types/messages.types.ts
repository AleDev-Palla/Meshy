export type SharedLocationData = {
  latitude: number;
  longitude: number;
  live: boolean;
  ended?: boolean;
  sessionId?: string;
};

export type MessageDeliveryStatus = 'PENDING' | 'DELIVERED' | 'QUEUED' | 'SENT' | 'RECEIVED' | 'FAILED';

export type MessageRecord = {
  id: string;
  contactCode: string;
  contactName: string;
  outgoing: boolean;
  situation: 'chat' | 'contact' | 'company' | 'danger' | 'urgent';
  text: string;
  receivedAtMillis: number;
  unread: boolean;
  status: MessageDeliveryStatus;
  location?: SharedLocationData;
};

export type ConversationSummary = {
  contactCode: string;
  contactName: string;
  isSavedContact: boolean;
  archived: boolean;
  deleted: boolean;
};
