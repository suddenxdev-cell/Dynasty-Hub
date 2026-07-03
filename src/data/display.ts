import { colors } from '../theme';
import type { PlayerStatus, Grade } from './models';

export const statusMeta: Record<PlayerStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: colors.green },
  questionable: { label: 'Quest.', color: colors.gold },
  out: { label: 'Out', color: colors.red },
};

/** Grade → accent, matching the design: A-tier green, B+ blue, B gold. */
export const gradeColor: Record<Grade, string> = {
  'A+': colors.green,
  A: colors.green,
  'B+': colors.primary,
  B: colors.gold,
};

export const formatRound = (round: number): string =>
  round === 1 ? '1st Round' : round === 2 ? '2nd Round' : round === 3 ? '3rd Round' : `${round}th Round`;

export const formatRecord = (wins: number, losses: number): string => `${wins}-${losses}`;
