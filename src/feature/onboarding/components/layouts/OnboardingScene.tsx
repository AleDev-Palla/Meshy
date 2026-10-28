import { StyleSheet, View } from 'react-native';

import { ONBOARDING_EXAMPLE_CONTACTS } from '@/feature/onboarding/constans/onboarding.constans';
import { getOnboardingSceneDescription } from '@/feature/onboarding/fuctions/onboarding.fuctions';
import { OnboardingIllustrationKind } from '@/feature/onboarding/types/onboarding.types';

import { MESHY_SITUATIONS } from '@/components/layouts/CustomSituationPicker';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type OnboardingSceneProps = {
  kind: OnboardingIllustrationKind;
};

export function OnboardingScene({ kind }: OnboardingSceneProps) {
  const theme = useTheme();
  if (kind === 'NONE') return null;

  const description = getOnboardingSceneDescription(kind);

  return (
    <View
      accessibilityLabel={description}
      style={[styles.card, { backgroundColor: theme.surfaceSoft }]}>
      {kind === 'HELP' ? (
        <View style={styles.sceneBlock}>
          <View style={styles.helpRow}>
            <View style={[styles.phoneFrame, { backgroundColor: theme.background }]}>
              <View style={[styles.phoneNotch, { backgroundColor: theme.ink }]} />
              <ThemedIcon name="userWarning" size={30} />
            </View>
            <ThemedIcon name="arrowRight" size={22} />
            <ThemedIcon name="messages" size={36} />
          </View>
          <ThemedText style={styles.volumeLabel}>20 s · Volumen</ThemedText>
          <ThemedText style={styles.messageTitle}>Necesito ayuda</ThemedText>
        </View>
      ) : null}

      {kind === 'CONTACTS' ? (
        <View style={styles.sceneBlock}>
          <ThemedIcon name="qr" size={62} />
          <View style={styles.contactsRow}>
            {ONBOARDING_EXAMPLE_CONTACTS.map((name) => (
              <View key={name} style={styles.contactCol}>
                <View style={[styles.contactAvatar, { backgroundColor: theme.background }]}>
                  <ThemedIcon name="user" size={22} />
                </View>
                <ThemedText style={styles.contactName}>{name}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {kind === 'ALERTS' ? (
        <View style={styles.alertsList}>
          {MESHY_SITUATIONS.map((situation) => (
            <View key={situation.key} style={styles.alertRow}>
              <ThemedIcon name={situation.icon} size={26} />
              <ThemedText style={styles.alertTitle}>{situation.title}</ThemedText>
            </View>
          ))}
        </View>
      ) : null}

      {kind === 'COMMUNITY' ? (
        <View style={styles.sceneBlock}>
          <View style={styles.networkBox}>
            <View style={[styles.networkLine, { backgroundColor: theme.line }]} />
            <View style={styles.nodesRow}>
              {(['user', 'peer', 'user'] as const).map((icon, idx) => (
                <View key={idx} style={[styles.nodeBox, { backgroundColor: theme.background }]}>
                  <ThemedIcon name={icon} size={28} />
                </View>
              ))}
            </View>
          </View>
          <ThemedText themeColor="secondary" style={styles.networkCaption}>
            Tu teléfono también puede conectar a otros.
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Shapes.large,
    padding: 24,
    alignItems: 'center',
  },
  sceneBlock: {
    width: '100%',
    alignItems: 'center',
    gap: 18,
  },
  helpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  phoneFrame: {
    width: 72,
    height: 106,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneNotch: {
    position: 'absolute',
    top: 7,
    width: 16,
    height: 2,
  },
  volumeLabel: {
    fontSize: 13,
  },
  messageTitle: {
    fontSize: 16,
  },
  contactsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  contactCol: {
    alignItems: 'center',
    gap: 9,
  },
  contactAvatar: {
    width: 46,
    height: 46,
    borderRadius: Shapes.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 12,
  },
  alertsList: {
    width: '100%',
    gap: 18,
  },
  alertRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  alertTitle: {
    fontSize: 14,
  },
  networkBox: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
  },
  networkLine: {
    position: 'absolute',
    left: '20%',
    right: '20%',
    height: 1,
  },
  nodesRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  nodeBox: {
    width: 54,
    height: 54,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  networkCaption: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
});
