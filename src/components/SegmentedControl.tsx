import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, type } from '../theme';

interface SegmentedControlProps {
  segments: readonly string[];
  selectedIndex: number;
  onChange: (index: number) => void;
}

export function SegmentedControl({ segments, selectedIndex, onChange }: SegmentedControlProps) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {segments.map((segment, index) => {
        const selected = index === selectedIndex;
        return (
          <Pressable
            key={segment}
            onPress={() => onChange(index)}
            style={[styles.segment, selected && styles.selected]}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.label, selected && styles.labelSelected]}>{segment}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.elevated,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.tile,
    padding: 3,
    gap: 2,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.row,
    alignItems: 'center',
  },
  selected: { backgroundColor: colors.chip },
  label: { ...type.emphasis, fontSize: 12, color: colors.textSecondary },
  labelSelected: { color: colors.text },
});
