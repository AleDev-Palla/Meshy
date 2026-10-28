import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useTheme } from '@/hooks/use-theme';

export type HomeLocationSignalProps = {
  active: boolean;
  description: string;
};

export function HomeLocationSignal({ active, description }: HomeLocationSignalProps) {
  const theme = useTheme();
  const pulse = useSharedValue(0);

  useEffect(() => {
    if (active) {
      pulse.value = withRepeat(
        withTiming(1, { duration: 1800, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      pulse.value = 0;
    }
  }, [active, pulse]);

  const color = active ? theme.pinBlue : theme.pinGray;

  const waveOneStyle = useAnimatedStyle(() => {
    const phase = pulse.value;
    const size = 24 + phase * 54;
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      opacity: (1 - phase) * 0.35,
    };
  });

  const waveTwoStyle = useAnimatedStyle(() => {
    const phase = (pulse.value + 0.5) % 1;
    const size = 24 + phase * 54;
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      opacity: (1 - phase) * 0.35,
    };
  });

  return (
    <View
      pointerEvents="none"
      accessibilityLabel={description}
      style={styles.container}>
      <View style={styles.markerAnchor}>
        {active ? (
          <>
            <Animated.View style={[styles.wave, { borderColor: color }, waveOneStyle]} />
            <Animated.View style={[styles.wave, { borderColor: color }, waveTwoStyle]} />
          </>
        ) : null}
        <View style={styles.whiteHalo}>
          <View style={[styles.dot, { backgroundColor: color }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerAnchor: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -16 }],
  },
  wave: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  whiteHalo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
