import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AccentBarRow, ActionButton } from '../components';
import {
  benchLineup,
  draftPicks,
  formatRound,
  startingLineup,
  waiverTargets,
  type DraftPick,
} from '../data';
import type { RootStackScreenProps } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';

const theirPick: DraftPick = { id: 'their-2026-2nd', season: 2026, round: 2, origin: 'trade', note: 'their 2nd' };

interface AssetItem {
  id: string;
  title: string;
  subtitle?: string;
  accent: 'blue' | 'gold';
}

const yourAssets: AssetItem[] = [
  ...[...startingLineup, ...benchLineup].map((slot) => ({
    id: slot.player.id,
    title: slot.player.name,
    subtitle: `${slot.player.position} · ${slot.player.nflTeam}`,
    accent: 'blue' as const,
  })),
  ...draftPicks.map((pick) => ({
    id: pick.id,
    title: `${pick.season} ${formatRound(pick.round)}`,
    subtitle: pick.note,
    accent: 'gold' as const,
  })),
];

const theirAssets: AssetItem[] = [
  ...waiverTargets.map((target) => ({
    id: target.player.id,
    title: target.player.name,
    subtitle: `${target.player.position} · ${target.player.nflTeam}`,
    accent: 'blue' as const,
  })),
  {
    id: theirPick.id,
    title: `${theirPick.season} ${formatRound(theirPick.round)}`,
    subtitle: theirPick.note,
    accent: 'gold' as const,
  },
];

export function ProposeTradeScreen({ navigation }: RootStackScreenProps<'ProposeTrade'>) {
  const [sending, setSending] = useState<ReadonlySet<string>>(new Set());
  const [getting, setGetting] = useState<ReadonlySet<string>>(new Set());

  const toggle = (set: ReadonlySet<string>, id: string): Set<string> => {
    const next = new Set(set);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    return next;
  };

  const canSend = sending.size > 0 && getting.size > 0;

  const renderAssets = (
    assets: AssetItem[],
    selected: ReadonlySet<string>,
    onToggle: (id: string) => void,
  ) =>
    assets.map((asset) => {
      const isSelected = selected.has(asset.id);
      return (
        <Pressable key={asset.id} onPress={() => onToggle(asset.id)} style={[styles.asset, isSelected && styles.assetSelected]}>
          <AccentBarRow
            title={`${isSelected ? '✓ ' : ''}${asset.title}`}
            subtitle={asset.subtitle}
            accent={asset.accent}
            onPress={() => onToggle(asset.id)}
          />
        </Pressable>
      );
    });

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.partner}>With: The Waiver Wire</Text>

        <Text style={styles.sectionLabel}>You send</Text>
        <View style={styles.list}>{renderAssets(yourAssets, sending, (id) => setSending((s) => toggle(s, id)))}</View>

        <Text style={styles.sectionLabel}>You get</Text>
        <View style={styles.list}>{renderAssets(theirAssets, getting, (id) => setGetting((s) => toggle(s, id)))}</View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.summary}>
          {sending.size} out · {getting.size} in
        </Text>
        <ActionButton
          icon="🤝"
          label="Send Offer"
          color="purple"
          onPress={() => {
            if (canSend) navigation.goBack();
          }}
          style={canSend ? undefined : styles.disabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.section },
  partner: { ...type.subheading, color: colors.textSecondary },
  sectionLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  list: { gap: spacing.sm },
  asset: { borderRadius: radius.row },
  assetSelected: { borderWidth: 1, borderColor: colors.purple, borderRadius: radius.row },
  footer: {
    padding: spacing.gutter,
    paddingBottom: spacing.xxl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    gap: spacing.sm,
  },
  summary: { ...type.caption, color: colors.textSecondary, textAlign: 'center' },
  disabled: { opacity: 0.4 },
});
