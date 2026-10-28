import { router } from 'expo-router';
import { useState } from 'react';

import { CONTACTS_STRINGS } from '@/feature/contacts/constans/contacts.constans';
import { useContactsStore } from '@/feature/contacts/states/contacts.state';
import { ContactItem } from '@/feature/contacts/types/contacts.types';

export function useContacts() {
  const contacts = useContactsStore((s) => s.contacts);
  const saveContact = useContactsStore((s) => s.saveContact);
  const removeContact = useContactsStore((s) => s.removeContact);
  const setTrustPriority = useContactsStore((s) => s.setTrustPriority);

  const [formVisible, setFormVisible] = useState(false);
  const [scannerVisible, setScannerVisible] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [scannedCode, setScannedCode] = useState('');
  const [menuContact, setMenuContact] = useState<ContactItem | null>(null);
  const [priorityContact, setPriorityContact] = useState<ContactItem | null>(null);
  const [deleteContact, setDeleteContact] = useState<ContactItem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const openConversation = (code: string) => {
    router.navigate({ pathname: '/messages', params: { contactCode: code } });
  };

  const openAddForm = () => {
    if (contacts.length >= 50) {
      setErrorMessage(CONTACTS_STRINGS.limitFiftyError);
      return;
    }
    setScannedCode('');
    setEditingCode(null);
    setFormVisible(true);
  };

  const openEditForm = (contact: ContactItem) => {
    setMenuContact(null);
    setEditingCode(contact.code);
    setScannedCode('');
    setFormVisible(true);
  };

  const handleSimulatedScan = (code: string) => {
    setScannerVisible(false);
    setScannedCode(code);
    setEditingCode(contacts.find((c) => c.code === code)?.code ?? null);
    setFormVisible(true);
  };

  const handlePriorityChange = (contact: ContactItem, priority: number | null) => {
    const ok = setTrustPriority(contact.code, priority);
    if (ok) {
      setPriorityContact(null);
    } else {
      setErrorMessage(CONTACTS_STRINGS.trustedLimitError);
    }
  };

  const handleDeleteConfirm = () => {
    if (deleteContact) {
      removeContact(deleteContact.code);
      setDeleteContact(null);
    }
  };

  return {
    contacts,
    formVisible,
    setFormVisible,
    scannerVisible,
    setScannerVisible,
    editingContact: contacts.find((c) => c.code === editingCode) ?? null,
    scannedCode,
    menuContact,
    setMenuContact,
    priorityContact,
    setPriorityContact,
    deleteContact,
    setDeleteContact,
    errorMessage,
    setErrorMessage,
    openConversation,
    openAddForm,
    openEditForm,
    handleSimulatedScan,
    handlePriorityChange,
    handleDeleteConfirm,
    saveContact,
    removeContact,
  };
}
