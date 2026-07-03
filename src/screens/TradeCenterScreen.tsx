import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AccentBarRow, ActionButton, Card, Chip } from '../components';
import { formatRound, tradeOffers, type TradeAsset } from '../data';
import type { TradeStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

export function assetTitle(asset: TradeAsset): string {
  return asset.kind === 'player'
    ? asset.player.name
    : `${asset.pick.season} ${formatRound(asset.pick.round)}`;
}

export function assetSubtitle(asset: TradeAsset): string | undefined {
  return asset.kind === 'player'
    ? `${asset.player.position} · ${asset.player.nflTeam}`
    : asset.pick.note;
}

export function TradeCenterScreen({ navigation }: TradeStackScreenProps<'TradeCenter'>) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {tradeOffers.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🤝</Text>
          <Text style={styles.emptyTitle}>No open offers</Text>
          <Text style={styles.emptyHint}>Dynasty leagues trade year-round — start one below.</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {tradeOffers.map((offer) => (
            <Card
              key={offer.id}
              accent="purple"
              onPress={() => navigation.navigate('TradeDetail', { offerId: offer.id })}
            >
              <View style={styles.offerTop}>
                <View style={styles.offerTitles}>
                  <Text style={styles.offerFrom}>From: {offer.from}</Text>
                  <Text style={styles.offerWhen}>{offer.when}</Text>
                </View>
                <Chip label={offer.status} />
              </View>
              <Text style={styles.sideLabel}>You get</Text>
              <View style={styles.assets}>
                {offer.give.map((asset) => (
                  <AccentBarRow
                    key={assetTitle(asset)}
                    title={assetTitle(asset)}
                    subtitle={assetSubtitle(asset)}
                    accent={asset.kind === 'player' ? 'blue' : 'gold'}
                  />
                ))}
              </View>
              <Text style={styles.sideLabel}>You send</Text>
              <View style={styles.assets}>
                {offer.receive.map((asset) => (
                  <AccentBarRow
                    key={assetTitle(asset)}
                    title={assetTitle(asset)}
                    subtitle={assetSubtitle(asset)}
                    accent={asset.kind === 'player' ? 'blue' : 'gold'}
                  />
                ))}
              </View>
            </Card>
          ))}
        </View>
      )}

      <ActionButton
        icon="🤝"
        label="Propose Trade"
        color="purple"
        onPress={() => navigation.navigate('ProposeTrade')}
        style={styles.cta}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  list: { gap: spacing.md },
  offerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  offerTitles: { flex: 1, paddingRight: spacing.md },
  offerFrom: { ...type.subheading, color: colors.text },
  offerWhen: { ...type.micro, color: colors.textMuted, marginTop: 1 },
  sideLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.md, marginBottom: spacing.sm },
  assets: { gap: spacing.sm },
  empty: { alignItems: 'center', paddingVertical: spacing.section },
  emptyIcon: { fontSize: 34 },
  emptyTitle: { ...type.heading, color: colors.text, marginTop: spacing.md },
  emptyHint: { ...type.caption, color: colors.textSecondary, marginTop: spacing.xs },
  cta: { marginTop: spacing.xl },
});
