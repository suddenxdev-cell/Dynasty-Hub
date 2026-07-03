import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card, Chip, ProgressBar, ScoreBox, SegmentedControl } from '../components';
import { playoffCutoffRank, powerRankings, schedule, standings } from '../data';
import type { LeagueStackScreenProps } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

const SEGMENTS = ['Standings', 'Rankings', 'Schedule'] as const;
const segmentIndex = { standings: 0, rankings: 1, schedule: 2 } as const;

export function LeagueHubScreen({ route }: LeagueStackScreenProps<'LeagueHub'>) {
  const [segment, setSegment] = useState<number>(segmentIndex[route.params?.segment ?? 'standings']);
  const [weekIndex, setWeekIndex] = useState(0);
  const selectedWeek = schedule[weekIndex] ?? schedule[0];

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SegmentedControl segments={SEGMENTS} selectedIndex={segment} onChange={setSegment} />

      {segment === 0 ? (
        <View style={styles.list}>
          {standings.map((row) => (
            <React.Fragment key={row.rank}>
              <View style={[styles.standingRow, row.isUser && styles.userRow]}>
                <Text style={styles.rank}>{row.rank}</Text>
                <Text style={[styles.rowTeam, row.isUser && styles.rowTeamUser]} numberOfLines={1}>
                  {row.teamName}
                </Text>
                <Text style={styles.record}>
                  {row.wins}-{row.losses}
                </Text>
                <Text style={styles.pf}>{row.pointsFor.toFixed(1)}</Text>
              </View>
              {row.rank === playoffCutoffRank ? (
                <View style={styles.cutRow}>
                  <View style={styles.cutLine} />
                  <Text style={styles.cutLabel}>Playoff cut</Text>
                  <View style={styles.cutLine} />
                </View>
              ) : null}
            </React.Fragment>
          ))}
        </View>
      ) : null}

      {segment === 1 ? (
        <View style={styles.list}>
          {powerRankings.map((row) => (
            <View key={row.rank} style={[styles.rankingRow, row.isUser && styles.userRow]}>
              <Text style={styles.rank}>{row.rank}</Text>
              <View style={styles.rankingBody}>
                <View style={styles.rankingTop}>
                  <Text style={[styles.rowTeam, row.isUser && styles.rowTeamUser]} numberOfLines={1}>
                    {row.teamName}
                  </Text>
                  <Text
                    style={[styles.delta, { color: row.delta > 0 ? colors.green : row.delta < 0 ? colors.red : colors.textMuted }]}
                  >
                    {row.delta > 0 ? `▲ +${row.delta}` : row.delta < 0 ? `▼ ${row.delta}` : '—'}
                  </Text>
                </View>
                <ProgressBar value={row.value} color={row.isUser ? 'blue' : 'purple'} style={styles.rankingBar} />
              </View>
              <Text style={styles.pf}>{row.value.toFixed(1)}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {segment === 2 ? (
        <>
          <View style={styles.weekChips}>
            {schedule.map((week, index) => (
              <Chip
                key={week.week}
                label={`Week ${week.week}`}
                tone={index === weekIndex ? 'purple' : 'default'}
                onPress={() => setWeekIndex(index)}
              />
            ))}
          </View>
          <View style={styles.list}>
            {selectedWeek?.matchups.map((matchup) => (
              <Card key={matchup.id} padded>
                <View style={styles.matchupRow}>
                  <View style={styles.matchupTeams}>
                    <Text style={styles.rowTeam} numberOfLines={1}>
                      {matchup.home.teamName}
                    </Text>
                    <Text style={styles.matchupVs}>vs {matchup.away.teamName}</Text>
                  </View>
                  {matchup.live ? <Text style={styles.live}>● LIVE</Text> : null}
                  <View style={styles.scores}>
                    <ScoreBox score={matchup.home.score} size="md" />
                    <ScoreBox
                      score={matchup.away.score}
                      size="md"
                      tone={matchup.away.score < matchup.home.score ? 'trailing' : 'leading'}
                    />
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  list: { marginTop: spacing.lg, gap: spacing.sm },
  standingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderRadius: radius.row,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderRadius: radius.row,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  userRow: { borderColor: colors.primary, borderWidth: 1 },
  rank: { ...type.microBold, color: colors.textMuted, width: 20, textAlign: 'center' },
  rowTeam: { ...type.emphasis, color: colors.text, flexShrink: 1 },
  rowTeamUser: { color: colors.primary },
  record: { ...type.caption, color: colors.textSecondary, marginLeft: 'auto' },
  pf: {
    ...type.caption,
    color: colors.textSecondary,
    width: 56,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  cutRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginVertical: spacing.xs },
  cutLine: { flex: 1, height: 1, backgroundColor: colors.border },
  cutLabel: { ...type.label, color: colors.textMuted },
  rankingBody: { flex: 1 },
  rankingTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  delta: { ...type.microBold },
  rankingBar: { marginTop: spacing.xs + 2 },
  weekChips: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  matchupRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  matchupTeams: { flex: 1 },
  matchupVs: { ...type.micro, color: colors.textSecondary, marginTop: 2 },
  live: { ...type.micro, color: colors.green },
  scores: { flexDirection: 'row', gap: spacing.xs },
});
