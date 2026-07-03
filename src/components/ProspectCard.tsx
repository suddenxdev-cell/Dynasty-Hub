import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { gradeColor } from '../data/display';
import type { Prospect } from '../data/models';
import { colors, radius, spacing, type } from '../theme';
import { GradeBadge } from './GradeBadge';
import { ProgressBar } from './ProgressBar';

interface ProspectCardProps {
  prospect: Prospect;
  /** Fixed width for the Home carousel; undefined = full width (Prospects list) */
  width?: number;
  onPress?: () => void;
}

export function ProspectCard({ prospect, width, onPress }: ProspectCardProps) {
  const accent = gradeColor[prospect.grade];
  const deltaPositive = prospect.valueDelta >= 0;
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.card, width !== undefined && { width }, pressed && styles.pressed]}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <View style={styles.head}>
        <View style={[styles.headshot, { backgroundColor: accent }]} />
        <GradeBadge grade={prospect.grade} />
      </View>
      <View style={styles.body}>
        <Text style={styles.name} numberOfLines={1}>
          {prospect.player.name}
        </Text>
        <Text style={styles.meta}>
          {prospect.player.nflTeam} · Age {prospect.player.age}
        </Text>
        <ProgressBar value={prospect.dynastyValue} colorValue={accent} style={styles.bar} />
        <Text style={styles.valueLabel}>Dynasty Value</Text>
        <View style={styles.valueRow}>
          <Text style={styles.value}>{prospect.dynastyValue.toFixed(1)}</Text>
          <Text style={[styles.delta, { color: deltaPositive ? colors.green : colors.red }]}>
            {deltaPositive ? '+' : ''}
            {prospect.valueDelta.toFixed(1)}
          </Text>
        </View>
        {prospect.onTaxiSquad ? <Text style={styles.taxi}>🚌 Taxi Squad</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.card,
    overflow: 'hidden',
  },
  pressed: { opacity: 0.85 },
  head: {
    backgroundColor: colors.elevated,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headshot: { width: 28, height: 18, borderRadius: radius.badge },
  body: { padding: spacing.md },
  name: { ...type.emphasis, color: colors.text },
  meta: { ...type.micro, color: colors.textSecondary, marginTop: 1, marginBottom: spacing.sm },
  bar: { marginBottom: spacing.sm },
  valueLabel: { ...type.micro, color: colors.textSecondary },
  valueRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  value: { ...type.title, color: colors.text, fontVariant: ['tabular-nums'] },
  delta: { ...type.microBold },
  taxi: { ...type.micro, color: colors.gold, marginTop: spacing.xs },
});
