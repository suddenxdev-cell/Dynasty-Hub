import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors, fonts } from '../theme';

/** Shared native-stack header styling on the dark tokens. */
export const stackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.surface },
  headerTitleStyle: { fontFamily: fonts.semibold, fontSize: 16, color: colors.text },
  headerTintColor: colors.primary,
  headerShadowVisible: false,
  headerBackButtonDisplayMode: 'minimal',
  contentStyle: { backgroundColor: colors.bg },
};
