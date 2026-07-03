import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface ScoreBoxProps {
  score: number;
  tone?: 'leading' | 'trailing';
  size?: 'md' | 'lg';
}

/** Matchup score cell: elevated box, tabular numerals, red when trailing. */
export function ScoreBox({ score, tone = 'leading', size = 'lg' }: ScoreBoxProps) {
  return (
    <View style={[styles.box, size === 'md' && styles.boxMd]}>
      <Text
        style={[
          size === 'lg' ? styles.score : styles.scoreMd,
          { color: tone === 'trailing' ? colors.red : colors.text },
        ]}
      >
        {score.toFixed(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.elevated,
    borderRadius: radius.tile,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  boxMd: { paddingVertical: spacing.xs + 2, paddingHorizontal: spacing.sm + 2 },
  score: { ...type.scoreXL, fontVariant: ['tabular-nums'] },
  scoreMd: { ...type.heading, fontVariant: ['tabular-nums'] },
});
