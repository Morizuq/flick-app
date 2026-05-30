import { Platform, StyleSheet, Text, type TextProps } from 'react-native';

import { Fonts, ThemeColor, Typography } from '@/constants/theme';
import { useTheme } from '@/shared/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code'
    | 'h1' | 'h2' | 'h3' | 'body' | 'bodyBold' | 'bodySmall' | 'bodySmallBold' | 'caption' | 'button';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        type === 'default' && styles.default,
        type === 'title' && styles.title,
        type === 'small' && styles.small,
        type === 'smallBold' && styles.smallBold,
        type === 'subtitle' && styles.subtitle,
        type === 'link' && styles.link,
        type === 'linkPrimary' && styles.linkPrimary,
        type === 'code' && styles.code,
        // Semantic typography aliases
        type === 'h1' && Typography.h1,
        type === 'h2' && Typography.h2,
        type === 'h3' && Typography.h3,
        type === 'body' && Typography.body,
        type === 'bodyBold' && Typography.bodyBold,
        type === 'bodySmall' && Typography.bodySmall,
        type === 'bodySmallBold' && Typography.bodySmallBold,
        type === 'caption' && Typography.caption,
        type === 'button' && Typography.button,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  small: Typography.bodySmall,
  smallBold: Typography.bodySmallBold,
  default: Typography.body,
  title: Typography.h1,
  subtitle: Typography.h2,
  link: {
    ...Typography.bodySmall,
    lineHeight: 30,
  },
  linkPrimary: {
    ...Typography.bodySmall,
    lineHeight: 30,
    color: '#3c87f7',
  },
  code: {
    fontFamily: Fonts.mono,
    fontWeight: Platform.select({ android: '700' as const }) ?? '500' as const,
    fontSize: 12,
  },
});
