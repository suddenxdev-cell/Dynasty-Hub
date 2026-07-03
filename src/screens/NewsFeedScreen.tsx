import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text } from 'react-native';
import { ActivityRow, Card } from '../components';
import { leagueActivity, type ActivityEvent } from '../data';
import type { HomeStackScreenProps, LeagueStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

type NewsFeedProps = HomeStackScreenProps<'NewsFeed'> | LeagueStackScreenProps<'NewsFeed'>;

function groupLabel(event: ActivityEvent): string {
  if (event.when.endsWith('h ago')) return 'Today';
  if (event.when === '1d ago') return 'Yesterday';
  return 'Earlier';
}

export function NewsFeedScreen(_props: NewsFeedProps) {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const groups = leagueActivity.reduce<Map<string, ActivityEvent[]>>((map, event) => {
    const label = groupLabel(event);
    const bucket = map.get(label) ?? [];
    bucket.push(event);
    map.set(label, bucket);
    return map;
  }, new Map());

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      {[...groups.entries()].map(([label, events]) => (
        <React.Fragment key={label}>
          <Text style={styles.groupLabel}>{label}</Text>
          <Card>
            {events.map((event, i, arr) => (
              <ActivityRow key={event.id} event={event} divider={i < arr.length - 1} />
            ))}
          </Card>
        </React.Fragment>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  groupLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.lg, marginBottom: spacing.sm },
});
