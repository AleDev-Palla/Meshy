import { HOME_STRINGS } from '@/feature/home/constans/home.constans';
import { useHome } from '@/feature/home/hooks/useHome';
import { HomeMapCanvas } from '@/feature/home/components/layouts/HomeMapCanvas';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomSituationPicker } from '@/components/layouts/CustomSituationPicker';

export function ViewHome() {
  const {
    safePlaces,
    templates,
    presence,
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
  } = useHome();

  return (
    <>
      <HomeMapCanvas
        presence={presence}
        signalDescription={signalDescription}
        safePlaces={safePlaces}
        selectedPlace={selectedPlace}
        onSelectPlace={setSelectedPlace}
        onCenter={handleCenter}
        onHelp={handleOpenHelp}
      />

      <CustomSituationPicker
        visible={helpVisible}
        editing={false}
        templates={templates}
        onSaveTemplate={saveTemplate}
        onSendHelp={handleSendHelp}
        onDismiss={() => setHelpVisible(false)}
      />

      <CustomDialog
        visible={helpDisabledVisible}
        title={HOME_STRINGS.helpTitle}
        message={HOME_STRINGS.helpDisabled}
        onDismiss={() => setHelpDisabledVisible(false)}
      />
    </>
  );
}
