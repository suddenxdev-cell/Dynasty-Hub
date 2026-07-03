import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, PlayerChip, ProgressBar, ScoreBox } from '../components';
import { schedule, startingLineup } from '../data';
import type { HomeStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

export function MatchupDetailScreen({ route }: HomeStackScreenProps<'MatchupDetail'>) {
  const { matchupId } = route.params;
  const matchup = schedule.flatMap((week) => week.matchups).find((candidate) => candidate.id === matchupId);

  if (!matchup) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Matchup not found</Text>
      </View>
    );
  }

  const winPct = Math.round((matchup.home.score / (matchup.home.score + matchup.away.score)) * 100);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Card accent="blue">
        <View style={styles.top}>
          <Text style={styles.week}>
            WEEK {matchup.week} · {matchup.live ? 'LIVE' : 'FINAL'}
          </Text>
          {matchup.live && matchup.clock ? <Text style={styles.clock}>● {matchup.clock}</Text> : null}
        </View>
        <View style={styles.teamRow}>
          <View style={styles.team}>
            <Text style={styles.teamName} numberOfLines={1}>
              {matchup.home.teamName}
            </Text>
            <Text style={styles.projGreen}>Projected: {matchup.home.projected.toFixed(1)} pts</Text>
          </View>
          <ScoreBox score={matchup.home.score} />
        </View>
        <View style={styles.teamRow}>
          <View style={styles.team}>
            <Text style={styles.teamName} numberOfLines={1}>
              {matchup.away.teamName}
            </Text>
            <Text style={styles.projRed}>Projected: {matchup.away.projected.toFixed(1)} pts</Text>
          </View>
          <ScoreBox score={matchup.away.score} tone="trailing" />
        </View>
        <View style={styles.oddsRow}>
          <Text style={styles.oddsLabel}>Win probability</Text>
          <Text style={styles.oddsValue}>{winPct}%</Text>
        </View>
        <ProgressBar value={winPct} color="blue" />
      </Card>

      <Text style={styles.sectionLabel}>Your Lineup</Text>
      <View style={styles.list}>
        {startingLineup.map((slot) => (
          <PlayerChip key={slot.player.id} slot={slot} variant="row" />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  missing: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  missingText: { ...type.body, color: colors.textSecondary },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  week: { ...type.label, color: colors.primary },
  clock: { ...type.micro, color: colors.green },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  team: { flex: 1, paddingRight: spacing.md },
  teamName: { ...type.title, color: colors.text },
  projGreen: { ...type.micro, color: colors.green, marginTop: 2 },
  projRed: { ...type.micro, color: colors.red, marginTop: 2 },
  oddsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.xs + 2,
  },
  oddsLabel: { ...type.caption, color: colors.textSecondary },
  oddsValue: { ...type.emphasis, fontSize: 12, color: colors.text },
  sectionLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  list: { gap: spacing.sm },
});
