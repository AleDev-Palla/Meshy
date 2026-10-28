import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomSheet } from '@/components/layouts/CustomSheet';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedChoice } from '@/components/ui/ThemedChoice';
import { ThemedField } from '@/components/ui/ThemedField';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconName } from '@/constants/icons';

export type SituationItem = {
  key: 'contact' | 'company' | 'danger' | 'urgent';
  title: string;
  defaultMessage: string;
  icon: IconName;
};

export const MESHY_SITUATIONS: SituationItem[] = [
  {
    key: 'contact',
    title: 'Necesito hablar',
    defaultMessage: 'Necesito hablar contigo. Por favor, ponte en contacto conmigo.',
    icon: 'complaint',
  },
  {
    key: 'company',
    title: 'Acompáñame',
    defaultMessage: 'Me gustaría que estuvieras pendiente de mi trayecto. ¿Puedes acompañarme?',
    icon: 'userWarning',
  },
  {
    key: 'danger',
    title: 'Me siento en peligro',
    defaultMessage:
      'Me siento en peligro. Por favor, contacta conmigo y revisa mi ubicación si está disponible.',
    icon: 'alert',
  },
  {
    key: 'urgent',
    title: 'Peligro inmediato',
    defaultMessage:
      'Creo que mi vida corre peligro. Contacta a los servicios de emergencia y comparte mi última ubicación disponible.',
    icon: 'danger',
  },
];

export type CustomSituationPickerProps = {
  visible: boolean;
  editing: boolean;
  templates: Record<string, string>;
  onSaveTemplate?: (key: string, message: string) => void;
  onSendHelp?: (situation: SituationItem, text: string, done: (feedback: string) => void) => void;
  onDismiss: () => void;
};

export function CustomSituationPicker({
  visible,
  editing,
  templates,
  onSaveTemplate,
  onSendHelp,
  onDismiss,
}: CustomSituationPickerProps) {
  const [selected, setSelected] = useState<SituationItem | null>(null);
  const [draftMessage, setDraftMessage] = useState('');
  const [resultText, setResultText] = useState<string | null>(null);

  const handleClose = () => {
    setSelected(null);
    setResultText(null);
    onDismiss();
  };

  const handleSelectSituation = (situation: SituationItem) => {
    const currentText = (templates[situation.key] || '').trim() || situation.defaultMessage;
    setSelected(situation);
    setDraftMessage(currentText);
    setResultText(null);
    if (!editing && onSendHelp) {
      onSendHelp(situation, currentText, (feedback) => {
        setResultText(feedback);
      });
    }
  };

  return (
    <CustomSheet
      visible={visible}
      title={
        selected
          ? selected.title
          : editing
            ? 'Configurar mensajes'
            : '¿Qué apoyo necesitas?'
      }
      onDismiss={handleClose}>
      {!selected ? (
        <View style={styles.list}>
          {editing ? (
            <ThemedText themeColor="secondary" style={styles.intro}>
              Elige qué quieres decir en cada situación. Se guarda en este dispositivo.
            </ThemedText>
          ) : null}
          {MESHY_SITUATIONS.map((situation) => (
            <ThemedChoice
              key={situation.key}
              icon={situation.icon}
              title={situation.title}
              onPress={() => handleSelectSituation(situation)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.detail}>
          <ThemedIcon name={selected.icon} size={32} />
          {editing ? (
            <>
              <ThemedField
                value={draftMessage}
                onValueChange={(v) => setDraftMessage(v.slice(0, 280))}
                label="Mensaje para esta situación"
                singleLine={false}
                maxLength={280}
              />
              <ThemedText type="caption" themeColor="secondary">
                {draftMessage.length} / 280
              </ThemedText>
              <ThemedButton
                label="Guardar"
                fullWidth
                disabled={!draftMessage.trim()}
                onPress={() => {
                  onSaveTemplate?.(selected.key, draftMessage.trim());
                  setSelected(null);
                }}
              />
            </>
          ) : (
            <>
              <ThemedText style={styles.sentMessage}>{draftMessage}</ThemedText>
              <ThemedText themeColor="secondary" style={styles.statusText}>
                {resultText ?? 'Enviando por BLEâ€¦ Esperando confirmación del otro dispositivo.'}
              </ThemedText>
            </>
          )}
          <View style={styles.backRow}>
            <ThemedButton label="Volver" variant="ghost" onPress={() => setSelected(null)} />
          </View>
        </View>
      )}
    </CustomSheet>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  intro: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 4,
  },
  detail: {
    gap: 14,
  },
  sentMessage: {
    fontSize: 17,
    lineHeight: 25,
  },
  statusText: {
    fontSize: 13,
    lineHeight: 20,
  },
  backRow: {
    alignItems: 'flex-start',
  },
});
