import React from 'react';
import { Pressable, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ThemedText } from './themed-text';
import { Spacing, Radius } from '@/constants/theme';
import { useTheme } from '@/shared/hooks/use-theme';

export interface FlickButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export function FlickButton({ onPress, title, style, textStyle, disabled }: FlickButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: theme.accent,
          opacity: disabled ? 0.5 : pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <ThemedText type="button" style={[styles.text, { color: theme.buttonTextPrimary }, textStyle]}>
        {title}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 56,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
