import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { DraftPicksScreen } from '../screens/DraftPicksScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LeagueHubScreen } from '../screens/LeagueHubScreen';
import { MatchupDetailScreen } from '../screens/MatchupDetailScreen';
import { MyTeamScreen } from '../screens/MyTeamScreen';
import { NewsFeedScreen } from '../screens/NewsFeedScreen';
import { PlayerDetailScreen } from '../screens/PlayerDetailScreen';
import { ProspectsScreen } from '../screens/ProspectsScreen';
import { TradeCenterScreen } from '../screens/TradeCenterScreen';
import { TradeDetailScreen } from '../screens/TradeDetailScreen';
import { WaiverWireScreen } from '../screens/WaiverWireScreen';
import { stackScreenOptions } from './options';
import type {
  HomeStackParamList,
  LeagueStackParamList,
  TeamStackParamList,
  TradeStackParamList,
  WaiversStackParamList,
} from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
export function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="MatchupDetail" component={MatchupDetailScreen} options={{ title: 'Matchup' }} />
      <HomeStack.Screen name="NewsFeed" component={NewsFeedScreen} options={{ title: 'News Feed' }} />
    </HomeStack.Navigator>
  );
}

const TeamStack = createNativeStackNavigator<TeamStackParamList>();
export function TeamStackNavigator() {
  return (
    <TeamStack.Navigator screenOptions={stackScreenOptions}>
      <TeamStack.Screen name="MyTeam" component={MyTeamScreen} options={{ title: 'My Team' }} />
      <TeamStack.Screen name="Prospects" component={ProspectsScreen} options={{ title: 'Prospects' }} />
      <TeamStack.Screen name="DraftPicks" component={DraftPicksScreen} options={{ title: 'Draft Picks' }} />
      <TeamStack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ title: 'Player' }} />
    </TeamStack.Navigator>
  );
}

const LeagueStack = createNativeStackNavigator<LeagueStackParamList>();
export function LeagueStackNavigator() {
  return (
    <LeagueStack.Navigator screenOptions={stackScreenOptions}>
      <LeagueStack.Screen name="LeagueHub" component={LeagueHubScreen} options={{ title: 'League' }} />
      <LeagueStack.Screen name="NewsFeed" component={NewsFeedScreen} options={{ title: 'News Feed' }} />
    </LeagueStack.Navigator>
  );
}

const WaiversStack = createNativeStackNavigator<WaiversStackParamList>();
export function WaiversStackNavigator() {
  return (
    <WaiversStack.Navigator screenOptions={stackScreenOptions}>
      <WaiversStack.Screen name="WaiverWire" component={WaiverWireScreen} options={{ title: 'Waiver Wire' }} />
      <WaiversStack.Screen name="PlayerDetail" component={PlayerDetailScreen} options={{ title: 'Player' }} />
    </WaiversStack.Navigator>
  );
}

const TradeStack = createNativeStackNavigator<TradeStackParamList>();
export function TradeStackNavigator() {
  return (
    <TradeStack.Navigator screenOptions={stackScreenOptions}>
      <TradeStack.Screen name="TradeCenter" component={TradeCenterScreen} options={{ title: 'Trade Center' }} />
      <TradeStack.Screen name="TradeDetail" component={TradeDetailScreen} options={{ title: 'Trade' }} />
    </TradeStack.Navigator>
  );
}
