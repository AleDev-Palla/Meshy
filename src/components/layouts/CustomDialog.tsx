import { type ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type CustomDialogProps = {
  visible: boolean;
  title?: string;
  message?: string;
  children?: ReactNode;
  confirmLabel?: string;
  dismissLabel?: string;
  onConfirm?: () => void;
  onDismiss: () => void;
  confirmDisabled?: boolean;
};

export function CustomDialog({
  visible,
  title,
  message,
  children,
  confirmLabel = 'Cerrar',
  dismissLabel,
  onConfirm,
  onDismiss,
  confirmDisabled = false,
}: CustomDialogProps) {
  const theme = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onDismiss} />
        <View style={[styles.dialog, { backgroundColor: theme.background }]}>
          {title ? (
            <ThemedText type="subtitle" style={styles.title}>
              {title}
            </ThemedText>
          ) : null}
          {message ? (
            <ThemedText themeColor="secondary" style={styles.message}>
              {message}
            </ThemedText>
          ) : null}
          {children}
          <View style={styles.actions}>
            {dismissLabel ? (
              <ThemedButton label={dismissLabel} variant="ghost" onPress={onDismiss} />
            ) : null}
            <ThemedButton
              label={confirmLabel}
              variant="ghost"
              disabled={confirmDisabled}
              onPress={onConfirm ?? onDismiss}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  dialog: {
    width: '100%',
    maxWidth: 380,
    borderRadius: Shapes.large,
    padding: 24,
    gap: 14,
  },
  title: {
    fontSize: 19,
    lineHeight: 25,
  },
  message: {
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 6,
  },
});
