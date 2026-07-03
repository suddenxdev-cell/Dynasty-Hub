import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface StatTileProps {
  label: string;
  value: string;
  tone?: 'default' | 'positive' | 'negative';
  style?: StyleProp<ViewStyle>;
}

const toneColor = {
  default: colors.text,
  positive: colors.green,
  negative: colors.red,
} as const;

export function StatTile({ label, value, tone = 'default', style }: StatTileProps) {
  return (
    <View style={[styles.tile, style]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: toneColor[tone] }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.elevated,
    borderRadius: radius.tile,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  label: { ...type.micro, color: colors.textSecondary },
  value: { ...type.title, marginTop: 2, fontVariant: ['tabular-nums'] },
});
