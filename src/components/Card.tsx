import React from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { accentColors, colors, radius, spacing, type AccentColor } from '../theme';

interface CardProps {
  children: React.ReactNode;
  /** Colored 3px top bar, as on the matchup / snapshot / activity cards */
  accent?: AccentColor;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  padded?: boolean;
}

export function Card({ children, accent, onPress, style, padded = true }: CardProps) {
  const body = (
    <>
      {accent ? <View style={[styles.accentBar, { backgroundColor: accentColors[accent] }]} /> : null}
      <View style={padded ? styles.inner : undefined}>{children}</View>
    </>
  );
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
        accessibilityRole="button"
      >
        {body}
      </Pressable>
    );
  }
  return <View style={[styles.card, style]}>{body}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.cardLg,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.85 },
  accentBar: { height: 3 },
  inner: { padding: spacing.lg },
});
