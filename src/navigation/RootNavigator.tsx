import { DarkTheme, NavigationContainer, type Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ProposeTradeScreen } from '../screens/ProposeTradeScreen';
import { SetLineupScreen } from '../screens/SetLineupScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { colors, fonts } from '../theme';
import { MainTabs } from './MainTabs';
import { stackScreenOptions } from './options';
import type { RootStackParamList } from './types';

const navTheme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.bg,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    notification: colors.red,
  },
  fonts: {
    ...DarkTheme.fonts,
    regular: { fontFamily: fonts.regular, fontWeight: '400' },
    medium: { fontFamily: fonts.medium, fontWeight: '500' },
    bold: { fontFamily: fonts.bold, fontWeight: '700' },
    heavy: { fontFamily: fonts.bold, fontWeight: '700' },
  },
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator screenOptions={stackScreenOptions}>
        <RootStack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        <RootStack.Screen
          name="SetLineup"
          component={SetLineupScreen}
          options={{ presentation: 'fullScreenModal', title: 'Set Lineup' }}
        />
        <RootStack.Screen
          name="ProposeTrade"
          component={ProposeTradeScreen}
          options={{ presentation: 'modal', title: 'Propose Trade' }}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ presentation: 'modal', title: 'Settings' }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
