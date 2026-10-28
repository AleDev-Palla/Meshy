import { StyleSheet, TextInput, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedIcon } from '@/components/ui/ThemedIcon';
import { ThemedText } from '@/components/ui/ThemedText';

import { IconName } from '@/constants/icons';
import { Shapes } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedFieldProps = {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  leadingIcon?: IconName;
  singleLine?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  style?: StyleProp<ViewStyle>;
};

export function ThemedField({
  value,
  onValueChange,
  label,
  placeholder,
  leadingIcon,
  singleLine = true,
  readOnly = false,
  maxLength,
  style,
}: ThemedFieldProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surfaceSoft }, style]}>
      {leadingIcon && (
        <View style={styles.leading}>
          <ThemedIcon name={leadingIcon} size={22} themeColor="secondary" />
        </View>
      )}
      <View style={styles.inputColumn}>
        {label && (
          <ThemedText type="caption" themeColor="secondary" style={styles.label}>
            {label}
          </ThemedText>
        )}
        <TextInput
          value={value}
          onChangeText={onValueChange}
          placeholder={placeholder}
          placeholderTextColor={theme.secondary}
          editable={!readOnly}
          multiline={!singleLine}
          numberOfLines={singleLine ? 1 : 4}
          maxLength={maxLength}
          style={[
            styles.input,
            { color: theme.ink },
            !singleLine && styles.multilineInput,
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: Shapes.medium,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  leading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputColumn: {
    flex: 1,
  },
  label: {
    marginBottom: 2,
  },
  input: {
    fontSize: 15,
    paddingVertical: 2,
  },
  multilineInput: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
});
