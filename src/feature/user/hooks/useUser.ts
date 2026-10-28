import { router } from 'expo-router';
import { useState } from 'react';
import { Share } from 'react-native';

import {
  getParticipationPresetTitle,
  getShortNearbyAlias,
} from '@/feature/user/fuctions/user.fuctions';
import { useUserStore } from '@/feature/user/states/user.state';
import { UserDialogKind } from '@/feature/user/types/user.types';

import { useBleRuntime } from '@/feature/ble/hooks/useBleRuntime';
import { useHomeStore } from '@/feature/home/states/home.state';
import { setAppColorScheme, useColorScheme } from '@/hooks/use-color-scheme';

export function useUser() {
  const state = useUserStore();
  const templates = useHomeStore((s) => s.templates);
  const saveTemplate = useHomeStore((s) => s.saveTemplate);
  const updateHome = useHomeStore((s) => s.updateHome);
  const [copiedFeedback, setCopiedFeedback] = useState(false);
  const colorScheme = useColorScheme();
  const ble = useBleRuntime();

  const nearbyAlias = getShortNearbyAlias(state.userCode);
  const presetTitle = getParticipationPresetTitle(state.participation);

  const shareInvitation = async () => {
    try {
      await Share.share({
        message: state.invitationPayload,
      });
    } catch {
    }
  };

  const copyNearbyAlias = () => {
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  const toggleDarkTheme = (dark: boolean) => {
    setAppColorScheme(dark ? 'dark' : 'light');
  };

  const openEmergencySetup = () => {
    state.setDialog(null);
    router.push('/emergency');
  };

  return {
    state,
    nearbyAlias,
    presetTitle,
    copiedFeedback,
    darkTheme: colorScheme === 'dark',
    toggleDarkTheme,
    ble,
    templates,
    saveTemplate,
    setDialog: (dialog: UserDialogKind) => state.setDialog(dialog),
    saveParticipation: (p: typeof state.participation) => {
      state.saveParticipation(p);
      updateHome({ askHelpEnabled: p.askHelp });
    },
    saveHelperProfile: state.saveHelperProfile,
    saveSafePlace: state.saveSafePlace,
    shareInvitation,
    copyNearbyAlias,
    openEmergencySetup,
  };
}
