export type Position = 'QB' | 'RB' | 'WR' | 'TE' | 'FLX' | 'K';
export type PlayerStatus = 'active' | 'questionable' | 'out';
export type Grade = 'A+' | 'A' | 'B+' | 'B';

export interface Player {
  id: string;
  name: string;
  position: Position;
  nflTeam: string;
  age: number;
  status: PlayerStatus;
}

export interface LineupSlot {
  slot: Position;
  player: Player;
  starter: boolean;
  points?: number;
}

export interface TeamScore {
  teamName: string;
  score: number;
  projected: number;
}

export interface Matchup {
  id: string;
  week: number;
  live: boolean;
  /** e.g. "Q3 · 8:42" — only when live */
  clock?: string;
  home: TeamScore;
  away: TeamScore;
}

export interface Prospect {
  player: Player;
  grade: Grade;
  dynastyValue: number;
  valueDelta: number;
  onTaxiSquad: boolean;
}

export interface DraftPick {
  id: string;
  season: number;
  round: number;
  origin: 'own' | 'trade';
  /** e.g. "proj. #6" */
  note?: string;
}

export interface ActivityEvent {
  id: string;
  icon: string;
  when: string;
  text: string;
}

export interface StandingRow {
  rank: number;
  teamName: string;
  wins: number;
  losses: number;
  pointsFor: number;
  isUser: boolean;
}

export interface PowerRankingRow {
  rank: number;
  teamName: string;
  delta: number;
  value: number;
  isUser: boolean;
}

export interface ScheduleWeek {
  week: number;
  matchups: Matchup[];
}

export type TradeAsset =
  | { kind: 'player'; player: Player }
  | { kind: 'pick'; pick: DraftPick };

export interface TradeOffer {
  id: string;
  from: string;
  give: TradeAsset[];
  receive: TradeAsset[];
  status: 'pending' | 'accepted' | 'declined';
  when: string;
}

export interface WaiverTarget {
  player: Player;
  /** Fantasy points last week */
  lastWeekPoints: number;
  rosteredPct: number;
}

export interface TeamSnapshot {
  teamName: string;
  wins: number;
  losses: number;
  seed: number;
  inPlayoffs: boolean;
  pfPerGame: number;
  paPerGame: number;
  streak: string;
  weekProjection: number;
  playoffOddsPct: number;
}
