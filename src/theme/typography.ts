import type { TextStyle } from 'react-native';

/**
 * Type scale extracted from Figma — Inter 400/500/600/700.
 * Deliberate deviation: the file's 9–10px roles are floored at 11pt for
 * phone legibility; hierarchy is held by weight and color instead of size.
 */
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
} as const;

export const type = {
  /** Greeting headline — Figma 700 · 22–24px */
  display: { fontFamily: fonts.bold, fontSize: 24, lineHeight: 29, letterSpacing: -0.3 },
  /** Matchup scores — Figma 700 · 20px */
  scoreXL: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 24 },
  /** Wordmark, team names, big stats — Figma 700 · 18px */
  title: { fontFamily: fonts.bold, fontSize: 18, lineHeight: 22 },
  /** Section headers — Figma 600 · 16px */
  heading: { fontFamily: fonts.semibold, fontSize: 16, lineHeight: 19 },
  /** Card titles — Figma 600 · 14px */
  subheading: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 17 },
  /** Body copy — Figma 400 · 13–14px */
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 18 },
  /** Player names, nav items — Figma 600 · 12–13px */
  emphasis: { fontFamily: fonts.semibold, fontSize: 13, lineHeight: 16 },
  /** Metadata lines — Figma 400/500 · 11–12px */
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 15 },
  /** Uppercase section labels — Figma 600 · 10–11px, floored at 11 */
  label: { fontFamily: fonts.semibold, fontSize: 11, lineHeight: 13, letterSpacing: 0.8, textTransform: 'uppercase' },
  /** Status lines, pick notes — Figma 400 · 9–10px, floored at 11 */
  micro: { fontFamily: fonts.regular, fontSize: 11, lineHeight: 13 },
  /** Position tags, grades — Figma 700 · 10–11px, floored at 11 */
  microBold: { fontFamily: fonts.bold, fontSize: 11, lineHeight: 13 },
} satisfies Record<string, TextStyle>;

export type TypeRole = keyof typeof type;
