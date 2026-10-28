import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CONTACTS_STRINGS } from '@/feature/contacts/constans/contacts.constans';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedQr } from '@/components/ui/ThemedQr';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';

export type ContactsQrScannerModalProps = {
  visible: boolean;
  onClose: () => void;
  onScanComplete: (code: string) => void;
};

export function ContactsQrScannerModal({
  visible,
  onClose,
  onScanComplete,
}: ContactsQrScannerModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.root}>
        <View style={[styles.topBar, { paddingTop: Math.max(insets.top + 16, 48) }]}>
          <ThemedText style={styles.topTitle}>{CONTACTS_STRINGS.scanQr}</ThemedText>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <ThemedText style={styles.closeText}>Cerrar</ThemedText>
          </Pressable>
        </View>

        <View style={styles.centerArea}>
          <Pressable
            onPress={() => onScanComplete('MESHY-7F9A2D4E')}
            style={styles.framingRect}>
            <View style={styles.qrPreview}>
              <ThemedQr payload="MESHY-7F9A2D4E" size={160} isExample />
            </View>
          </Pressable>
        </View>

        <View style={styles.bottomArea}>
          <ThemedText style={styles.prompt}>{CONTACTS_STRINGS.scanPrompt}</ThemedText>
          <ThemedButton
            label="Simular lectura de QR"
            variant="secondary"
            onPress={() => onScanComplete('MESHY-7F9A2D4E')}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#20201F',
    justifyContent: 'space-between',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  topTitle: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 28,
  },
  closeButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: Shapes.medium,
    backgroundColor: '#F1F1EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: '#20201F',
    fontSize: 14,
    fontWeight: '500',
  },
  centerArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  framingRect: {
    width: 260,
    height: 260,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: Shapes.large,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  qrPreview: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: Shapes.medium,
  },
  bottomArea: {
    paddingHorizontal: 24,
    paddingBottom: 64,
    alignItems: 'center',
    gap: 16,
  },
  prompt: {
    color: '#FFFFFF',
    fontSize: 15,
    textAlign: 'center',
  },
});
