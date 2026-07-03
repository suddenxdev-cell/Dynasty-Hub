import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActionButton, PlayerChip } from '../components';
import { benchLineup, startingLineup, type LineupSlot } from '../data';
import type { RootStackScreenProps } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

export function SetLineupScreen({ navigation }: RootStackScreenProps<'SetLineup'>) {
  const [starters, setStarters] = useState<LineupSlot[]>(startingLineup);
  const [bench, setBench] = useState<LineupSlot[]>(benchLineup);
  const [selectedStarter, setSelectedStarter] = useState<string | null>(null);

  const swap = (benchPlayerId: string) => {
    if (!selectedStarter) return;
    const starterIndex = starters.findIndex((slot) => slot.player.id === selectedStarter);
    const benchIndex = bench.findIndex((slot) => slot.player.id === benchPlayerId);
    if (starterIndex === -1 || benchIndex === -1) return;
    const starterSlot = starters[starterIndex];
    const benchSlot = bench[benchIndex];
    if (!starterSlot || !benchSlot) return;

    const nextStarters = [...starters];
    const nextBench = [...bench];
    // Swap the players; slot labels stay with the lineup position.
    nextStarters[starterIndex] = { ...starterSlot, player: benchSlot.player };
    nextBench[benchIndex] = { ...benchSlot, player: starterSlot.player, points: undefined };
    setStarters(nextStarters);
    setBench(nextBench);
    setSelectedStarter(null);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.hint}>Tap a starter, then a bench player to swap.</Text>

        <Text style={styles.sectionLabel}>Starters</Text>
        <View style={styles.list}>
          {starters.map((slot) => {
            const selected = slot.player.id === selectedStarter;
            return (
              <View key={slot.player.id} style={[styles.slot, selected && styles.slotSelected]}>
                <PlayerChip
                  slot={slot}
                  variant="row"
                  onPress={() => setSelectedStarter(selected ? null : slot.player.id)}
                />
              </View>
            );
          })}
        </View>

        <Text style={styles.sectionLabel}>Bench</Text>
        <View style={styles.list}>
          {bench.map((slot) => (
            <Pressable
              key={slot.player.id}
              onPress={() => swap(slot.player.id)}
              disabled={!selectedStarter}
              style={[styles.slot, !selectedStarter && styles.benchIdle]}
            >
              <PlayerChip slot={slot} variant="row" onPress={selectedStarter ? () => swap(slot.player.id) : undefined} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <ActionButton icon="✓" label="Done" color="blue" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.section },
  hint: { ...type.caption, color: colors.textSecondary },
  sectionLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  list: { gap: spacing.sm },
  slot: { borderRadius: radius.row },
  slotSelected: { borderWidth: 1, borderColor: colors.primary, borderRadius: radius.row },
  benchIdle: { opacity: 0.75 },
  footer: {
    padding: spacing.gutter,
    paddingBottom: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
