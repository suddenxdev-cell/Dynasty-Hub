import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  onSeeAll?: () => void;
  seeAllLabel?: string;
}

export function SectionHeader({ title, subtitle, onSeeAll, seeAllLabel = 'See all →' }: SectionHeaderProps) {
  return (
    <View style={styles.row}>
      <View style={styles.titles}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {onSeeAll ? (
        <Pressable onPress={onSeeAll} accessibilityRole="button" hitSlop={8}>
          {({ pressed }) => <Text style={[styles.seeAll, pressed && styles.pressed]}>{seeAllLabel}</Text>}
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  titles: { flex: 1, paddingRight: spacing.md },
  title: { ...type.heading, color: colors.text },
  subtitle: { ...type.caption, color: colors.textSecondary, marginTop: 2 },
  seeAll: { ...type.emphasis, fontSize: 12, color: colors.primary },
  pressed: { opacity: 0.7 },
});
