import { Pressable, StyleSheet, View } from 'react-native';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedQr } from '@/components/ui/ThemedQr';
import { ThemedSwitch } from '@/components/ui/ThemedSwitch';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { USER_STRINGS } from '@/feature/user/constans/user.constans';

export type UserQrIdentityCardProps = {
  payload: string;
  nearbyAlias: string;
  copiedFeedback: boolean;
  onShare: () => void;
  onCopy: () => void;
};

export function UserQrIdentityCard({
  payload,
  nearbyAlias,
  copiedFeedback,
  onShare,
  onCopy,
}: UserQrIdentityCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.qrCard, { backgroundColor: theme.surfaceSoft }]}>
      <ThemedText style={styles.qrTitle}>{USER_STRINGS.qrTitle}</ThemedText>

      <View style={styles.qrBox}>
        <ThemedQr payload={payload} size={180} description={USER_STRINGS.qrHint} />
      </View>

      <ThemedText themeColor="secondary" style={styles.nearbyCode}>
        {USER_STRINGS.nearbyCodePrefix}
        {nearbyAlias}
      </ThemedText>

      <ThemedText themeColor="secondary" style={styles.nearbyHint}>
        {copiedFeedback ? 'Código copiado' : USER_STRINGS.nearbyHint}
      </ThemedText>

      <View style={styles.actionsRow}>
        <ThemedButton
          label={USER_STRINGS.share}
          icon="share"
          variant="ghost"
          onPress={onShare}
        />
        <ThemedButton
          label={USER_STRINGS.copyNearbyCode}
          icon="copy"
          variant="ghost"
          onPress={onCopy}
        />
      </View>
    </View>
  );
}

export type SettingsNavigationRowProps = {
  title: string;
  subtitle?: string;
  icon: IconName;
  onPress: () => void;
};

export function SettingsNavigationRow({
  title,
  subtitle,
  icon,
  onPress,
}: SettingsNavigationRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.navRow, pressed && styles.pressed]}>
      <View style={styles.iconSlot}>
        <ThemedIcon name={icon} size={22} />
      </View>
      <View style={styles.navTextCol}>
        <ThemedText style={styles.navTitle}>{title}</ThemedText>
        {subtitle ? (
          <ThemedText themeColor="secondary" style={styles.navSubtitle}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      <ThemedIcon name="arrowRight" size={20} themeColor="secondary" />
    </Pressable>
  );
}

export type PreferenceSwitchRowProps = {
  title: string;
  icon: IconName;
  checked: boolean;
  onChange: (value: boolean) => void;
};

export function PreferenceSwitchRow({
  title,
  icon,
  checked,
  onChange,
}: PreferenceSwitchRowProps) {
  return (
    <View style={styles.switchRow}>
      <View style={styles.iconSlot}>
        <ThemedIcon name={icon} size={22} />
      </View>
      <ThemedText style={styles.switchTitle}>{title}</ThemedText>
      <ThemedSwitch checked={checked} onCheckedChange={onChange} accessibilityLabel={title} />
    </View>
  );
}

const styles = StyleSheet.create({
  qrCard: {
    width: '100%',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
  },
  qrTitle: {
    fontSize: 17,
    lineHeight: 22,
  },
  qrBox: {
    marginVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: Shapes.large,
    padding: 8,
  },
  nearbyCode: {
    fontSize: 12,
    marginTop: 12,
  },
  nearbyHint: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
  actionsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  navRow: {
    width: '100%',
    borderRadius: Shapes.medium,
    paddingVertical: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  pressed: {
    opacity: 0.75,
  },
  iconSlot: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTextCol: {
    flex: 1,
    gap: 4,
  },
  navTitle: {
    fontSize: 15,
  },
  navSubtitle: {
    fontSize: 12,
  },
  switchRow: {
    width: '100%',
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  switchTitle: {
    flex: 1,
    fontSize: 15,
  },
});
