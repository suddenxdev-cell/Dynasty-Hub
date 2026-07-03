import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ProspectCard, SectionHeader } from '../components';
import { prospects } from '../data';
import type { TeamStackScreenProps } from '../navigation/types';
import { colors, spacing } from '../theme';

export function ProspectsScreen({ navigation }: TeamStackScreenProps<'Prospects'>) {
  const sorted = [...prospects].sort((a, b) => b.dynastyValue - a.dynastyValue);
  return (
    <FlatList
      style={styles.screen}
      contentContainerStyle={styles.content}
      data={sorted}
      keyExtractor={(prospect) => prospect.player.id}
      ListHeaderComponent={
        <SectionHeader title="Prospect Pipeline" subtitle="Ranked by dynasty value" />
      }
      renderItem={({ item }) => (
        <ProspectCard
          prospect={item}
          onPress={() => navigation.navigate('PlayerDetail', { playerId: item.player.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl, gap: spacing.sm },
});
