import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AccentBarRow, ActionButton, PlayerChip, ProspectCard, SegmentedControl } from '../components';
import { benchLineup, formatRecord, prospects, startingLineup, teamSnapshot } from '../data';
import type { TeamStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

const SEGMENTS = ['Roster', 'Taxi Squad'] as const;

export function MyTeamScreen({ navigation, route }: TeamStackScreenProps<'MyTeam'>) {
  const [segment, setSegment] = useState(route.params?.segment === 'taxi' ? 1 : 0);
  const taxiProspects = prospects.filter((prospect) => prospect.onTaxiSquad);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Team identity — the desktop sidebar's pinned card */}
      <View style={styles.identity}>
        <Text style={styles.teamName}>{teamSnapshot.teamName}</Text>
        <Text style={styles.teamMeta}>
          {formatRecord(teamSnapshot.wins, teamSnapshot.losses)} · #{teamSnapshot.seed} Seed
          {teamSnapshot.inPlayoffs ? ' · Playoffs' : ''}
        </Text>
      </View>

      <SegmentedControl segments={SEGMENTS} selectedIndex={segment} onChange={setSegment} />

      {segment === 0 ? (
        <>
          <Text style={styles.sectionLabel}>Starters</Text>
          <View style={styles.list}>
            {startingLineup.map((slot) => (
              <PlayerChip
                key={slot.player.id}
                slot={slot}
                variant="row"
                onPress={() => navigation.navigate('PlayerDetail', { playerId: slot.player.id })}
              />
            ))}
          </View>
          <Text style={styles.sectionLabel}>Bench</Text>
          <View style={styles.list}>
            {benchLineup.map((slot) => (
              <PlayerChip
                key={slot.player.id}
                slot={slot}
                variant="row"
                onPress={() => navigation.navigate('PlayerDetail', { playerId: slot.player.id })}
              />
            ))}
          </View>
          <ActionButton
            icon="🔄"
            label="Edit Lineup"
            color="blue"
            onPress={() => navigation.navigate('SetLineup')}
            style={styles.edit}
          />
        </>
      ) : (
        <View style={[styles.list, styles.taxiList]}>
          {taxiProspects.map((prospect) => (
            <ProspectCard
              key={prospect.player.id}
              prospect={prospect}
              onPress={() => navigation.navigate('PlayerDetail', { playerId: prospect.player.id })}
            />
          ))}
        </View>
      )}

      <Text style={styles.sectionLabel}>Dynasty Assets</Text>
      <View style={styles.list}>
        <AccentBarRow
          title="🌟 Prospects"
          subtitle="Pipeline ranked by dynasty value"
          accent="green"
          onPress={() => navigation.navigate('Prospects')}
          right={<Text style={styles.chevron}>›</Text>}
        />
        <AccentBarRow
          title="🎯 Draft Picks"
          subtitle="5 future picks · 2025–2026"
          accent="gold"
          onPress={() => navigation.navigate('DraftPicks')}
          right={<Text style={styles.chevron}>›</Text>}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  identity: { marginBottom: spacing.lg },
  teamName: { ...type.display, color: colors.text },
  teamMeta: { ...type.caption, color: colors.green, marginTop: 2 },
  sectionLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  list: { gap: spacing.sm },
  taxiList: { marginTop: spacing.lg },
  edit: { marginTop: spacing.lg },
  chevron: { ...type.title, color: colors.textMuted },
});
