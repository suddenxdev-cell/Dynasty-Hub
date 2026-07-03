import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AccentBarRow, ActionButton, Chip } from '../components';
import { tradeOffers, type TradeOffer } from '../data';
import type { TradeStackScreenProps } from '../navigation/types';
import { colors, radius, spacing, type } from '../theme';
import { assetSubtitle, assetTitle } from './TradeCenterScreen';

export function TradeDetailScreen({ route }: TradeStackScreenProps<'TradeDetail'>) {
  const offer = tradeOffers.find((candidate) => candidate.id === route.params.offerId);
  const [status, setStatus] = useState<TradeOffer['status']>(offer?.status ?? 'pending');

  if (!offer) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Offer not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <View style={styles.titles}>
          <Text style={styles.from}>From: {offer.from}</Text>
          <Text style={styles.when}>{offer.when}</Text>
        </View>
        <Chip label={status} />
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

      {status === 'pending' ? (
        <View style={styles.actions}>
          <ActionButton
            icon="✓"
            label="Accept"
            color="green"
            onPress={() => setStatus('accepted')}
            style={styles.action}
          />
          <Pressable
            onPress={() => setStatus('declined')}
            style={({ pressed }) => [styles.decline, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <Text style={styles.declineLabel}>✕ Decline</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.resolved}>
          {status === 'accepted' ? '✓ Trade accepted' : '✕ Trade declined'}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  missing: { flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' },
  missingText: { ...type.body, color: colors.textSecondary },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titles: { flex: 1, paddingRight: spacing.md },
  from: { ...type.title, color: colors.text },
  when: { ...type.micro, color: colors.textMuted, marginTop: 1 },
  sideLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.xl, marginBottom: spacing.sm },
  assets: { gap: spacing.sm },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xxl },
  action: { flex: 1 },
  decline: {
    flex: 1,
    backgroundColor: colors.red,
    borderRadius: radius.tile,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.85 },
  declineLabel: { ...type.emphasis, color: colors.text },
  resolved: { ...type.subheading, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xxl },
});
