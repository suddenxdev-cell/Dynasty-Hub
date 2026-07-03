import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { accentColors, colors, radius, spacing, type, type AccentColor } from '../theme';

interface AccentBarRowProps {
  title: string;
  subtitle?: string;
  accent: AccentColor;
  /** Optional right-aligned content (e.g. a value or chevron) */
  right?: React.ReactNode;
  onPress?: () => void;
}

/** The draft-picks rail row anatomy: elevated row with a 3px colored left bar. */
export function AccentBarRow({ title, subtitle, accent, right, onPress }: AccentBarRowProps) {
  const content = (
    <>
      <View style={[styles.bar, { backgroundColor: accentColors[accent] }]} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </>
  );
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}
        accessibilityRole="button"
      >
        {content}
      </Pressable>
    );
  }
  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: colors.elevated,
    borderRadius: radius.row,
    overflow: 'hidden',
    alignItems: 'center',
  },
  pressed: { opacity: 0.85 },
  bar: { width: 3, alignSelf: 'stretch' },
  body: { flex: 1, paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
  title: { ...type.emphasis, color: colors.text },
  subtitle: { ...type.micro, color: colors.textSecondary, marginTop: 1 },
  right: { paddingRight: spacing.md },
});
