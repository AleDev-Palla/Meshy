import { Pressable, StyleSheet, View } from 'react-native';

import { CONTACTS_STRINGS } from '@/feature/contacts/constans/contacts.constans';
import { useContacts } from '@/feature/contacts/hooks/useContacts';
import { ContactEditorSheet } from '@/feature/contacts/components/layouts/ContactEditorSheet';
import { ContactsQrScannerModal } from '@/feature/contacts/components/layouts/ContactsQrScannerModal';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomMainPage } from '@/components/layouts/CustomMainPage';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedAvatar } from '@/components/ui/ThemedAvatar';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedDivider } from '@/components/ui/ThemedDivider';
import { ThemedEmpty } from '@/components/ui/ThemedEmpty';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';

export function ViewContacts() {
  const {
    contacts,
    formVisible,
    setFormVisible,
    scannerVisible,
    setScannerVisible,
    editingContact,
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
  } = useContacts();

  return (
    <>
      <CustomMainPage>
        <View style={styles.headerRow}>
          <ThemedText type="sectionTitle" themeColor="secondary" style={styles.sectionTitle}>
            {CONTACTS_STRINGS.title}
          </ThemedText>
          <ThemedButtonIcon
            icon="qr"
            description={CONTACTS_STRINGS.scanQr}
            onPress={() => setScannerVisible(true)}
            fill="#20201F"
            tint="#FFFFFF"
          />
          <ThemedButtonIcon
            icon="plus"
            description={CONTACTS_STRINGS.addContact}
            onPress={openAddForm}
            fill="#20201F"
            tint="#FFFFFF"
          />
        </View>

        {contacts.length === 0 ? (
          <ThemedEmpty
            icon="contacts"
            title={CONTACTS_STRINGS.emptyTitle}
            body={CONTACTS_STRINGS.emptyBody}
            style={styles.emptySpace}
          />
        ) : (
          <View style={styles.listWrapper}>
            {contacts.map((contact, index) => {
              const showGroupHeader =
                index === 0 || contacts[index - 1].trusted !== contact.trusted;

              return (
                <View key={contact.code}>
                  {showGroupHeader ? (
                    <ThemedText themeColor="secondary" style={styles.groupHeading}>
                      {contact.trusted
                        ? CONTACTS_STRINGS.trustedHeading
                        : CONTACTS_STRINGS.othersHeading}
                    </ThemedText>
                  ) : null}

                  <Pressable
                    onPress={() => openConversation(contact.code)}
                    onLongPress={() => setMenuContact(contact)}
                    style={({ pressed }) => [styles.contactRow, pressed && styles.rowPressed]}>
                    <ThemedAvatar label={contact.name} />
                    <View style={styles.contactInfo}>
                      <ThemedText style={styles.contactName}>{contact.name}</ThemedText>
                      {contact.trusted ? (
                        <View style={styles.trustRow}>
                          <ThemedIcon name="trustedContact" size={16} themeColor="secondary" />
                          <ThemedText themeColor="secondary" style={styles.trustText}>
                            Confianza · prioridad {contact.priority}
                          </ThemedText>
                        </View>
                      ) : null}
                    </View>
                    <ThemedButtonIcon
                      icon="moreVertical"
                      description="Opciones de contacto"
                      onPress={() => setMenuContact(contact)}
                    />
                  </Pressable>
                  <ThemedDivider />
                </View>
              );
            })}
          </View>
        )}
      </CustomMainPage>

      <ContactEditorSheet
        visible={formVisible}
        existing={editingContact}
        scannedCode={scannedCode}
        onSave={saveContact}
        onDelete={removeContact}
        onDismiss={() => setFormVisible(false)}
      />

      <ContactsQrScannerModal
        visible={scannerVisible}
        onClose={() => setScannerVisible(false)}
        onScanComplete={handleSimulatedScan}
      />

      <CustomSheet
        visible={Boolean(menuContact)}
        title={menuContact?.name ?? ''}
        onDismiss={() => setMenuContact(null)}>
        {menuContact ? (
          <View style={styles.sheetMenu}>
            <ThemedButton
              label={CONTACTS_STRINGS.editContact}
              icon="editContact"
              variant="ghost"
              onPress={() => openEditForm(menuContact)}
              style={styles.menuButton}
            />
            <ThemedButton
              label={CONTACTS_STRINGS.contactPriority}
              icon="priority"
              variant="ghost"
              onPress={() => {
                const target = menuContact;
                setMenuContact(null);
                setPriorityContact(target);
              }}
              style={styles.menuButton}
            />
            <ThemedButton
              label={CONTACTS_STRINGS.contactRemove}
              icon="delete"
              variant="ghost"
              onPress={() => {
                const target = menuContact;
                setMenuContact(null);
                setDeleteContact(target);
              }}
              style={styles.menuButton}
            />
          </View>
        ) : null}
      </CustomSheet>

      <CustomSheet
        visible={Boolean(priorityContact)}
        title={CONTACTS_STRINGS.contactPriority}
        onDismiss={() => setPriorityContact(null)}>
        {priorityContact ? (
          <View style={styles.sheetMenu}>
            {[1, 2, 3].map((p) => (
              <ThemedButton
                key={p}
                label={`Confianza · prioridad ${p}`}
                icon="trustedContact"
                variant="ghost"
                onPress={() => handlePriorityChange(priorityContact, p)}
                style={styles.menuButton}
              />
            ))}
            {priorityContact.trusted ? (
              <ThemedButton
                label={CONTACTS_STRINGS.removeTrust}
                variant="ghost"
                onPress={() => handlePriorityChange(priorityContact, null)}
                style={styles.menuButton}
              />
            ) : null}
          </View>
        ) : null}
      </CustomSheet>

      <CustomDialog
        visible={Boolean(deleteContact)}
        message={
          deleteContact ? `¿Eliminar a ${deleteContact.name} de tus contactos guardados?` : ''
        }
        confirmLabel={CONTACTS_STRINGS.contactRemove}
        dismissLabel="Cancelar"
        onConfirm={handleDeleteConfirm}
        onDismiss={() => setDeleteContact(null)}
      />

      <CustomDialog
        visible={Boolean(errorMessage)}
        title={CONTACTS_STRINGS.addContact}
        message={errorMessage ?? ''}
        onDismiss={() => setErrorMessage(null)}
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
  sectionTitle: {
    flex: 1,
  },
  emptySpace: {
    marginTop: 48,
  },
  listWrapper: {
    marginTop: 24,
  },
  groupHeading: {
    fontSize: 13,
    marginTop: 16,
  },
  contactRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  rowPressed: {
    opacity: 0.75,
  },
  contactInfo: {
    flex: 1,
    paddingHorizontal: 12,
    gap: 3,
  },
  contactName: {
    fontSize: 16,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustText: {
    fontSize: 12,
  },
  sheetMenu: {
    alignItems: 'flex-start',
    gap: 6,
  },
  menuButton: {
    justifyContent: 'flex-start',
  },
});
