/** 4pt grid derived from sibling-gap analysis of the Figma frame. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 40,
  /** Horizontal screen gutter */
  gutter: 16,
} as const;

/** Corner radii as used in the file: 4 badges · 6 chips/rows · 8 tiles/buttons · 10–12 cards · 16 hero. */
export const radius = {
  badge: 4,
  row: 6,
  tile: 8,
  card: 10,
  cardLg: 12,
  hero: 16,
  pill: 999,
} as const;
