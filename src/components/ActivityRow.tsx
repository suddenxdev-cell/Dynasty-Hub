import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../theme';
import type { ActivityEvent } from '../data/models';

interface ActivityRowProps {
  event: ActivityEvent;
  /** Hairline under the row (omit on the last row) */
  divider?: boolean;
}

export function ActivityRow({ event, divider = true }: ActivityRowProps) {
  return (
    <View style={[styles.row, divider && styles.divider]}>
      <Text style={styles.icon}>{event.icon}</Text>
      <View style={styles.body}>
        <Text style={styles.when}>{event.when}</Text>
        <Text style={styles.text}>{event.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.sm + 2,
    paddingVertical: spacing.sm + 2,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.border },
  icon: { fontSize: 14, lineHeight: 18 },
  body: { flex: 1 },
  when: { ...type.micro, color: colors.textMuted },
  text: { ...type.caption, color: colors.textSecondary, marginTop: 1 },
});
