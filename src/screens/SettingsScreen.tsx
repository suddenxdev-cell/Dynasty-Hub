import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '../components';
import { leagueName } from '../data';
import type { RootStackScreenProps } from '../navigation/types';
import { colors, spacing, type } from '../theme';

interface RowProps {
  label: string;
  value?: string;
  divider?: boolean;
  children?: React.ReactNode;
}

function SettingsRow({ label, value, divider = true, children }: RowProps) {
  return (
    <View style={[styles.row, divider && styles.divider]}>
      <Text style={styles.rowLabel}>{label}</Text>
      {value ? <Text style={styles.rowValue}>{value}</Text> : null}
      {children}
    </View>
  );
}

export function SettingsScreen(_props: RootStackScreenProps<'Settings'>) {
  const [gameAlerts, setGameAlerts] = useState(true);
  const [tradeOfferAlerts, setTradeOfferAlerts] = useState(true);
  const [waiverResults, setWaiverResults] = useState(false);

  const switchProps = {
    trackColor: { false: colors.chip, true: colors.primary },
    thumbColor: colors.text,
  } as const;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.groupLabel}>League</Text>
      <Card padded={false}>
        <SettingsRow label="League" value={leagueName} />
        <SettingsRow label="Scoring" value="Superflex · PPR" divider={false} />
      </Card>

      <Text style={styles.groupLabel}>Notifications</Text>
      <Card padded={false}>
        <SettingsRow label="Game alerts">
          <Switch value={gameAlerts} onValueChange={setGameAlerts} {...switchProps} />
        </SettingsRow>
        <SettingsRow label="Trade offers">
          <Switch value={tradeOfferAlerts} onValueChange={setTradeOfferAlerts} {...switchProps} />
        </SettingsRow>
        <SettingsRow label="Waiver results" divider={false}>
          <Switch value={waiverResults} onValueChange={setWaiverResults} {...switchProps} />
        </SettingsRow>
      </Card>

      <Text style={styles.groupLabel}>About</Text>
      <Card padded={false}>
        <SettingsRow label="Version" value="1.0.0" />
        <SettingsRow label="Design" value="Built from Figma" divider={false} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.gutter, paddingBottom: spacing.xxl },
  groupLabel: { ...type.label, color: colors.textMuted, marginTop: spacing.lg, marginBottom: spacing.sm },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { ...type.body, color: colors.text },
  rowValue: { ...type.caption, color: colors.textSecondary },
});
