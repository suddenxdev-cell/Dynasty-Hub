import React from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ActionButton,
  ActivityRow,
  Card,
  Chip,
  PlayerChip,
  ProgressBar,
  ProspectCard,
  ScoreBox,
  SectionHeader,
  StatTile,
} from '../components';
import {
  currentWeek,
  formatRecord,
  leagueActivity,
  leagueName,
  liveMatchup,
  prospects,
  startingLineup,
  teamSnapshot,
  userName,
} from '../data';
import type { HomeStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

const PROSPECT_CARD_WIDTH = 200;

export function HomeScreen({ navigation }: HomeStackScreenProps<'Home'>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.sm }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Top bar: wordmark + week pill (the desktop top nav, minus links-now-tabs) */}
      <View style={styles.topBar}>
        <Text style={styles.wordmark}>⚡ DynastyHub</Text>
        <View style={styles.topBarRight}>
          <Chip label={`Week ${currentWeek}`} tone="purple" />
          <Pressable
            onPress={() => navigation.navigate('Settings')}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Settings"
          >
            <Text style={styles.gear}>⚙️</Text>
          </Pressable>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greeting}>
        <Text style={styles.greetingTitle}>Good morning, {userName} 👋</Text>
        <Text style={styles.greetingSub}>Your dynasty squad is looking strong this week.</Text>
        <Chip label={`🏆 ${leagueName}`} style={styles.leagueChip} />
      </View>

      {/* Live matchup */}
      <Card
        accent="blue"
        onPress={() => navigation.navigate('MatchupDetail', { matchupId: liveMatchup.id })}
      >
        <View style={styles.matchupTop}>
          <Text style={styles.matchupWeek}>WEEK {liveMatchup.week} · LIVE</Text>
          <Text style={styles.matchupClock}>● {liveMatchup.clock}</Text>
        </View>
        <View style={styles.matchupScores}>
          <View style={styles.matchupTeam}>
            <Text style={styles.matchupTeamName} numberOfLines={1}>
              {liveMatchup.home.teamName}
            </Text>
            <Text style={styles.projGreen}>Projected: {liveMatchup.home.projected.toFixed(1)} pts</Text>
          </View>
          <View style={styles.scoreRow}>
            <ScoreBox score={liveMatchup.home.score} />
            <Text style={styles.vs}>VS</Text>
            <ScoreBox score={liveMatchup.away.score} tone="trailing" />
          </View>
        </View>
        <View style={styles.matchupBottom}>
          <Text style={styles.matchupAwayName}>vs {liveMatchup.away.teamName}</Text>
          <Text style={styles.projRed}>Projected: {liveMatchup.away.projected.toFixed(1)} pts</Text>
        </View>
      </Card>

      {/* Starting lineup strip */}
      <FlatList
        horizontal
        data={startingLineup}
        keyExtractor={(slot) => slot.player.id}
        renderItem={({ item }) => (
          <PlayerChip
            slot={item}
            onPress={() =>
              navigation.navigate('TeamTab', { screen: 'PlayerDetail', params: { playerId: item.player.id } })
            }
          />
        )}
        contentContainerStyle={styles.strip}
        showsHorizontalScrollIndicator={false}
        snapToInterval={112 + spacing.sm}
        decelerationRate="fast"
        style={styles.stripList}
      />

      {/* Team snapshot */}
      <Card accent="blue" style={styles.block}>
        <Text style={styles.cardTitle}>Team Snapshot</Text>
        <Text style={styles.snapshotLabel}>Season Record</Text>
        <View style={styles.recordRow}>
          <Text style={styles.record}>{formatRecord(teamSnapshot.wins, teamSnapshot.losses)}</Text>
          <Text style={styles.seed}>
            #{teamSnapshot.seed} Seed{teamSnapshot.inPlayoffs ? ' · Playoffs' : ''}
          </Text>
        </View>
        <View style={styles.tiles}>
          <StatTile label="PF/Game" value={teamSnapshot.pfPerGame.toFixed(1)} style={styles.tile} />
          <StatTile label="PA/Game" value={teamSnapshot.paPerGame.toFixed(1)} style={styles.tile} />
          <StatTile label="Streak" value={teamSnapshot.streak} tone="positive" style={styles.tile} />
        </View>
        <View style={styles.projectionRow}>
          <Text style={styles.projectionLabel}>This week projection:</Text>
          <Text style={styles.projectionValue}>{teamSnapshot.weekProjection.toFixed(1)}</Text>
        </View>
        <View style={styles.oddsRow}>
          <Text style={styles.oddsLabel}>Playoff odds</Text>
          <Text style={styles.oddsValue}>{teamSnapshot.playoffOddsPct}%</Text>
        </View>
        <ProgressBar value={teamSnapshot.playoffOddsPct} color="blue" />
      </Card>

      {/* League activity (top 3) */}
      <Card accent="purple" style={styles.block}>
        <View style={styles.activityHeader}>
          <Text style={styles.cardTitle}>League Activity</Text>
          <Pressable onPress={() => navigation.navigate('NewsFeed')} hitSlop={8} accessibilityRole="button">
            {({ pressed }) => <Text style={[styles.seeAll, pressed && styles.pressed]}>See all →</Text>}
          </Pressable>
        </View>
        {leagueActivity.slice(0, 3).map((event, i, arr) => (
          <ActivityRow key={event.id} event={event} divider={i < arr.length - 1} />
        ))}
      </Card>

      {/* Prospect pipeline */}
      <View style={styles.block}>
        <SectionHeader
          title="Prospect Pipeline"
          subtitle="Your taxi squad & future assets"
          onSeeAll={() => navigation.navigate('TeamTab', { screen: 'Prospects' })}
        />
        <FlatList
          horizontal
          data={prospects}
          keyExtractor={(prospect) => prospect.player.id}
          renderItem={({ item }) => (
            <ProspectCard
              prospect={item}
              width={PROSPECT_CARD_WIDTH}
              onPress={() =>
                navigation.navigate('TeamTab', { screen: 'PlayerDetail', params: { playerId: item.player.id } })
              }
            />
          )}
          contentContainerStyle={styles.strip}
          showsHorizontalScrollIndicator={false}
          snapToInterval={PROSPECT_CARD_WIDTH + spacing.sm}
          decelerationRate="fast"
          style={styles.stripList}
        />
      </View>

      {/* Quick actions */}
      <View style={styles.block}>
        <Text style={styles.quickTitle}>Quick Actions</Text>
        <View style={styles.actions}>
          <ActionButton
            icon="🔄"
            label="Set Lineup"
            color="blue"
            onPress={() => navigation.navigate('SetLineup')}
            style={styles.action}
          />
          <ActionButton
            icon="🤝"
            label="Propose Trade"
            color="purple"
            onPress={() => navigation.navigate('ProposeTrade')}
            style={styles.action}
          />
          <ActionButton
            icon="🌊"
            label="Waiver Wire"
            color="green"
            onPress={() => navigation.navigate('WaiversTab', { screen: 'WaiverWire' })}
            style={styles.action}
          />
          <ActionButton
            icon="📊"
            label="Analytics"
            color="gold"
            onPress={() =>
              navigation.navigate('LeagueTab', { screen: 'LeagueHub', params: { segment: 'rankings' } })
            }
            style={styles.action}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.gutter, paddingBottom: spacing.xxl },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  wordmark: { ...type.title, color: colors.primary },
  gear: { fontSize: 17 },
  greeting: { marginBottom: spacing.lg },
  greetingTitle: { ...type.display, color: colors.text },
  greetingSub: { ...type.body, color: colors.textSecondary, marginTop: spacing.xs },
  leagueChip: { marginTop: spacing.sm + 2 },
  matchupTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  matchupWeek: { ...type.label, color: colors.primary },
  matchupClock: { ...type.micro, color: colors.green },
  matchupScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  matchupTeam: { flex: 1, paddingRight: spacing.md },
  matchupTeamName: { ...type.title, color: colors.text },
  projGreen: { ...type.micro, color: colors.green, marginTop: 2 },
  projRed: { ...type.micro, color: colors.red },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  vs: { ...type.microBold, color: colors.textMuted },
  matchupBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm + 2,
  },
  matchupAwayName: { ...type.caption, color: colors.textSecondary },
  stripList: { marginTop: spacing.md, marginHorizontal: -spacing.gutter },
  strip: { gap: spacing.sm, paddingHorizontal: spacing.gutter },
  block: { marginTop: spacing.xl },
  cardTitle: { ...type.subheading, color: colors.text },
  snapshotLabel: { ...type.caption, color: colors.textSecondary, marginTop: spacing.sm },
  recordRow: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  record: { ...type.display, color: colors.text, fontVariant: ['tabular-nums'] },
  seed: { ...type.micro, color: colors.green },
  tiles: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  tile: { flex: 1 },
  projectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.elevated,
    borderRadius: 8,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  projectionLabel: { ...type.caption, color: colors.textSecondary },
  projectionValue: { ...type.heading, color: colors.primary, fontVariant: ['tabular-nums'] },
  oddsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.xs + 2,
  },
  oddsLabel: { ...type.caption, color: colors.textSecondary },
  oddsValue: { ...type.emphasis, fontSize: 12, color: colors.text },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  seeAll: { ...type.emphasis, fontSize: 12, color: colors.primary },
  pressed: { opacity: 0.7 },
  quickTitle: { ...type.heading, color: colors.text, marginBottom: spacing.md },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  action: { flexBasis: '48%', flexGrow: 1 },
});
