import React from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';
import { accentColors, colors, radius, spacing, type, type AccentColor } from '../theme';

interface ActionButtonProps {
  icon: string;
  label: string;
  color: AccentColor;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Quick Action buttons: filled accent, dark label — white on purple, per the design. */
export function ActionButton({ icon, label, color, onPress, style }: ActionButtonProps) {
  const labelColor = color === 'purple' ? colors.text : colors.bg;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, { backgroundColor: accentColors[color] }, pressed && styles.pressed, style]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm - 1,
    borderRadius: radius.tile,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  pressed: { opacity: 0.85 },
  icon: { fontSize: 13 },
  label: { ...type.emphasis },
});
