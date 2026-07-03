import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gradeColor } from '../data/display';
import type { Grade } from '../data/models';
import { colors, radius, spacing, type } from '../theme';

interface GradeBadgeProps {
  grade: Grade;
}

export function GradeBadge({ grade }: GradeBadgeProps) {
  return (
    <View style={styles.badge}>
      <Text style={[styles.label, { color: gradeColor[grade] }]}>{grade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.chip,
    borderRadius: radius.badge,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  label: { ...type.microBold },
});
