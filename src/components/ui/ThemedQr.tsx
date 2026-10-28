import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/use-theme';

export type ThemedQrProps = {
  payload?: string;
  size?: number;
  description?: string;
  isExample?: boolean;
  style?: StyleProp<ViewStyle>;
};

function computeHash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildQrMatrix(payload: string, gridCount: number): boolean[][] {
  const seed = computeHash(payload);
  const rows: boolean[][] = [];
  for (let y = 0; y < gridCount; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < gridCount; x++) {
      let finder = false;
      let on = false;
      const finders = [
        [0, 0],
        [14, 0],
        [0, 14],
      ];
      for (const [fx, fy] of finders) {
        const dx = x - fx;
        const dy = y - fy;
        if (dx >= 0 && dx <= 6 && dy >= 0 && dy <= 6) {
          finder = true;
          on =
            dx === 0 ||
            dx === 6 ||
            dy === 0 ||
            dy === 6 ||
            (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
        }
      }
      if (!finder) {
        const v = (x * 19 + y * 13 + x * y * 7 + (seed % 97)) % 11;
        on = v < 5;
      }
      row.push(on);
    }
    rows.push(row);
  }
  return rows;
}

export function ThemedQr({
  payload = 'MESHY-INVITE',
  size = 180,
  description = 'Escanea para conectar conmigo',
  isExample = false,
  style,
}: ThemedQrProps) {
  const theme = useTheme();
  const gridCount = 21;
  const cellSize = Math.floor(size / (gridCount + 4));
  const actualSize = cellSize * (gridCount + 4);
  const inkColor = isExample ? theme.ink : '#000000';
  const bgColor = isExample ? 'transparent' : '#FFFFFF';
  const matrix = buildQrMatrix(payload, gridCount);

  return (
    <View
      accessibilityLabel={description}
      style={[
        styles.wrapper,
        {
          width: actualSize,
          height: actualSize,
          backgroundColor: bgColor,
          padding: cellSize * 2,
        },
        style,
      ]}>
      {matrix.map((row, y) => (
        <View key={y} style={styles.row}>
          {row.map((on, x) => (
            <View
              key={x}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: on ? inkColor : 'transparent',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
