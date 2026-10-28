import { z } from 'zod';

import { MESSAGES_STRINGS } from '@/feature/messages/constans/messages.constans';
import { MessageRecord, SharedLocationData } from '@/feature/messages/types/messages.types';

export const chatMessageSchema = z.object({
  contactCode: z.string().trim().min(1),
  contactName: z.string().trim().min(1).max(50),
  text: z.string().trim().min(1).max(280),
});

export const linkedContactNameSchema = z.string().trim().min(1).max(50);

export function formatMessageTime(millis: number): string {
  const date = new Date(millis);
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${mins}`;
}

export function formatConversationStatus(record: MessageRecord): string {
  const time = formatMessageTime(record.receivedAtMillis);
  if (!record.outgoing) return time;

  let statusText = '';
  switch (record.status) {
    case 'PENDING':
      statusText = 'Enviando por BLE…';
      break;
    case 'DELIVERED':
      statusText = 'Entregado';
      break;
    case 'QUEUED':
      statusText = 'En espera de entrega';
      break;
    case 'SENT':
      statusText = 'Enviado';
      break;
    default:
      statusText = 'Sin entregar';
      break;
  }

  return `${time} · ${statusText}`;
}

export function getSituationBadgeTitle(situation: MessageRecord['situation']): string | null {
  switch (situation) {
    case 'contact':
      return 'Necesito hablar';
    case 'company':
      return 'Acompáñame';
    case 'danger':
      return 'Me siento en peligro';
    case 'urgent':
      return 'Peligro inmediato';
    default:
      return null;
  }
}

export function getSharedLocationLabel(location: SharedLocationData): string {
  if (location.live && location.ended) {
    return MESSAGES_STRINGS.endedLocationLabel;
  }
  return location.live ? MESSAGES_STRINGS.liveLocationLabel : MESSAGES_STRINGS.locationLabel;
}
