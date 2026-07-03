import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { statusMeta } from '../data/display';
import type { LineupSlot } from '../data/models';
import { colors, radius, spacing, type } from '../theme';

interface PlayerChipProps {
  slot: LineupSlot;
  /** 'chip' = compact card for the horizontal lineup strip · 'row' = full-width list row */
  variant?: 'chip' | 'row';
  onPress?: () => void;
}

/** Lineup slot anatomy from the design: 2px blue left bar, position tag, name, status. */
export function PlayerChip({ slot, variant = 'chip', onPress }: PlayerChipProps) {
  const status = statusMeta[slot.player.status];
  const isRow = variant === 'row';
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.base, isRow ? styles.row : styles.chip, pressed && styles.pressed]}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={styles.bar} />
      <View style={styles.body}>
        <View style={isRow ? styles.rowLine : undefined}>
          <Text style={styles.pos}>{slot.slot}</Text>
          <Text style={[styles.name, isRow && styles.nameRow]} numberOfLines={1}>
            {slot.player.name}
          </Text>
        </View>
        {isRow ? (
          <Text style={styles.meta}>
            {slot.player.nflTeam} · Age {slot.player.age}
          </Text>
        ) : null}
        <Text style={[styles.status, { color: status.color }]}>{status.label}</Text>
      </View>
      {isRow && slot.points !== undefined ? <Text style={styles.points}>{slot.points.toFixed(1)}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.row,
    overflow: 'hidden',
  },
  chip: { width: 112 },
  row: { alignItems: 'center' },
  pressed: { opacity: 0.85 },
  bar: { width: 2, alignSelf: 'stretch', backgroundColor: colors.primary },
  body: { flex: 1, paddingVertical: spacing.sm - 2, paddingHorizontal: spacing.sm + 1 },
  rowLine: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  pos: { ...type.microBold, color: colors.primary },
  name: { ...type.emphasis, color: colors.text, marginTop: 1 },
  nameRow: { marginTop: 0 },
  meta: { ...type.micro, color: colors.textSecondary, marginTop: 1 },
  status: { ...type.micro, marginTop: 1 },
  points: { ...type.subheading, color: colors.text, paddingRight: spacing.md, fontVariant: ['tabular-nums'] },
});
