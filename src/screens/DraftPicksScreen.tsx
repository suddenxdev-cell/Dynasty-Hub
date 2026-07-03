import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { AccentBarRow } from '../components';
import { draftPicks, formatRound, type DraftPick } from '../data';
import type { TeamStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

interface PickSection {
  title: string;
  season: number;
  data: DraftPick[];
}

const sections: PickSection[] = [2025, 2026].map((season) => ({
  title: `${season} Season`,
  season,
  data: draftPicks.filter((pick) => pick.season === season),
}));

export function DraftPicksScreen(_props: TeamStackScreenProps<'DraftPicks'>) {
  return (
    <SectionList
      style={styles.screen}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={(pick) => pick.id}
      renderSectionHeader={({ section }) => <Text style={styles.header}>{section.title}</Text>}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <AccentBarRow
            title={formatRound(item.round)}
            subtitle={item.note}
            accent={item.season === 2025 ? 'green' : 'gold'}
          />
        </View>
      )}
      stickySectionHeadersEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  header: { ...type.subheading, color: colors.text, marginTop: spacing.lg, marginBottom: spacing.sm },
  row: { marginBottom: spacing.sm },
});
