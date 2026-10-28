import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { validateCoordinatesInput } from '@/feature/user/fuctions/user.fuctions';
import { OwnSafePlaceDraft } from '@/feature/user/types/user.types';

import { CustomMapCredits } from '@/components/layouts/CustomMapCredits';
import { CustomMinimalMap } from '@/components/layouts/CustomMinimalMap';
import { CustomSheet } from '@/components/layouts/CustomSheet';
import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedCheckbox } from '@/components/ui/ThemedCheckbox';
import { ThemedField } from '@/components/ui/ThemedField';
import { ThemedText } from '@/components/ui/ThemedText';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SafePlaceSettingsSheetProps = {
  visible: boolean;
  current: OwnSafePlaceDraft;
  onSave: (draft: OwnSafePlaceDraft) => void;
  onDismiss: () => void;
};

const PLACE_KINDS: { value: OwnSafePlaceDraft['kind']; label: string }[] = [
  { value: 'casa', label: 'Casa' },
  { value: 'negocio', label: 'Negocio' },
  { value: 'otro', label: 'Otro' },
];

export function SafePlaceSettingsSheet(props: SafePlaceSettingsSheetProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <SafePlaceSettingsForm
      key={`${props.current.title}-${props.current.kind}-${props.current.latitude}-${props.current.longitude}-${props.current.published}`}
      {...props}
    />
  );
}

function SafePlaceSettingsForm({
  visible,
  current,
  onSave,
  onDismiss,
}: SafePlaceSettingsSheetProps) {
  const theme = useTheme();
  const [title, setTitle] = useState(current.title);
  const [kind, setKind] = useState<OwnSafePlaceDraft['kind']>(current.kind);
  const [latitude, setLatitude] = useState<number | null>(current.latitude);
  const [longitude, setLongitude] = useState<number | null>(current.longitude);
  const [manual, setManual] = useState(false);
  const [latInput, setLatInput] = useState('');
  const [lonInput, setLonInput] = useState('');
  const [confirmed, setConfirmed] = useState(current.published);
  const [consent, setConsent] = useState(current.published);
  const [error, setError] = useState('');

  return (
    <CustomSheet visible={visible} title="Lugar seguro" onDismiss={onDismiss}>
      <ThemedText themeColor="secondary" style={styles.intro}>
        Ofrece tu casa o negocio como punto de ayuda. Tú decides si publicar su ubicación exacta.
      </ThemedText>

      <ThemedField
        value={title}
        onValueChange={(v) => setTitle(v.slice(0, 60))}
        label="Nombre del lugar"
      />

      <View style={styles.chipsRow}>
        {PLACE_KINDS.map((item) => {
          const selected = kind === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => setKind(item.value)}
              style={[
                styles.chip,
                {
                  backgroundColor: selected ? theme.surfaceSelected : theme.surfaceSoft,
                },
              ]}>
              <ThemedText style={styles.chipText}>{item.label}</ThemedText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.actionLinks}>
        <ThemedButton
          label="Usar mi ubicación actual"
          icon="locationCurrent"
          variant="ghost"
          onPress={() => {
            setLatitude(19.4174);
            setLongitude(-99.1649);
            setConfirmed(false);
            setError('');
          }}
        />
        <ThemedButton
          label="Introducir coordenadas del lugar"
          variant="ghost"
          onPress={() => setManual((m) => !m)}
        />
      </View>

      {manual ? (
        <View style={styles.manualBox}>
          <ThemedField
            value={latInput}
            onValueChange={(v) => setLatInput(v.slice(0, 20))}
            label="Latitud"
          />
          <ThemedField
            value={lonInput}
            onValueChange={(v) => setLonInput(v.slice(0, 20))}
            label="Longitud"
          />
          <ThemedButton
            label="Mostrar en el mapa"
            variant="ghost"
            onPress={() => {
              const coords = validateCoordinatesInput(latInput, lonInput);
              if (coords) {
                setLatitude(coords.latitude);
                setLongitude(coords.longitude);
                setConfirmed(false);
                setManual(false);
                setError('');
              } else {
                setError('Revisa las coordenadas del lugar.');
              }
            }}
          />
        </View>
      ) : null}

      {latitude !== null && longitude !== null ? (
        <View style={styles.mapPreviewSection}>
          <ThemedText type="caption">
            {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </ThemedText>
          <View style={styles.mapContainer}>
            <CustomMinimalMap latitude={latitude} longitude={longitude} showMarker />
            <CustomMapCredits style={styles.credits} />
          </View>
          <ThemedCheckbox
            checked={confirmed}
            onChange={setConfirmed}
            label="Confirmo que esta es la ubicación del lugar"
          />
        </View>
      ) : null}

      <ThemedCheckbox
        checked={consent}
        onChange={setConsent}
        label="Publicar la ubicación exacta, mi nombre y mi foto para personas cercanas. Mi contacto no se publicará aquí."
      />

      <ThemedText themeColor="secondary" style={styles.smallNote}>
        Es un lugar ofrecido por su propietario; Meshy no garantiza su seguridad.
      </ThemedText>

      {error ? (
        <ThemedText style={[styles.errorText, { color: theme.error }]}>{error}</ThemedText>
      ) : null}

      <ThemedButton
        label="Publicar lugar"
        fullWidth
        disabled={
          latitude === null ||
          longitude === null ||
          !confirmed ||
          !consent ||
          !title.trim()
        }
        onPress={() => {
          onSave({
            title: title.trim(),
            kind,
            latitude,
            longitude,
            published: true,
          });
          onDismiss();
        }}
      />

      {current.published ? (
        <ThemedButton
          label="Dejar de compartir"
          variant="ghost"
          fullWidth
          onPress={() => {
            onSave({
              title: '',
              kind: 'casa',
              latitude: null,
              longitude: null,
              published: false,
            });
            onDismiss();
          }}
        />
      ) : null}

      <ThemedText themeColor="secondary" style={styles.smallNote}>
        La publicación se comparte mientras Meshy está abierto. Al retirarla avisamos a dispositivos
        cercanos; las demás copias caducan en un máximo de 15 minutos.
      </ThemedText>
    </CustomSheet>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontSize: 14,
    lineHeight: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Shapes.small,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  actionLinks: {
    alignItems: 'flex-start',
    gap: 4,
  },
  manualBox: {
    gap: 10,
  },
  mapPreviewSection: {
    gap: 10,
  },
  mapContainer: {
    width: '100%',
    height: 180,
    borderRadius: Shapes.medium,
    overflow: 'hidden',
  },
  credits: {
    position: 'absolute',
    bottom: 2,
    left: 2,
  },
  smallNote: {
    fontSize: 12,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 13,
  },
});
