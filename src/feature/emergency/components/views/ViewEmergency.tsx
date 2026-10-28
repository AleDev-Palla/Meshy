import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  EMERGENCY_STRINGS,
  EMERGENCY_TUTORIAL_STEPS,
} from '@/feature/emergency/constans/emergency.constans';
import { useEmergency } from '@/feature/emergency/hooks/useEmergency';
import {
  EmergencyCountdownModal,
  EmergencyTutorialStepRow,
} from '@/feature/emergency/components/layouts/EmergencyCountdownModal';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedButtonIcon } from '@/components/ui/ThemedButtonIcon';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedSwitch } from '@/components/ui/ThemedSwitch';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ViewEmergency() {
  const theme = useTheme();
  const {
    state,
    expanded,
    setExpanded,
    countdownModalVisible,
    startPracticeCountdown,
    cancelOrCloseCountdown,
    setEnabled,
    toggleAssistantSelected,
    goBack,
  } = useEmergency();

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.flex}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.topRow}>
            <ThemedButtonIcon icon="back" description="Volver" onPress={goBack} />
            <ThemedText type="subtitle" style={styles.title}>
              {EMERGENCY_STRINGS.title}
            </ThemedText>
          </View>

          <ThemedText themeColor="secondary" style={styles.hint}>
            {EMERGENCY_STRINGS.hint}
          </ThemedText>

          <ThemedText type="body">{EMERGENCY_STRINGS.intro}</ThemedText>

          {EMERGENCY_TUTORIAL_STEPS.map((step) => (
            <EmergencyTutorialStepRow key={step.number} step={step} />
          ))}

          <View style={[styles.switchCard, { backgroundColor: theme.surfaceSoft }]}>
            <ThemedIcon name="danger" size={22} />
            <ThemedText style={styles.switchTitle}>
              {EMERGENCY_STRINGS.enableSwitchLabel}
            </ThemedText>
            <ThemedSwitch
              checked={state.enabled}
              onCheckedChange={setEnabled}
              accessibilityLabel={EMERGENCY_STRINGS.enableSwitchLabel}
            />
          </View>

          <ThemedText themeColor="secondary" style={styles.bodyText}>
            {state.assistantSelected
              ? EMERGENCY_STRINGS.selectedStatus
              : EMERGENCY_STRINGS.notSelectedStatus}
          </ThemedText>

          <ThemedButton
            label={EMERGENCY_STRINGS.chooseButton}
            fullWidth
            onPress={toggleAssistantSelected}
          />

          {state.assistantSelected ? (
            <View style={styles.practiceBlock}>
              <ThemedButton
                label={EMERGENCY_STRINGS.practiceButton}
                variant="ghost"
                fullWidth
                onPress={startPracticeCountdown}
              />
              <ThemedText themeColor="secondary" style={styles.smallText}>
                {EMERGENCY_STRINGS.practiceHint}
              </ThemedText>
            </View>
          ) : null}

          {!state.enabled && state.assistantSelected ? (
            <ThemedText themeColor="secondary" style={styles.smallText}>
              {EMERGENCY_STRINGS.disabledNote}
            </ThemedText>
          ) : null}

          <ThemedText themeColor="secondary" style={styles.smallText}>
            {EMERGENCY_STRINGS.assistantNotice}
          </ThemedText>

          <View style={styles.expandButtonRow}>
            <ThemedButton
              label={expanded ? EMERGENCY_STRINGS.helpLess : EMERGENCY_STRINGS.helpMore}
              variant="ghost"
              onPress={() => setExpanded((e) => !e)}
            />
          </View>

          {expanded ? (
            <View style={styles.expandedBlock}>
              <ThemedText themeColor="secondary" style={styles.bodyText}>
                {EMERGENCY_STRINGS.requirements}
              </ThemedText>
              <ThemedText themeColor="secondary" style={styles.bodyText}>
                {EMERGENCY_STRINGS.limits}
              </ThemedText>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>

      <EmergencyCountdownModal
        visible={countdownModalVisible}
        status={state.countdownStatus}
        counting={state.counting}
        onCancelOrClose={cancelOrCloseCountdown}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
  },
  hint: {
    fontSize: 13,
    fontWeight: '600',
  },
  switchCard: {
    width: '100%',
    borderRadius: Shapes.medium,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  switchTitle: {
    flex: 1,
    fontSize: 15,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  practiceBlock: {
    gap: 8,
  },
  smallText: {
    fontSize: 12,
    lineHeight: 18,
  },
  expandButtonRow: {
    alignItems: 'flex-start',
  },
  expandedBlock: {
    gap: 14,
  },
});
