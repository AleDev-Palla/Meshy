import { create } from 'zustand';

import { INITIAL_CONTACTS } from '@/feature/contacts/constans/contacts.constans';
import { sortContacts, validateContactEntry } from '@/feature/contacts/fuctions/contacts.fuctions';
import { ContactItem } from '@/feature/contacts/types/contacts.types';

export type ContactsStore = {
  contacts: ContactItem[];
  saveContact: (
    rawCode: string,
    rawName: string,
    priority: number,
    editingCode?: string | null
  ) => boolean;
  removeContact: (code: string) => void;
  setTrustPriority: (code: string, priority: number | null) => boolean;
};

export const useContactsStore = create<ContactsStore>((set, get) => ({
  contacts: sortContacts(INITIAL_CONTACTS),
  saveContact: (rawCode, rawName, priority, editingCode) => {
    const validated = validateContactEntry(rawCode, rawName, priority);
    if (!validated) return false;

    const currentList = get().contacts;
    const others = currentList.filter((c) => c.code !== editingCode);
    if (others.length >= 50 || others.some((c) => c.code === validated.code)) return false;

    const existing = currentList.find((c) => c.code === editingCode);
    const updated: ContactItem = {
      code: validated.code,
      name: validated.name,
      priority: existing?.priority ?? validated.priority,
      trusted: existing?.trusted ?? false,
      qrVerified: true,
    };

    set({ contacts: sortContacts([...others, updated]) });
    return true;
  },
  removeContact: (code) => {
    set((state) => ({
      contacts: sortContacts(state.contacts.filter((c) => c.code !== code)),
    }));
  },
  setTrustPriority: (code, priority) => {
    const currentList = get().contacts;
    const selected = currentList.find((c) => c.code === code);
    if (!selected) return false;
    if (priority !== null && !selected.trusted && currentList.filter((c) => c.trusted).length >= 3) {
      return false;
    }

    const occupied =
      priority !== null
        ? currentList.find((c) => c.trusted && c.priority === priority && c.code !== code)
        : undefined;

    const replacement = selected.trusted
      ? selected.priority
      : ([1, 2, 3].find((p) => !currentList.some((c) => c.trusted && c.priority === p)) ?? 3);

    set({
      contacts: sortContacts(
        currentList.map((c) => {
          if (c.code === code) {
            return {
              ...c,
              trusted: priority !== null,
              priority: priority ?? c.priority,
            };
          }
          if (occupied && c.code === occupied.code) {
            return {
              ...c,
              priority: replacement,
            };
          }
          return c;
        })
      ),
    });
    return true;
  },
}));
