import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Chip } from '../components';
import { waiverTargets, type Position } from '../data';
import type { WaiversStackScreenProps } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

const POSITION_FILTERS = ['All', 'QB', 'RB', 'WR', 'TE'] as const;

export function WaiverWireScreen({ navigation }: WaiversStackScreenProps<'WaiverWire'>) {
  const [query, setQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState<(typeof POSITION_FILTERS)[number]>('All');
  const [claimed, setClaimed] = useState<ReadonlySet<string>>(new Set());

  const visible = waiverTargets.filter((target) => {
    const matchesQuery = target.player.name.toLowerCase().includes(query.trim().toLowerCase());
    const matchesPosition =
      positionFilter === 'All' || target.player.position === (positionFilter as Position);
    return matchesQuery && matchesPosition;
  });

  const toggleClaim = (playerId: string) => {
    setClaimed((current) => {
      const next = new Set(current);
      if (next.has(playerId)) {
        next.delete(playerId);
      } else {
        next.add(playerId);
      }
      return next;
    });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Search players..."
        placeholderTextColor={colors.textMuted}
        autoCorrect={false}
      />
      <View style={styles.filters}>
        {POSITION_FILTERS.map((filter) => (
          <Chip
            key={filter}
            label={filter}
            tone={filter === positionFilter ? 'purple' : 'default'}
            onPress={() => setPositionFilter(filter)}
          />
        ))}
      </View>

      <View style={styles.list}>
        {visible.map((target) => {
          const isClaimed = claimed.has(target.player.id);
          return (
            <Pressable
              key={target.player.id}
              onPress={() => navigation.navigate('PlayerDetail', { playerId: target.player.id })}
              style={({ pressed }) => [styles.row, pressed && styles.pressed]}
              accessibilityRole="button"
            >
              <View style={styles.rowBody}>
                <Text style={styles.name}>{target.player.name}</Text>
                <Text style={styles.meta}>
                  {target.player.position} · {target.player.nflTeam}
                </Text>
                <Text style={styles.stats}>
                  Last wk: {target.lastWeekPoints.toFixed(1)} pts · {target.rosteredPct}% rostered
                </Text>
              </View>
              <Pressable
                onPress={() => toggleClaim(target.player.id)}
                style={({ pressed }) => [
                  styles.claim,
                  isClaimed && styles.claimPending,
                  pressed && styles.pressed,
                ]}
                accessibilityRole="button"
                accessibilityLabel={isClaimed ? `Cancel claim for ${target.player.name}` : `Claim ${target.player.name}`}
              >
                <Text style={[styles.claimLabel, isClaimed && styles.claimLabelPending]}>
                  {isClaimed ? 'Pending' : 'Claim'}
                </Text>
              </Pressable>
            </Pressable>
          );
        })}
        {visible.length === 0 ? <Text style={styles.empty}>No players match</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  search: {
    ...type.body,
    color: colors.text,
    backgroundColor: colors.elevated,
    borderRadius: radius.tile,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  filters: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  list: { marginTop: spacing.lg, gap: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.card,
    padding: spacing.md,
    gap: spacing.md,
  },
  pressed: { opacity: 0.85 },
  rowBody: { flex: 1 },
  name: { ...type.emphasis, color: colors.text },
  meta: { ...type.micro, color: colors.textSecondary, marginTop: 1 },
  stats: { ...type.micro, color: colors.textMuted, marginTop: spacing.xs, fontVariant: ['tabular-nums'] },
  claim: {
    backgroundColor: colors.green,
    borderRadius: radius.tile,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  claimPending: { backgroundColor: colors.chip },
  claimLabel: { ...type.emphasis, fontSize: 12, color: colors.bg },
  claimLabelPending: { color: colors.textSecondary },
  empty: { ...type.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.section },
});
