/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Primary palette
    background: '#FFFFFF',
    text: '#000000',
    grey: '#8E8E93',
    greyLight: '#F2F2F7',
    greyDark: '#48484A',
    error: '#FF3B30', // Red
    accent: '#FF3B30', // Red
    success: '#4CD964', // Green

    // Semantic tokens
    backgroundElement: '#F2F2F7',
    backgroundSelected: '#E5E5EA',
    textSecondary: '#8E8E93',
    border: '#E5E5EA',
    cardBackground: '#FFFFFF',
    buttonTextPrimary: '#FFFFFF',
    buttonTextSecondary: '#FF3B30',
    textOnDark: '#FFFFFF',
    textOnDarkSecondary: 'rgba(255, 255, 255, 0.8)',
    tagBackgroundOnDark: 'rgba(255, 255, 255, 0.2)',
  },
  dark: {
    // Primary palette
    background: '#000000',
    text: '#FFFFFF',
    grey: '#8E8E93',
    greyLight: '#1C1C1E',
    greyDark: '#AEAEB2',
    error: '#FF453A', // Vibrant Red for dark mode
    accent: '#FF453A', // Vibrant Red for dark mode
    success: '#30D158', // Vibrant Green for dark mode

    // Semantic tokens
    backgroundElement: '#1C1C1E',
    backgroundSelected: '#2C2C2E',
    textSecondary: '#AEAEB2',
    border: '#2C2C2E',
    cardBackground: '#1C1C1E',
    buttonTextPrimary: '#FFFFFF',
    buttonTextSecondary: '#FF453A',
    textOnDark: '#FFFFFF',
    textOnDarkSecondary: 'rgba(255, 255, 255, 0.8)',
    tagBackgroundOnDark: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  small: 8,
  medium: 16,
  large: 24,
  full: 9999,
} as const;

export const Typography = {
  h1: {
    fontSize: 48,
    lineHeight: 52,
    fontWeight: '800' as const,
  },
  h2: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700' as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySmallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700' as const,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
  button: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
