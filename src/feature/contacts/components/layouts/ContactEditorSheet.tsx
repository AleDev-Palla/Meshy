import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CONTACTS_STRINGS } from '@/feature/contacts/constans/contacts.constans';
import { ContactItem } from '@/feature/contacts/types/contacts.types';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedField } from '@/components/ui/ThemedField';
import { ThemedText } from '@/components/ui/ThemedText';
import { useTheme } from '@/hooks/use-theme';

export type ContactEditorSheetProps = {
  visible: boolean;
  existing: ContactItem | null;
  scannedCode: string;
  onSave: (code: string, name: string, priority: number, editingCode?: string | null) => boolean;
  onDelete: (code: string) => void;
  onDismiss: () => void;
};

export function ContactEditorSheet(props: ContactEditorSheetProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <ContactEditorForm
      key={`${props.existing?.code ?? 'new'}-${props.scannedCode}`}
      {...props}
    />
  );
}

function ContactEditorForm({
  visible,
  existing,
  scannedCode,
  onSave,
  onDelete,
  onDismiss,
}: ContactEditorSheetProps) {
  const theme = useTheme();
  const [name, setName] = useState(existing?.name ?? '');
  const [code, setCode] = useState(existing?.code ?? scannedCode ?? '');
  const [error, setError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = () => {
    const ok = onSave(code, name, existing?.priority ?? 3, existing?.code);
    if (ok) {
      onDismiss();
    } else {
      setError(true);
    }
  };

  return (
    <>
      <CustomSheet
        visible={visible}
        title={existing ? CONTACTS_STRINGS.editContact : CONTACTS_STRINGS.addContact}
        onDismiss={onDismiss}>
        <View style={styles.form}>
          <ThemedField
            value={name}
            onValueChange={(v) => {
              setName(v.slice(0, 50));
              setError(false);
            }}
            label={CONTACTS_STRINGS.contactName}
          />

          {!existing ? (
            <ThemedField
              value={code}
              onValueChange={(v) => {
                setCode(v.slice(0, 120));
                setError(false);
              }}
              label={CONTACTS_STRINGS.contactCode}
            />
          ) : null}

          {error ? (
            <ThemedText style={[styles.errorText, { color: theme.error }]}>
              {CONTACTS_STRINGS.contactError}
            </ThemedText>
          ) : null}

          <ThemedButton
            label="Guardar"
            fullWidth
            disabled={!name.trim() || !code.trim()}
            onPress={handleSave}
          />

          {existing ? (
            <ThemedButton
              label={CONTACTS_STRINGS.contactRemove}
              variant="ghost"
              onPress={() => setConfirmDelete(true)}
            />
          ) : null}
        </View>
      </CustomSheet>

      <CustomDialog
        visible={confirmDelete && Boolean(existing)}
        message={existing ? `¿Eliminar a ${existing.name} de tus contactos guardados?` : ''}
        confirmLabel={CONTACTS_STRINGS.contactRemove}
        dismissLabel="Cancelar"
        onConfirm={() => {
          if (existing) {
            onDelete(existing.code);
            setConfirmDelete(false);
            onDismiss();
          }
        }}
        onDismiss={() => setConfirmDelete(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  errorText: {
    fontSize: 13,
  },
});
