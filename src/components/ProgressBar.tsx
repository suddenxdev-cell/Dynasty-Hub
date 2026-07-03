import React from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { accentColors, colors, radius, type AccentColor } from '../theme';

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  color?: AccentColor;
  /** Exact color override (e.g. grade color); wins over `color` */
  colorValue?: string;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({ value, color = 'blue', colorValue, style }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, style]}>
      <View
        style={[styles.fill, { width: `${clamped}%`, backgroundColor: colorValue ?? accentColors[color] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 6, borderRadius: radius.pill, backgroundColor: colors.chip, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
