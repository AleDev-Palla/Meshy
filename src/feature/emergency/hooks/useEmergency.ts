import { router } from 'expo-router';
import { useEffect, useState } from 'react';

import { formatEmergencyCountdown } from '@/feature/emergency/fuctions/emergency.fuctions';
import { useEmergencyStore } from '@/feature/emergency/states/emergency.state';

export function useEmergency() {
  const state = useEmergencyStore();
  const updateEmergency = useEmergencyStore((s) => s.updateEmergency);
  const [expanded, setExpanded] = useState(false);
  const [countdownModalVisible, setCountdownModalVisible] = useState(false);

  useEffect(() => {
    if (!countdownModalVisible || !state.counting) return;
    if (state.secondsRemaining <= 0) {
      updateEmergency({
        counting: false,
        countdownStatus: formatEmergencyCountdown(0, state.practiceArmed),
      });
      return;
    }

    const timer = setTimeout(() => {
      const next = state.secondsRemaining - 1;
      updateEmergency({
        secondsRemaining: next,
        countdownStatus: formatEmergencyCountdown(next, state.practiceArmed),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [
    countdownModalVisible,
    state.counting,
    state.secondsRemaining,
    state.practiceArmed,
    updateEmergency,
  ]);

  const startPracticeCountdown = () => {
    updateEmergency({
      practiceArmed: true,
      counting: true,
      secondsRemaining: 5,
      countdownStatus: formatEmergencyCountdown(5, true),
    });
    setCountdownModalVisible(true);
  };

  const cancelOrCloseCountdown = () => {
    updateEmergency({
      counting: false,
      practiceArmed: false,
      countdownStatus: 'Alerta cancelada',
    });
    setCountdownModalVisible(false);
  };

  return {
    state,
    expanded,
    setExpanded,
    countdownModalVisible,
    startPracticeCountdown,
    cancelOrCloseCountdown,
    setEnabled: (enabled: boolean) => updateEmergency({ enabled }),
    toggleAssistantSelected: () =>
      updateEmergency({ assistantSelected: !state.assistantSelected }),
    goBack: () => router.back(),
  };
}
