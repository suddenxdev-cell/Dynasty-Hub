import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GradeBadge, ProgressBar, StatTile } from '../components';
import { gradeColor, players, prospects, statusMeta } from '../data';
import type { TeamStackScreenProps, WaiversStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

type PlayerDetailProps =
  | TeamStackScreenProps<'PlayerDetail'>
  | WaiversStackScreenProps<'PlayerDetail'>;

export function PlayerDetailScreen({ route }: PlayerDetailProps) {
  const { playerId } = route.params;
  const player = Object.values(players).find((candidate) => candidate.id === playerId);
  const prospect = prospects.find((candidate) => candidate.player.id === playerId);

  if (!player) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Player not found</Text>
      </View>
    );
  }

  const status = statusMeta[player.status];
  // Plausible derived stats until a real API exists.
  const baseValue = prospect?.dynastyValue ?? 72;
  const ptsPerGame = (baseValue / 6).toFixed(1);
  const snapPct = `${Math.min(98, Math.round(baseValue * 0.9))}%`;
  const positionRank = `#${Math.max(1, Math.round((100 - baseValue) / 4))}`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <View style={styles.titles}>
          <Text style={styles.name}>{player.name}</Text>
          <Text style={styles.meta}>
            {player.position} · {player.nflTeam} · Age {player.age}
          </Text>
          <Text style={[styles.status, { color: status.color }]}>{status.label}</Text>
        </View>
        {prospect ? <GradeBadge grade={prospect.grade} /> : null}
      </View>

      {prospect ? (
        <View style={styles.valueBlock}>
          <View style={styles.valueRow}>
            <Text style={styles.valueLabel}>Dynasty Value</Text>
            <View style={styles.valueNumbers}>
              <Text style={styles.value}>{prospect.dynastyValue.toFixed(1)}</Text>
              <Text
                style={[
                  styles.delta,
                  { color: prospect.valueDelta >= 0 ? colors.green : colors.red },
                ]}
              >
                {prospect.valueDelta >= 0 ? '+' : ''}
                {prospect.valueDelta.toFixed(1)}
              </Text>
            </View>
          </View>
          <ProgressBar value={prospect.dynastyValue} colorValue={gradeColor[prospect.grade]} />
          {prospect.onTaxiSquad ? <Text style={styles.taxi}>🚌 Taxi Squad</Text> : null}
        </View>
      ) : null}

      <Text style={styles.sectionLabel}>Season</Text>
      <View style={styles.tiles}>
        <StatTile label="Pts/Game" value={ptsPerGame} style={styles.tile} />
        <StatTile label="Snap %" value={snapPct} style={styles.tile} />
        <StatTile label={`${player.position} Rank`} value={positionRank} style={styles.tile} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  missing: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  missingText: { ...type.body, color: colors.textSecondary },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titles: { flex: 1, paddingRight: spacing.md },
  name: { ...type.display, color: colors.text },
  meta: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  status: { ...type.emphasis, fontSize: 12, marginTop: spacing.xs },
  valueBlock: { marginTop: spacing.xl },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  valueLabel: { ...type.caption, color: colors.textSecondary },
  valueNumbers: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  value: { ...type.title, color: colors.text, fontVariant: ['tabular-nums'] },
  delta: { ...type.microBold },
  taxi: { ...type.micro, color: colors.gold, marginTop: spacing.sm },
  sectionLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  tiles: { flexDirection: 'row', gap: spacing.sm },
  tile: { flex: 1 },
});
