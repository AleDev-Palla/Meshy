import { Pressable, StyleSheet, View } from 'react-native';

import { COMMUNITY_STRINGS } from '@/feature/community/constans/community.constans';
import { getPublicProfilePhotoDescription } from '@/feature/community/fuctions/community.fuctions';
import { NearbyPublicProfileItem } from '@/feature/community/types/community.types';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type PublicProfileCardProps = {
  profile: NearbyPublicProfileItem;
  onEnlargePhoto: () => void;
  onOpenChat: () => void;
};

export function PublicProfileCard({
  profile,
  onEnlargePhoto,
  onOpenChat,
}: PublicProfileCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.surfaceSoft }]}>
      <Pressable
        onPress={onEnlargePhoto}
        accessibilityRole="imagebutton"
        accessibilityLabel={getPublicProfilePhotoDescription(profile)}
        style={[styles.photoBox, { backgroundColor: theme.surfaceMuted }]}>
        <ThemedIcon name="user" size={28} tintColor={theme.secondary} />
      </Pressable>

      <View style={styles.infoCol}>
        <ThemedText style={styles.name}>{profile.name}</ThemedText>
        <ThemedText themeColor="secondary" style={styles.contact}>
          {profile.contact}
        </ThemedText>
      </View>

      <ThemedButton
        label={COMMUNITY_STRINGS.messageAction}
        icon="messages"
        variant="ghost"
        onPress={onOpenChat}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: Shapes.medium,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  photoBox: {
    width: 62,
    height: 62,
    borderRadius: Shapes.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoCol: {
    flex: 1,
    gap: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
  contact: {
    fontSize: 13,
  },
});
