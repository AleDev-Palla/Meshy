import { Redirect, router, Slot } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import {
  AnnouncementItem,
  CustomAnnouncementHeader,
} from '@/components/layouts/CustomAnnouncementHeader';
import { CustomDangerBanner } from '@/components/layouts/CustomDangerBanner';
import { CustomTabBar } from '@/components/layouts/CustomTabBar';

import { ThemedView } from '@/components/ui/ThemedView';
import { useBleRuntime } from '@/feature/ble/hooks/useBleRuntime';
import { useMessagesStore } from '@/feature/messages/states/messages.state';
import { useOnboardingStore } from '@/feature/onboarding/states/onboarding.state';
import { useUserStore } from '@/feature/user/states/user.state';

export function CustomTabsLayout() {
  const ble = useBleRuntime();
  const onboardingDone = useOnboardingStore((s) => s.completed);
  const unreadCount = useMessagesStore((s) => s.records.filter((r) => r.unread).length);
  const setDialog = useUserStore((s) => s.setDialog);

  if (!onboardingDone) {
    return <Redirect href="/onboarding" />;
  }

  const handleAnnouncementAction = (announcement: AnnouncementItem) => {
    switch (announcement.kind) {
      case 'PROFILE':
        setDialog('profile');
        router.navigate('/user');
        break;
      case 'BLUETOOTH_OFF':
        ble.setBluetoothEnabled(true);
        break;
      case 'GPS_OFF':
        ble.setLocationEnabled(true);
        break;
      case 'BLUETOOTH_PERMISSION':
      case 'LOCATION_PERMISSION':
        ble.grantAllPermissions();
        break;
      default:
        break;
    }
  };

  return (
    <ThemedView style={styles.container}>
      <CustomAnnouncementHeader
        announcements={ble.announcements}
        onAction={handleAnnouncementAction}
      />

      {ble.state.pendingDangerCount > 0 && ble.state.pendingDangerContactName ? (
        <CustomDangerBanner
          contactName={ble.state.pendingDangerContactName}
          count={ble.state.pendingDangerCount}
          onOpenConversation={() => {
            if (ble.state.pendingDangerContactCode) {
              ble.clearPendingDanger();
              router.navigate({
                pathname: '/messages',
                params: { contactCode: ble.state.pendingDangerContactCode },
              });
            }
          }}
        />
      ) : null}

      <View style={styles.content}>
        <Slot />
      </View>

      <CustomTabBar unreadCount={unreadCount} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
