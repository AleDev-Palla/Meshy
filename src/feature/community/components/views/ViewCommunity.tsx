import { StyleSheet, View } from 'react-native';

import { COMMUNITY_STRINGS } from '@/feature/community/constans/community.constans';
import { useCommunity } from '@/feature/community/hooks/useCommunity';
import { PublicProfileCard } from '@/feature/community/components/layouts/PublicProfileCard';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomMainPage } from '@/components/layouts/CustomMainPage';
import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export function ViewCommunity() {
  const theme = useTheme();
  const { profiles, enlargedProfile, setEnlargedProfile, openChatWithProfile } =
    useCommunity();

  return (
    <>
      <CustomMainPage>
        <ThemedText style={styles.headline}>{COMMUNITY_STRINGS.title}</ThemedText>

        {profiles.length === 0 ? (
          <ThemedText themeColor="secondary" style={styles.emptyText}>
            {COMMUNITY_STRINGS.emptyBody}
          </ThemedText>
        ) : (
          <View style={styles.list}>
            {profiles.map((profile) => (
              <PublicProfileCard
                key={profile.code}
                profile={profile}
                onEnlargePhoto={() => setEnlargedProfile(profile)}
                onOpenChat={() => openChatWithProfile(profile)}
              />
            ))}
          </View>
        )}
      </CustomMainPage>

      <CustomDialog
        visible={Boolean(enlargedProfile)}
        title={enlargedProfile?.name}
        confirmLabel={COMMUNITY_STRINGS.closeAction}
        onDismiss={() => setEnlargedProfile(null)}>
        <View style={[styles.enlargedPhoto, { backgroundColor: theme.surfaceSoft }]}>
          <ThemedIcon name="user" size={64} tintColor={theme.secondary} />
        </View>
      </CustomDialog>
    </>
  );
}

const styles = StyleSheet.create({
  headline: {
    fontSize: 24,
    lineHeight: 32,
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    gap: 12,
  },
  enlargedPhoto: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: Shapes.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
