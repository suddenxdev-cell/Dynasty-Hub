/**
 * Color tokens extracted from Figma "Dynasty-Hub" (node 1:1683) via REST API.
 * Values are exact fills from the node tree — do not eyeball-adjust.
 */
export const colors = {
  /** App background */
  bg: '#0d0f14',
  /** Cards, panels, tab bar */
  surface: '#161a23',
  /** Tiles, score boxes, list rows */
  elevated: '#1e2433',
  /** Pills, progress tracks */
  chip: '#252d3d',
  /** Hairlines, dividers */
  border: '#2a3347',
  /** Brand, active nav, primary CTAs */
  primary: '#4f8ef7',
  /** Week pill, trades */
  purple: '#7c5cfc',
  /** Positive, live, waivers */
  green: '#3ec97e',
  /** Draft capital, analytics */
  gold: '#f5c842',
  /** Negative, losing score */
  red: '#e05050',
  /** Primary text */
  text: '#ffffff',
  /** Body copy, metadata */
  textSecondary: '#8896b0',
  /** Uppercase section labels only (contrast-limited) */
  textMuted: '#5a6a85',
} as const;

export type AccentColor = 'blue' | 'purple' | 'green' | 'gold' | 'red';

export const accentColors: Record<AccentColor, string> = {
  blue: colors.primary,
  purple: colors.purple,
  green: colors.green,
  gold: colors.gold,
  red: colors.red,
};
