import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface ChipProps {
  label: string;
  onPress?: () => void;
  /** Filled variant for the Week pill */
  tone?: 'default' | 'purple';
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, onPress, tone = 'default', style }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.chip, tone === 'purple' && styles.purple, pressed && styles.pressed, style]}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <Text style={[styles.label, tone === 'purple' && styles.labelPurple]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.chip,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    alignSelf: 'flex-start',
  },
  purple: { backgroundColor: colors.purple },
  pressed: { opacity: 0.85 },
  label: { ...type.caption, color: colors.text },
  labelPurple: { ...type.emphasis, fontSize: 12, color: colors.text },
});
