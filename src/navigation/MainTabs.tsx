import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';
import {
  HomeStackNavigator,
  LeagueStackNavigator,
  TeamStackNavigator,
  TradeStackNavigator,
  WaiversStackNavigator,
} from './stacks';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

function tabIcon(emoji: string) {
  return function TabIcon({ focused }: { focused: boolean; color: string; size: number }) {
    return <Text style={[styles.icon, !focused && styles.iconInactive]}>{emoji}</Text>;
  };
}

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontFamily: fonts.semibold, fontSize: 10 },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home', tabBarIcon: tabIcon('🏠') }}
      />
      <Tab.Screen
        name="TeamTab"
        component={TeamStackNavigator}
        options={{ title: 'My Team', tabBarIcon: tabIcon('👥') }}
      />
      <Tab.Screen
        name="LeagueTab"
        component={LeagueStackNavigator}
        options={{ title: 'League', tabBarIcon: tabIcon('🏆') }}
      />
      <Tab.Screen
        name="WaiversTab"
        component={WaiversStackNavigator}
        options={{ title: 'Waivers', tabBarIcon: tabIcon('🌊') }}
      />
      <Tab.Screen
        name="TradeTab"
        component={TradeStackNavigator}
        options={{ title: 'Trade', tabBarIcon: tabIcon('🤝') }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: { fontSize: 17 },
  iconInactive: { opacity: 0.45 },
});
