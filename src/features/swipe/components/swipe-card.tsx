import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

import { Radius, Spacing } from '@/constants/theme';
import { ThemedText } from '@/shared/components/themed-text';
import { useTheme } from '@/shared/hooks/use-theme';
import { Profile } from '@/shared/types/profile';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;
const ROTATE_ANGLE = 60; // max rotation angle

export interface SwipeCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  onPress: () => void;
}

export function SwipeCard({ profile, onSwipeLeft, onSwipeRight, onPress }: SwipeCardProps) {
  const theme = useTheme();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe Right (LIKE)
        translateX.value = withTiming(SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          scheduleOnRN(onSwipeRight);
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe Left (NOPE)
        translateX.value = withTiming(-SCREEN_WIDTH * 1.5, { duration: 250 }, () => {
          scheduleOnRN(onSwipeLeft);
        });
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const tapGesture = Gesture.Tap()
    .numberOfTaps(1)
    .onEnd(() => {
      scheduleOnRN(onPress);
    });

  const composedGesture = Gesture.Exclusive(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
      [-ROTATE_ANGLE / 2, ROTATE_ANGLE / 2],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  // Stamp opacity style for "LIKE" and "NOPE" indicators
  const likeStampStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, SWIPE_THRESHOLD],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const nopeStampStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.card, { backgroundColor: theme.cardBackground, borderColor: theme.border, shadowColor: theme.text }, animatedStyle]}>
        {/* Full Card Image Overlay */}
        <Image source={profile.image} style={styles.image} contentFit="cover" />

        {/* Linear Gradient for High Text Contrast */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
          style={styles.gradient}
        />

        {/* Action Stamps */}
        <Animated.View style={[styles.stamp, styles.likeStamp, { borderColor: theme.success }, likeStampStyle]}>
          <ThemedText style={[styles.likeText, { color: theme.success }]}>LIKE</ThemedText>
        </Animated.View>

        <Animated.View style={[styles.stamp, styles.nopeStamp, { borderColor: theme.accent }, nopeStampStyle]}>
          <ThemedText style={[styles.nopeText, { color: theme.accent }]}>NOPE</ThemedText>
        </Animated.View>

        {/* Floating Details absolute positioned on top of the Gradient */}
        <View style={styles.infoContainer}>
          <ThemedText type="subtitle" themeColor="textOnDark" style={styles.nameAge}>
            {profile.name}, {profile.age}
          </ThemedText>
          <ThemedText type="default" themeColor="textOnDarkSecondary" numberOfLines={2} style={styles.bio}>
            {profile.bio}
          </ThemedText>

          <View style={styles.interests}>
            {profile.interests.slice(0, 3).map((interest) => (
              <View key={interest} style={[styles.interestTag, { backgroundColor: theme.tagBackgroundOnDark }]}>
                <ThemedText type="small" themeColor="textOnDark" style={styles.interestText}>
                  {interest}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.large,
    borderWidth: 1,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.four,
    zIndex: 10,
  },
  nameAge: {
    fontWeight: '800',
  },
  bio: {
    marginTop: Spacing.one,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    marginTop: Spacing.three,
  },
  interestTag: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.medium,
  },
  interestText: {
    fontWeight: '600',
  },
  stamp: {
    position: 'absolute',
    top: 40,
    borderWidth: 4,
    borderRadius: Radius.small,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    transform: [{ rotate: '-15deg' }],
    zIndex: 20,
  },
  likeStamp: {
    left: 30,
  },
  nopeStamp: {
    right: 30,
    transform: [{ rotate: '15deg' }],
  },
  likeText: {
    fontSize: 32,
    fontWeight: '800',
  },
  nopeText: {
    fontSize: 32,
    fontWeight: '800',
  },
});
