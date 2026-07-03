/**
 * Mock data seeded from the Figma design's own content so the simulator
 * matches the file at first glance. Swap for a real API here only.
 */
import type {
  ActivityEvent,
  DraftPick,
  LineupSlot,
  Matchup,
  Player,
  PowerRankingRow,
  Prospect,
  ScheduleWeek,
  StandingRow,
  TeamSnapshot,
  TradeOffer,
  WaiverTarget,
} from './models';

export const userName = 'Matthew';
export const leagueName = 'Dynasty Superflex';
export const currentWeek = 14;

const p = (
  id: string,
  name: string,
  position: Player['position'],
  nflTeam: string,
  age: number,
  status: Player['status'] = 'active',
): Player => ({ id, name, position, nflTeam, age, status });

export const players = {
  daniels: p('daniels', 'J.Daniels', 'QB', 'WAS', 24),
  taylor: p('taylor', 'J.Taylor', 'RB', 'IND', 26),
  henry: p('henry', 'D.Henry', 'RB', 'BAL', 31, 'questionable'),
  lamb: p('lamb', 'C.Lamb', 'WR', 'DAL', 26),
  chase: p('chase', 'J.Chase', 'WR', 'CIN', 25),
  hill: p('hill', 'T.Hill', 'WR', 'MIA', 31, 'questionable'),
  laporta: p('laporta', 'S.LaPorta', 'TE', 'DET', 24),
  mcpherson: p('mcpherson', 'K.McPherson', 'FLX', 'NYJ', 23),
  robinson: p('robinson', 'B.Robinson', 'K', 'ATL', 26),
  williams: p('williams', 'Caleb Williams', 'QB', 'CHI', 22),
  nabers: p('nabers', 'Malik Nabers', 'WR', 'NYG', 21),
  bowers: p('bowers', 'Brock Bowers', 'TE', 'LV', 22),
  waddle: p('waddle', 'Jaylen Waddle', 'WR', 'MIA', 25),
  corum: p('corum', 'Blake Corum', 'RB', 'LAR', 23),
  davis: p('davis', 'Isaiah Davis', 'RB', 'NYJ', 23),
  shaheed: p('shaheed', 'R.Shaheed', 'WR', 'NO', 26),
  spears: p('spears', 'T.Spears', 'RB', 'TEN', 24),
  mims: p('mims', 'M.Mims', 'WR', 'DEN', 24),
} as const;

export const startingLineup: LineupSlot[] = [
  { slot: 'QB', player: players.daniels, starter: true, points: 21.4 },
  { slot: 'RB', player: players.taylor, starter: true, points: 14.2 },
  { slot: 'RB', player: players.henry, starter: true, points: 11.8 },
  { slot: 'WR', player: players.lamb, starter: true, points: 16.6 },
  { slot: 'WR', player: players.chase, starter: true, points: 18.9 },
  { slot: 'WR', player: players.hill, starter: true, points: 6.3 },
  { slot: 'TE', player: players.laporta, starter: true, points: 5.4 },
  { slot: 'FLX', player: players.mcpherson, starter: true, points: 3.8 },
  { slot: 'K', player: players.robinson, starter: true },
];

export const benchLineup: LineupSlot[] = [
  { slot: 'RB', player: players.spears, starter: false },
  { slot: 'WR', player: players.shaheed, starter: false },
  { slot: 'WR', player: players.mims, starter: false },
];

export const liveMatchup: Matchup = {
  id: 'wk14-sudden-waiver',
  week: 14,
  live: true,
  clock: 'Q3 · 8:42',
  home: { teamName: 'Sudden Impact', score: 98.4, projected: 142.8 },
  away: { teamName: 'The Waiver Wire', score: 86.1, projected: 121.3 },
};

export const teamSnapshot: TeamSnapshot = {
  teamName: 'Sudden Impact',
  wins: 8,
  losses: 6,
  seed: 3,
  inPlayoffs: true,
  pfPerGame: 138.4,
  paPerGame: 124.7,
  streak: 'W3',
  weekProjection: 142.8,
  playoffOddsPct: 82,
};

export const leagueActivity: ActivityEvent[] = [
  { id: 'a1', icon: '🏆', when: '2h ago', text: 'You traded D.Montgomery for a 2025 1st' },
  { id: 'a2', icon: '🔄', when: '5h ago', text: 'Waiver: Isaiah Davis (RB) picked up' },
  { id: 'a3', icon: '📊', when: '8h ago', text: 'C.Lamb upgraded to full participant' },
  { id: 'a4', icon: '🤝', when: '1d ago', text: 'Trade offer from The Waiver Wire' },
  { id: 'a5', icon: '📰', when: '2d ago', text: 'T.Hill questionable: hamstring' },
];

export const prospects: Prospect[] = [
  { player: players.williams, grade: 'A+', dynastyValue: 98.2, valueDelta: 4.1, onTaxiSquad: true },
  { player: players.nabers, grade: 'A', dynastyValue: 91.7, valueDelta: 2.8, onTaxiSquad: true },
  { player: players.bowers, grade: 'A', dynastyValue: 88.3, valueDelta: 3.1, onTaxiSquad: true },
  { player: players.waddle, grade: 'B+', dynastyValue: 79.4, valueDelta: 1.2, onTaxiSquad: true },
  { player: players.corum, grade: 'B', dynastyValue: 67.8, valueDelta: -0.5, onTaxiSquad: true },
];

export const draftPicks: DraftPick[] = [
  { id: 'p1', season: 2025, round: 1, origin: 'trade', note: 'via Trade' },
  { id: 'p2', season: 2025, round: 2, origin: 'own', note: 'own pick' },
  { id: 'p3', season: 2025, round: 3, origin: 'trade', note: 'via Trade' },
  { id: 'p4', season: 2026, round: 1, origin: 'own', note: 'proj. #6' },
  { id: 'p5', season: 2026, round: 2, origin: 'trade', note: 'via Trade' },
];

export const standings: StandingRow[] = [
  { rank: 1, teamName: 'Gridiron Gods', wins: 11, losses: 3, pointsFor: 1892.4, isUser: false },
  { rank: 2, teamName: 'Cheese Heads', wins: 10, losses: 4, pointsFor: 1841.0, isUser: false },
  { rank: 3, teamName: 'Sudden Impact', wins: 8, losses: 6, pointsFor: 1937.6, isUser: true },
  { rank: 4, teamName: 'The Waiver Wire', wins: 8, losses: 6, pointsFor: 1798.3, isUser: false },
  { rank: 5, teamName: 'Blitzkrieg', wins: 7, losses: 7, pointsFor: 1745.9, isUser: false },
  { rank: 6, teamName: 'End Zone Elite', wins: 7, losses: 7, pointsFor: 1701.2, isUser: false },
  { rank: 7, teamName: 'Hail Mary', wins: 6, losses: 8, pointsFor: 1688.5, isUser: false },
  { rank: 8, teamName: 'Turf Burners', wins: 5, losses: 9, pointsFor: 1623.8, isUser: false },
  { rank: 9, teamName: 'Fourth & Long', wins: 4, losses: 10, pointsFor: 1594.1, isUser: false },
  { rank: 10, teamName: 'Pick Six', wins: 4, losses: 10, pointsFor: 1547.7, isUser: false },
];

export const playoffCutoffRank = 6;

export const powerRankings: PowerRankingRow[] = [
  { rank: 1, teamName: 'Sudden Impact', delta: 2, value: 94.2, isUser: true },
  { rank: 2, teamName: 'Gridiron Gods', delta: -1, value: 92.8, isUser: false },
  { rank: 3, teamName: 'Cheese Heads', delta: -1, value: 88.1, isUser: false },
  { rank: 4, teamName: 'Blitzkrieg', delta: 1, value: 81.5, isUser: false },
  { rank: 5, teamName: 'The Waiver Wire', delta: -1, value: 79.9, isUser: false },
  { rank: 6, teamName: 'End Zone Elite', delta: 0, value: 74.3, isUser: false },
  { rank: 7, teamName: 'Hail Mary', delta: 2, value: 69.0, isUser: false },
  { rank: 8, teamName: 'Turf Burners', delta: 0, value: 61.7, isUser: false },
  { rank: 9, teamName: 'Fourth & Long', delta: -2, value: 55.4, isUser: false },
  { rank: 10, teamName: 'Pick Six', delta: 0, value: 48.9, isUser: false },
];

const m = (id: string, week: number, home: string, hs: number, away: string, as: number, live = false): Matchup => ({
  id,
  week,
  live,
  clock: live ? 'Q3 · 8:42' : undefined,
  home: { teamName: home, score: hs, projected: hs > 0 ? hs + 30 : 128.5 },
  away: { teamName: away, score: as, projected: as > 0 ? as + 28 : 117.2 },
});

export const schedule: ScheduleWeek[] = [
  {
    week: 14,
    matchups: [
      liveMatchup,
      m('wk14-b', 14, 'Gridiron Gods', 91.2, 'Blitzkrieg', 77.5, true),
      m('wk14-c', 14, 'Cheese Heads', 88.0, 'Hail Mary', 82.3, true),
      m('wk14-d', 14, 'End Zone Elite', 71.4, 'Turf Burners', 69.9, true),
      m('wk14-e', 14, 'Fourth & Long', 64.2, 'Pick Six', 58.7, true),
    ],
  },
  {
    week: 15,
    matchups: [
      m('wk15-a', 15, 'Sudden Impact', 0, 'Gridiron Gods', 0),
      m('wk15-b', 15, 'The Waiver Wire', 0, 'Cheese Heads', 0),
      m('wk15-c', 15, 'Blitzkrieg', 0, 'End Zone Elite', 0),
      m('wk15-d', 15, 'Hail Mary', 0, 'Fourth & Long', 0),
      m('wk15-e', 15, 'Turf Burners', 0, 'Pick Six', 0),
    ],
  },
];

export const tradeOffers: TradeOffer[] = [
  {
    id: 't1',
    from: 'The Waiver Wire',
    give: [{ kind: 'player', player: players.hill }],
    receive: [
      { kind: 'player', player: players.spears },
      { kind: 'pick', pick: { id: 'tp1', season: 2026, round: 2, origin: 'trade', note: 'their 2nd' } },
    ],
    status: 'pending',
    when: '1d ago',
  },
];

export const waiverTargets: WaiverTarget[] = [
  { player: players.davis, lastWeekPoints: 18.4, rosteredPct: 42 },
  { player: players.shaheed, lastWeekPoints: 14.1, rosteredPct: 61 },
  { player: players.mims, lastWeekPoints: 12.7, rosteredPct: 38 },
  { player: p('dowdle', 'R.Dowdle', 'RB', 'DAL', 26), lastWeekPoints: 11.9, rosteredPct: 55 },
  { player: p('kraft', 'T.Kraft', 'TE', 'GB', 24), lastWeekPoints: 10.2, rosteredPct: 29 },
];
