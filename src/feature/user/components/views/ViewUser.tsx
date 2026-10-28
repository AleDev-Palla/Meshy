import { StyleSheet, View } from 'react-native';

import { USER_STRINGS } from '@/feature/user/constans/user.constans';
import { useUser } from '@/feature/user/hooks/useUser';
import { ParticipationSheet } from '@/feature/user/components/layouts/ParticipationSheet';
import { ProfileSettingsSheet } from '@/feature/user/components/layouts/ProfileSettingsSheet';
import { SafePlaceSettingsSheet } from '@/feature/user/components/layouts/SafePlaceSettingsSheet';
import {
  PreferenceSwitchRow,
  SettingsNavigationRow,
  UserQrIdentityCard,
} from '@/feature/user/components/layouts/UserSettingsRows';

import { CustomDialog } from '@/components/layouts/CustomDialog';
import { CustomMainPage } from '@/components/layouts/CustomMainPage';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { CustomSituationPicker } from '@/components/layouts/CustomSituationPicker';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedChoice } from '@/components/ui/ThemedChoice';
import { ThemedText } from '@/components/ui/ThemedText';
import {
  ENERGY_MODE_HINTS,
  ENERGY_MODE_TITLES,
} from '@/feature/ble/constans/ble.constans';

export function ViewUser() {
  const {
    state,
    nearbyAlias,
    presetTitle,
    copiedFeedback,
    darkTheme,
    toggleDarkTheme,
    ble,
    templates,
    saveTemplate,
    setDialog,
    saveParticipation,
    saveHelperProfile,
    saveSafePlace,
    shareInvitation,
    copyNearbyAlias,
    openEmergencySetup,
  } = useUser();

  const energyTitle = ENERGY_MODE_TITLES[ble.state.energyMode];
  const energyHint = ENERGY_MODE_HINTS[ble.state.energyMode];
  const isHelperReady =
    Boolean(state.helperProfile.name) &&
    Boolean(state.helperProfile.contact) &&
    state.helperProfile.hasPhoto &&
    state.helperProfile.consent;

  return (
    <>
      <CustomMainPage>
        <ThemedText type="sectionTitle" themeColor="secondary">
          {USER_STRINGS.sectionTitle}
        </ThemedText>

        <View style={styles.qrSpacer}>
          <UserQrIdentityCard
            payload={state.invitationPayload}
            nearbyAlias={nearbyAlias}
            copiedFeedback={copiedFeedback}
            onShare={shareInvitation}
            onCopy={copyNearbyAlias}
          />
        </View>

        <View style={styles.rowsContainer}>
          <SettingsNavigationRow
            title={USER_STRINGS.accountType}
            subtitle={presetTitle}
            icon="user"
            onPress={() => setDialog('account')}
          />
          <SettingsNavigationRow
            title={USER_STRINGS.configuration}
            icon="settings"
            onPress={() => setDialog('settings')}
          />
          <SettingsNavigationRow
            title={USER_STRINGS.privacy}
            icon="privacy"
            onPress={() => setDialog('privacy')}
          />
        </View>

        <ThemedText themeColor="secondary" style={styles.versionText}>
          {USER_STRINGS.version}
        </ThemedText>
      </CustomMainPage>

      <ParticipationSheet
        visible={state.activeDialog === 'account'}
        current={state.participation}
        isHelperProfileReady={isHelperReady}
        onSave={saveParticipation}
        onDismiss={() => setDialog(null)}
      />

      <CustomSheet
        visible={state.activeDialog === 'settings'}
        title="Ajustes"
        onDismiss={() => setDialog(null)}>
        <View style={styles.settingsSheetList}>
          <ThemedChoice
            icon="power"
            title="Batería"
            subtitle={`${ble.state.batteryPercent} % · ${energyTitle}`}
            onPress={() => setDialog('battery')}
          />
          <ThemedChoice
            icon="safePlace"
            title="Lugar seguro"
            subtitle="Ofrecer mi casa o negocio como punto de ayuda"
            onPress={() => setDialog('safe_place')}
          />
          <ThemedChoice
            icon="editProfile"
            title="Perfil"
            onPress={() => setDialog('profile')}
          />
          <ThemedChoice
            icon="messages"
            title="Configurar mensajes"
            onPress={() => setDialog('messages')}
          />
          <ThemedChoice
            icon="danger"
            title="Acceso de emergencia"
            subtitle="Recomendado · Opcional"
            onPress={openEmergencySetup}
          />

          <PreferenceSwitchRow
            title="Tema oscuro"
            icon="moon"
            checked={darkTheme}
            onChange={toggleDarkTheme}
          />
          <PreferenceSwitchRow
            title="Notificaciones"
            icon={ble.state.notificationsEnabled ? 'notification' : 'notificationOff'}
            checked={ble.state.notificationsEnabled}
            onChange={ble.setNotificationsEnabled}
          />
          <PreferenceSwitchRow
            title="Bluetooth en Meshy"
            icon={ble.state.bluetoothEnabled ? 'bluetoothActive' : 'bluetoothOff'}
            checked={ble.state.bluetoothEnabled}
            onChange={ble.setBluetoothEnabled}
          />

          <View style={styles.linkButtonsCol}>
            <ThemedButton
              label="Ajustes de Bluetooth"
              icon="settings"
              variant="ghost"
              onPress={() => {}}
            />
          </View>

          <PreferenceSwitchRow
            title="Ubicación en Meshy"
            icon={ble.state.locationEnabled ? 'locationCurrent' : 'locationOff'}
            checked={ble.state.locationEnabled}
            onChange={ble.setLocationEnabled}
          />

          <View style={styles.linkButtonsCol}>
            <ThemedButton
              label="Ajustes de ubicación"
              icon="settings"
              variant="ghost"
              onPress={() => {}}
            />
            <ThemedButton
              label="Permitir ubicación y Bluetooth"
              icon="lock"
              variant="ghost"
              onPress={() => {
                ble.grantAllPermissions();
                setDialog(null);
              }}
            />
          </View>
        </View>
      </CustomSheet>

      <ProfileSettingsSheet
        visible={state.activeDialog === 'profile'}
        current={state.helperProfile}
        publicProfileEnabled={state.participation.publicProfile}
        onSave={saveHelperProfile}
        onDismiss={() => setDialog(null)}
      />

      <SafePlaceSettingsSheet
        visible={state.activeDialog === 'safe_place'}
        current={state.ownSafePlace}
        onSave={saveSafePlace}
        onDismiss={() => setDialog(null)}
      />

      <CustomSheet
        visible={state.activeDialog === 'battery'}
        title="Batería"
        onDismiss={() => setDialog(null)}>
        <View style={styles.batteryBody}>
          <ThemedText style={styles.batteryModeTitle}>{energyTitle}</ThemedText>
          <ThemedText themeColor="secondary">{energyHint}</ThemedText>
          <ThemedText themeColor="secondary">
            La actividad se ajusta automáticamente. Tu nivel de batería no se comparte.
          </ThemedText>
        </View>
      </CustomSheet>

      <CustomSituationPicker
        visible={state.activeDialog === 'messages'}
        editing
        templates={templates}
        onSaveTemplate={saveTemplate}
        onDismiss={() => setDialog(null)}
      />

      <CustomDialog
        visible={state.activeDialog === 'privacy'}
        title={USER_STRINGS.privacy}
        message={USER_STRINGS.privacyBody}
        onDismiss={() => setDialog(null)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  qrSpacer: {
    marginTop: 20,
  },
  rowsContainer: {
    marginTop: 24,
  },
  versionText: {
    width: '100%',
    fontSize: 11,
    paddingVertical: 27,
    textAlign: 'center',
  },
  settingsSheetList: {
    gap: 10,
  },
  linkButtonsCol: {
    alignItems: 'flex-start',
    gap: 4,
  },
  batteryBody: {
    gap: 12,
  },
  batteryModeTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
});
