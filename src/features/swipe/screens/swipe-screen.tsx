import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Radius, Spacing } from '@/constants/theme';
import { FlickButton } from '@/shared/components/flick-button';
import { ThemedText } from '@/shared/components/themed-text';
import { ThemedView } from '@/shared/components/themed-view';
import { MOCK_PROFILES } from '@/shared/data/profiles';
import { useTheme } from '@/shared/hooks/use-theme';
import { SwipeCard } from '../components/swipe-card';

export function SwipeScreen() {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProfile = currentIndex < MOCK_PROFILES.length ? MOCK_PROFILES[currentIndex] : null;
  const nextProfile = currentIndex + 1 < MOCK_PROFILES.length ? MOCK_PROFILES[currentIndex + 1] : null;

  const handleSwipe = (direction: 'left' | 'right') => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handleCardPress = (id: string) => {
    router.push(`/profile/${id}`);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="subtitle" themeColor="accent" style={styles.headerLogo}>
            Flick
          </ThemedText>
        </View>

        {/* Card Stack Deck */}
        <View style={styles.deckContainer}>
          {currentProfile ? (
            <View style={styles.stackWrapper}>
              {/* Background card underlay | appears behind the current profile */}
              {nextProfile && (
                <View style={[styles.cardUnderlay, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}>
                  <Image source={nextProfile.image} style={styles.underlayImage} contentFit="cover" />
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                    style={styles.underlayGradient}
                  />
                  <View style={styles.underlayInfo}>
                    <ThemedText type="subtitle" themeColor="textOnDark" style={styles.underlayNameAge}>
                      {nextProfile.name}, {nextProfile.age}
                    </ThemedText>
                    <ThemedText type="default" themeColor="textOnDarkSecondary" numberOfLines={2} style={styles.underlayBio}>
                      {nextProfile.bio}
                    </ThemedText>
                  </View>
                </View>
              )}

              {/* Active top gestured card */}
              <SwipeCard
                key={currentProfile.id}
                profile={currentProfile}
                onSwipeLeft={() => handleSwipe('left')}
                onSwipeRight={() => handleSwipe('right')}
                onPress={() => handleCardPress(currentProfile.id)}
              />
            </View>
          ) : (
            /* Finished Stack state */
            <View style={[styles.finishedCard, { backgroundColor: theme.backgroundElement }]}>
              <ThemedText type="subtitle" style={styles.finishedTitle}>
                No More Matches
              </ThemedText>
              <ThemedText type="default" themeColor="textSecondary" style={styles.finishedSubtitle}>
                Check back later or reset to start over.
              </ThemedText>
              
              <FlickButton
                onPress={handleReset}
                title="Reset Stack"
              />
            </View>
          )}
        </View>

        {/* Subtle Swipe Guidance (Only visible when active cards exist) */}
        {currentProfile && (
          <View style={styles.guidanceContainer}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.guidanceText}>
              ← Swipe Left to Pass     •     Swipe Right to Like →
            </ThemedText>
          </View>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  header: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLogo: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  deckContainer: {
    flex: 1,
    marginVertical: Spacing.three,
    justifyContent: 'center',
  },
  stackWrapper: {
    flex: 1,
    position: 'relative',
  },
  cardUnderlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: Radius.large,
    borderWidth: 1,
    transform: [{ scale: 0.95 }, { translateY: Spacing.two }],
    opacity: 0.9,
    overflow: 'hidden',
  },
  underlayImage: {
    ...StyleSheet.absoluteFill,
  },
  underlayGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
  },
  underlayInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.four,
    zIndex: 10,
  },
  underlayNameAge: {
    fontWeight: '800',
  },
  underlayBio: {
    marginTop: Spacing.one,
  },
  finishedCard: {
    flex: 1,
    borderRadius: Radius.large,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.five,
    gap: Spacing.two,
  },
  finishedTitle: {
    fontWeight: '800',
    textAlign: 'center',
  },
  finishedSubtitle: {
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  resetButton: {
    height: 50,
    paddingHorizontal: Spacing.five,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guidanceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.two,
    marginTop: Spacing.two,
  },
  guidanceText: {
    letterSpacing: 0.5,
    fontWeight: '500',
    textAlign: 'center',
  },
});
