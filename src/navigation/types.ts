import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  SetLineup: undefined;
  ProposeTrade: { counterOfferId?: string } | undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  TeamTab: NavigatorScreenParams<TeamStackParamList>;
  LeagueTab: NavigatorScreenParams<LeagueStackParamList>;
  WaiversTab: NavigatorScreenParams<WaiversStackParamList>;
  TradeTab: NavigatorScreenParams<TradeStackParamList>;
};

export type HomeStackParamList = {
  Home: undefined;
  MatchupDetail: { matchupId: string };
  NewsFeed: undefined;
};

export type TeamStackParamList = {
  MyTeam: { segment?: 'roster' | 'taxi' } | undefined;
  Prospects: undefined;
  DraftPicks: undefined;
  PlayerDetail: { playerId: string };
};

export type LeagueStackParamList = {
  LeagueHub: { segment?: 'standings' | 'rankings' | 'schedule' } | undefined;
  NewsFeed: undefined;
};

export type WaiversStackParamList = {
  WaiverWire: undefined;
  PlayerDetail: { playerId: string };
};

export type TradeStackParamList = {
  TradeCenter: undefined;
  TradeDetail: { offerId: string };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

type TabScreenProps<T extends keyof MainTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, T>,
  RootStackScreenProps<'Main'>
>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, T>,
  TabScreenProps<'HomeTab'>
>;

export type TeamStackScreenProps<T extends keyof TeamStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<TeamStackParamList, T>,
  TabScreenProps<'TeamTab'>
>;

export type LeagueStackScreenProps<T extends keyof LeagueStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<LeagueStackParamList, T>,
  TabScreenProps<'LeagueTab'>
>;

export type WaiversStackScreenProps<T extends keyof WaiversStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<WaiversStackParamList, T>,
  TabScreenProps<'WaiversTab'>
>;

export type TradeStackScreenProps<T extends keyof TradeStackParamList> = CompositeScreenProps<
  NativeStackScreenProps<TradeStackParamList, T>,
  TabScreenProps<'TradeTab'>
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
