import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { HelperProfileData } from '@/feature/user/types/user.types';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedCheckbox } from '@/components/ui/ThemedCheckbox';
import { ThemedField } from '@/components/ui/ThemedField';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ProfileSettingsSheetProps = {
  visible: boolean;
  current: HelperProfileData;
  publicProfileEnabled: boolean;
  onSave: (profile: HelperProfileData) => boolean;
  onDismiss: () => void;
};

export function ProfileSettingsSheet(props: ProfileSettingsSheetProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <ProfileSettingsForm
      key={`${props.current.name}-${props.current.contact}-${props.current.hasPhoto}-${props.current.consent}`}
      {...props}
    />
  );
}

function ProfileSettingsForm({
  visible,
  current,
  publicProfileEnabled,
  onSave,
  onDismiss,
}: ProfileSettingsSheetProps) {
  const theme = useTheme();
  const [name, setName] = useState(current.name);
  const [contact, setContact] = useState(current.contact);
  const [hasPhoto, setHasPhoto] = useState(current.hasPhoto);
  const [consent, setConsent] = useState(current.consent);
  const [cameraDialog, setCameraDialog] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <CustomSheet visible={visible} title="Perfil" onDismiss={onDismiss}>
        <View style={styles.photoSection}>
          <View style={[styles.photoBox, { backgroundColor: theme.surfaceSoft }]}>
            <ThemedIcon
              name={hasPhoto ? 'faceScan' : 'user'}
              size={42}
              tintColor={hasPhoto ? theme.ink : theme.secondary}
            />
          </View>
          <ThemedButton
            label={hasPhoto ? 'Cambiar foto' : 'Añadir foto'}
            icon="camera"
            variant="ghost"
            onPress={() => setCameraDialog(true)}
          />
        </View>

        <ThemedField
          value={name}
          onValueChange={(v) => {
            setName(v.slice(0, 50));
            setError(false);
          }}
          label="Nombre"
          leadingIcon="user"
        />

        <ThemedField
          value={contact}
          onValueChange={(v) => {
            setContact(v.slice(0, 100));
            setError(false);
          }}
          label="Contacto"
          leadingIcon="contactCard"
        />

        <ThemedCheckbox
          checked={consent}
          onChange={setConsent}
          label="Compartir mi foto, nombre y contacto con personas cercanas."
        />

        {publicProfileEnabled ? (
          <ThemedText themeColor="secondary" style={styles.noteText}>
            Los cambios estarán disponibles cada 7 días.
          </ThemedText>
        ) : null}

        {error ? (
          <ThemedText style={[styles.errorText, { color: theme.error }]}>
            Revisa los campos y toma tu foto antes de publicar.
          </ThemedText>
        ) : null}

        <ThemedButton
          label="Guardar"
          fullWidth
          onPress={() => {
            const ok = onSave({ name, contact, hasPhoto, consent });
            if (ok) {
              onDismiss();
            } else {
              setError(true);
            }
          }}
        />
      </CustomSheet>

      <CustomDialog
        visible={cameraDialog}
        title="Tu foto"
        confirmLabel="Usar foto"
        dismissLabel="Cancelar"
        onConfirm={() => {
          setHasPhoto(true);
          setError(false);
          setCameraDialog(false);
        }}
        onDismiss={() => setCameraDialog(false)}>
        <View style={styles.selfieDialogBody}>
          <View style={styles.selfieHeaderRow}>
            <ThemedIcon name="faceScan" size={24} />
            <ThemedText>Centra tu rostro</ThemedText>
          </View>
          <View style={[styles.cameraPreview, { backgroundColor: theme.surfaceSoft }]}>
            <ThemedIcon name="faceScan" size={56} tintColor={theme.secondary} />
          </View>
          <ThemedText themeColor="secondary" style={styles.noteText}>
            La foto será pública. No acredita tu identidad.
          </ThemedText>
        </View>
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  photoBox: {
    width: 132,
    height: 132,
    borderRadius: Shapes.extraLarge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteText: {
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 13,
  },
  selfieDialogBody: {
    gap: 12,
  },
  selfieHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cameraPreview: {
    width: '100%',
    height: 220,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
