import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { PARTICIPATION_PRESETS, USER_STRINGS } from '@/feature/user/constans/user.constans';
import { isSameParticipation } from '@/feature/user/fuctions/user.fuctions';
import { ParticipationSettings } from '@/feature/user/types/user.types';

import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedChoice } from '@/components/ui/ThemedChoice';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedSwitch } from '@/components/ui/ThemedSwitch';
import { ThemedText } from '@/components/ui/ThemedText';
import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ParticipationSheetProps = {
  visible: boolean;
  current: ParticipationSettings;
  isHelperProfileReady: boolean;
  onSave: (settings: ParticipationSettings) => void;
  onDismiss: () => void;
};

export function ParticipationSheet(props: ParticipationSheetProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <ParticipationForm
      key={`${props.current.askHelp}-${props.current.bridge}-${props.current.receiveAlerts}-${props.current.publicProfile}`}
      {...props}
    />
  );
}

function ParticipationForm({
  visible,
  current,
  isHelperProfileReady,
  onSave,
  onDismiss,
}: ParticipationSheetProps) {
  const theme = useTheme();
  const [draft, setDraft] = useState<ParticipationSettings>(current);
  const [customExpanded, setCustomExpanded] = useState(false);

  return (
    <CustomSheet
      visible={visible}
      title={customExpanded ? USER_STRINGS.customPreset : USER_STRINGS.participationTitle}
      onDismiss={onDismiss}>
      {!customExpanded ? (
        <View style={styles.list}>
          {PARTICIPATION_PRESETS.map((preset) => {
            const selected = isSameParticipation(draft, preset.settings);
            return (
              <Pressable
                key={preset.key}
                onPress={() => setDraft(preset.settings)}
                accessibilityRole="radio"
                accessibilityState={{ checked: selected }}
                style={[
                  styles.presetCard,
                  {
                    backgroundColor: selected ? theme.surfaceSelected : theme.surfaceSoft,
                  },
                ]}>
                <ThemedIcon name={preset.icon} size={22} />
                <View style={styles.presetTextCol}>
                  <ThemedText style={styles.presetTitle}>{preset.title}</ThemedText>
                  <ThemedText themeColor="secondary" style={styles.presetSubtitle}>
                    {preset.subtitle}
                  </ThemedText>
                </View>
                <View
                  style={[
                    styles.radioOuter,
                    { borderColor: selected ? theme.ink : theme.secondary },
                  ]}>
                  {selected ? (
                    <View style={[styles.radioInner, { backgroundColor: theme.ink }]} />
                  ) : null}
                </View>
              </Pressable>
            );
          })}

          <ThemedChoice
            icon="settings"
            title={USER_STRINGS.customPreset}
            onPress={() => setCustomExpanded(true)}
          />
        </View>
      ) : (
        <View style={styles.customList}>
          <View style={styles.backRow}>
            <ThemedButton
              label="Tipos de cuenta"
              variant="ghost"
              onPress={() => setCustomExpanded(false)}
            />
          </View>
          <CapabilityRow
            icon="userWarning"
            title="Pedir ayuda"
            checked={draft.askHelp}
            onChange={(v) => setDraft({ ...draft, askHelp: v })}
          />
          <CapabilityRow
            icon="peer"
            title="Actuar como puente"
            checked={draft.bridge}
            onChange={(v) => setDraft({ ...draft, bridge: v })}
          />
          <CapabilityRow
            icon="messages"
            title="Recibir avisos"
            checked={draft.receiveAlerts}
            onChange={(v) => setDraft({ ...draft, receiveAlerts: v })}
          />
          <CapabilityRow
            icon="user"
            title="Perfil público"
            checked={draft.publicProfile}
            onChange={(v) => setDraft({ ...draft, publicProfile: v })}
          />
        </View>
      )}

      {draft.publicProfile && !isHelperProfileReady ? (
        <ThemedText themeColor="secondary" style={styles.profileNotice}>
          Configura tu perfil en Ajustes → Perfil. Puedes elegir esta cuenta y completarlo después.
        </ThemedText>
      ) : null}

      <ThemedButton
        label="Guardar"
        fullWidth
        onPress={() => {
          onSave(draft);
          onDismiss();
        }}
      />
    </CustomSheet>
  );
}

type CapabilityRowProps = {
  icon: IconName;
  title: string;
  checked: boolean;
  onChange: (value: boolean) => void;
};

function CapabilityRow({ icon, title, checked, onChange }: CapabilityRowProps) {
  return (
    <View style={styles.capabilityRow}>
      <ThemedIcon name={icon} size={22} />
      <ThemedText style={styles.capabilityTitle}>{title}</ThemedText>
      <ThemedSwitch checked={checked} onCheckedChange={onChange} accessibilityLabel={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  presetCard: {
    width: '100%',
    borderRadius: Shapes.medium,
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  presetTextCol: {
    flex: 1,
    gap: 5,
  },
  presetTitle: {
    fontSize: 16,
  },
  presetSubtitle: {
    fontSize: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  customList: {
    gap: 8,
  },
  backRow: {
    alignItems: 'flex-start',
  },
  capabilityRow: {
    width: '100%',
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  capabilityTitle: {
    flex: 1,
    fontSize: 15,
  },
  profileNotice: {
    fontSize: 12,
    lineHeight: 18,
  },
});
