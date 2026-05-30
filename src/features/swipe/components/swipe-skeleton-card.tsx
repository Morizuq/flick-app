import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/shared/hooks/use-theme';

export function SwipeSkeletonCard() {
  const theme = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          shadowColor: theme.text,
        },
      ]}
    >
      {/* Skeleton Image Area with shimmer */}
      <Animated.View
        style={[
          styles.imageSkeleton,
          { backgroundColor: theme.backgroundElement },
          animatedStyle,
        ]}
      />

      {/* Floating Info Skeleton at bottom */}
      <View style={styles.infoContainer}>
        {/* Name and Age Placeholder */}
        <Animated.View
          style={[
            styles.nameAgePlaceholder,
            { backgroundColor: theme.backgroundSelected },
            animatedStyle,
          ]}
        />

        {/* Bio Line 1 Placeholder */}
        <Animated.View
          style={[
            styles.bioLinePlaceholder,
            { backgroundColor: theme.backgroundSelected, width: '80%' },
            animatedStyle,
          ]}
        />

        {/* Bio Line 2 Placeholder */}
        <Animated.View
          style={[
            styles.bioLinePlaceholder,
            { backgroundColor: theme.backgroundSelected, width: '55%', marginTop: Spacing.one },
            animatedStyle,
          ]}
        />

        {/* Interest Tags Placeholders */}
        <View style={styles.interests}>
          {[1, 2, 3].map((key) => (
            <Animated.View
              key={key}
              style={[
                styles.tagPlaceholder,
                { backgroundColor: theme.backgroundSelected },
                animatedStyle,
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.large,
    borderWidth: 0.5,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  imageSkeleton: {
    ...StyleSheet.absoluteFill,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.four,
    zIndex: 10,
  },
  nameAgePlaceholder: {
    height: 24,
    width: 150,
    borderRadius: Radius.small,
    marginBottom: Spacing.two,
  },
  bioLinePlaceholder: {
    height: 14,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
  interests: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  tagPlaceholder: {
    height: 24,
    width: 70,
    borderRadius: Radius.medium,
  },
});
