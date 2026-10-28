import { useState } from 'react';

import { getPresenceAccessibilityDescription } from '@/feature/home/fuctions/home.fuctions';
import { useHomeStore } from '@/feature/home/states/home.state';
import { DevicePresenceInfo, SafePlaceItem } from '@/feature/home/types/home.types';

import { SituationItem } from '@/components/layouts/CustomSituationPicker';

export function useHome() {
  const safePlaces = useHomeStore((s) => s.safePlaces);
  const templates = useHomeStore((s) => s.templates);
  const askHelpEnabled = useHomeStore((s) => s.askHelpEnabled);
  const saveTemplate = useHomeStore((s) => s.saveTemplate);

  const [centerCount, setCenterCount] = useState(0);
  const [helpVisible, setHelpVisible] = useState(false);
  const [helpDisabledVisible, setHelpDisabledVisible] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<SafePlaceItem | null>(null);

  const presence: DevicePresenceInfo = {
    latitude: 19.4174,
    longitude: -99.1649,
    signalAvailable: true,
    bluetoothEnabled: true,
  };

  const signalDescription = getPresenceAccessibilityDescription(presence);

  const handleCenter = () => {
    setCenterCount((c) => c + 1);
  };

  const handleOpenHelp = () => {
    if (askHelpEnabled) {
      setHelpVisible(true);
    } else {
      setHelpDisabledVisible(true);
    }
  };

  const handleSendHelp = (
    _situation: SituationItem,
    _text: string,
    done: (feedback: string) => void
  ) => {
    setTimeout(() => {
      done('Entrega verificada a 2 de 2 contactos. Lectura sin confirmar.');
    }, 650);
  };

  return {
    safePlaces,
    templates,
    presence,
    centerCount,
    signalDescription,
    helpVisible,
    setHelpVisible,
    helpDisabledVisible,
    setHelpDisabledVisible,
    selectedPlace,
    setSelectedPlace,
    handleCenter,
    handleOpenHelp,
    handleSendHelp,
    saveTemplate,
  };
}
