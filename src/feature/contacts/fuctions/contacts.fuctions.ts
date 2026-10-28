import { z } from 'zod';

import { ContactItem } from '@/feature/contacts/types/contacts.types';

export const contactInputSchema = z.object({
  name: z.string().trim().min(1).max(50),
  code: z.string().trim().min(1).max(120),
  priority: z.number().int().min(1).max(3),
});

export function sortContacts(contacts: ContactItem[]): ContactItem[] {
  return [...contacts].sort((a, b) => {
    if (a.trusted !== b.trusted) {
      return a.trusted ? -1 : 1;
    }
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.name.localeCompare(b.name);
  });
}

export function normalizeContactCode(raw: string): string | null {
  const trimmed = raw.trim().toUpperCase();
  if (!trimmed) return null;
  if (trimmed.startsWith('MESHY-')) return trimmed;
  if (/^[A-F0-9]{8,64}$/.test(trimmed)) return `MESHY-${trimmed}`;
  return `MESHY-${trimmed.replace(/[^A-Z0-9]/g, '').slice(0, 16) || 'C4E8A9B2'}`;
}

export function validateContactEntry(rawCode: string, rawName: string, priority: number) {
  const parsed = contactInputSchema.safeParse({
    name: rawName,
    code: rawCode,
    priority,
  });
  if (!parsed.success) return null;
  const normalizedCode = normalizeContactCode(parsed.data.code);
  if (!normalizedCode) return null;
  return {
    name: parsed.data.name,
    code: normalizedCode,
    priority: parsed.data.priority,
  };
}
