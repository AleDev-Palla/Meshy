import { Modal, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EMERGENCY_STRINGS } from '@/feature/emergency/constans/emergency.constans';
import { EmergencyTutorialStepItem } from '@/feature/emergency/types/emergency.types';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';

export type EmergencyTutorialStepRowProps = {
  step: EmergencyTutorialStepItem;
};

export function EmergencyTutorialStepRow({ step }: EmergencyTutorialStepRowProps) {
  return (
    <View style={styles.stepRow}>
      <ThemedIcon
        name={step.icon}
        size={22}
        themeColor="secondary"
        description={`Paso ${step.number}`}
      />
      <ThemedText style={styles.stepText}>{step.text}</ThemedText>
    </View>
  );
}

export type EmergencyCountdownModalProps = {
  visible: boolean;
  status: string;
  counting: boolean;
  onCancelOrClose: () => void;
};

export function EmergencyCountdownModal({
  visible,
  status,
  counting,
  onCancelOrClose,
}: EmergencyCountdownModalProps) {
  return (
    <Modal visible={visible} animationType="fade" onRequestClose={onCancelOrClose}>
      <ThemedView style={styles.modalRoot}>
        <SafeAreaView style={styles.modalContent}>
          <ThemedText type="subtitle">{EMERGENCY_STRINGS.title}</ThemedText>
          <ThemedText type="title" style={styles.statusHeadline}>
            {status}
          </ThemedText>
          <ThemedText style={styles.instruction}>
            {counting
              ? EMERGENCY_STRINGS.countingInstruction
              : EMERGENCY_STRINGS.completedInstruction}
          </ThemedText>
          <View style={styles.buttonBox}>
            <ThemedButton
              label={counting ? EMERGENCY_STRINGS.cancelAlert : EMERGENCY_STRINGS.close}
              onPress={onCancelOrClose}
            />
          </View>
        </SafeAreaView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
  },
  modalRoot: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  statusHeadline: {
    marginTop: 24,
    fontSize: 28,
    lineHeight: 34,
  },
  instruction: {
    marginTop: 16,
    fontSize: 15,
    lineHeight: 22,
  },
  buttonBox: {
    marginTop: 28,
    alignItems: 'flex-start',
  },
});
