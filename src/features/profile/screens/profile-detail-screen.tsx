import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Radius, Spacing } from '@/constants/theme';
import { ThemedText } from '@/shared/components/themed-text';
import { ThemedView } from '@/shared/components/themed-view';
import { MOCK_PROFILES } from '@/shared/data/profiles';
import { useTheme } from '@/shared/hooks/use-theme';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [isLiking, setIsLiking] = useState(false);

  const profile = MOCK_PROFILES.find((p) => p.id === id);

  const handleClose = () => {
    router.back();
  };

  const handleAction = () => {
    router.back();
  };

  const handleLike = () => {
    if (!profile || isLiking) return;
    setIsLiking(true);
    setTimeout(() => {
      setIsLiking(false);
      Alert.alert(
        "It's a Match! 🎉",
        `You and ${profile.name} have liked each other!`,
        [
          {
            text: "Send Message",
            onPress: () => {
              Alert.alert("Chat Initialized", `Chat room created with ${profile.name}!`);
            },
          },
          {
            text: "Keep Swiping",
            onPress: () => router.back(),
            style: "cancel",
          },
        ]
      );
    }, 1200);
  };

  if (!profile) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText type="subtitle">Profile not found</ThemedText>
        <Pressable
          onPress={handleClose}
          style={[styles.errorButton, { backgroundColor: theme.accent }]}
        >
          <ThemedText style={{ color: theme.buttonTextPrimary, fontWeight: '700' }}>
            Go Back
          </ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const closeButtonSize = Spacing.five + Spacing.two;

  return (
    <ThemedView style={styles.container}>
      {/* Floating Top Header Overlay */}
      <View style={[styles.floatingHeader, { top: Spacing.four }]}>
        <Pressable
          onPress={handleClose}
          style={({ pressed }) => [
            styles.closeButton,
            {
              width: closeButtonSize,
              height: closeButtonSize,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText style={styles.closeText}>✕</ThemedText>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scrollView, { backgroundColor: theme.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image Cover */}
        <View style={styles.imageContainer}>
          <Image source={profile.image} style={styles.image} contentFit="cover" />
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'transparent', 'rgba(0, 0, 0, 0.5)']}
            style={styles.imageGradient}
          />
        </View>

        {/* Details Container */}
        <View style={[styles.detailsContainer, { backgroundColor: theme.background }]}>
          {/* Header Info (Name & Age) */}
          <View style={styles.headerInfo}>
            <ThemedText type="h2" style={{ color: theme.text }}>
              {profile.name}, {profile.age}
            </ThemedText>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border }]} />

          {/* About Section */}
          <View style={styles.section}>
            <ThemedText type="h3" style={[styles.sectionTitle, { color: theme.text }]}>
              About
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.bioText}>
              {profile.bio}
            </ThemedText>
          </View>

          {/* Interests Section */}
          <View style={styles.section}>
            <ThemedText type="h3" style={[styles.sectionTitle, { color: theme.text }]}>
              Interests
            </ThemedText>
            <View style={styles.interestsGrid}>
              {profile.interests.map((interest) => (
                <View
                  key={interest}
                  style={[
                    styles.interestTag,
                    {
                      backgroundColor: theme.backgroundElement,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <ThemedText type="bodySmallBold" style={{ color: theme.textSecondary }}>
                    {interest}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          {/* Spacer to push content above floating bottom bar */}
          <View style={{ height: Spacing.six * 2.5 }} />
        </View>
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={[styles.bottomActions, { bottom: insets.bottom + Spacing.four }]}>
        {/* Pass Button */}
        <Pressable
          onPress={handleAction}
          style={({ pressed }) => [
            styles.actionButton,
            styles.passButton,
            {
              backgroundColor: theme.backgroundElement,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <ThemedText style={[styles.passIcon, { color: theme.textSecondary }]}>✕</ThemedText>
        </Pressable>

        {/* Like Button */}
        <Pressable
          onPress={handleLike}
          disabled={isLiking}
          style={({ pressed }) => [
            styles.actionButton,
            styles.likeButton,
            {
              backgroundColor: theme.accent,
              shadowColor: theme.accent,
              opacity: pressed || isLiking ? 0.8 : 1,
            },
          ]}
        >
          {isLiking ? (
            <ActivityIndicator size="small" color={theme.buttonTextPrimary} />
          ) : (
            <ThemedText style={[styles.likeIcon, { color: theme.buttonTextPrimary }]}>&hearts;</ThemedText>
          )}
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.four,
    gap: Spacing.three,
  },
  errorButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.full,
  },
  floatingHeader: {
    position: 'absolute',
    left: Spacing.four,
    right: Spacing.four,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  closeButton: {
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: Spacing.three + Spacing.half, // 16 + 2 = 18px
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
  },
  imageContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.55,
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFill,
  },
  imageGradient: {
    ...StyleSheet.absoluteFill,
  },
  detailsContainer: {
    flex: 1,
    marginTop: -Radius.large,
    borderTopLeftRadius: Radius.large,
    borderTopRightRadius: Radius.large,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
  },
  headerInfo: {
    marginBottom: Spacing.three,
  },
  divider: {
    height: 1,
    width: '100%',
    marginVertical: Spacing.three,
  },
  section: {
    marginBottom: Spacing.four,
  },
  sectionTitle: {
    fontWeight: '700',
    marginBottom: Spacing.two,
  },
  bioText: {
    lineHeight: Spacing.three + Spacing.two, // 16 + 8 = 24px
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  interestTag: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one,
    borderRadius: Radius.medium,
    borderWidth: 1,
    marginTop: Spacing.two
  },
  bottomActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.four,
    zIndex: 90,
  },
  actionButton: {
    width: Spacing.six,
    height: Spacing.six,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  passButton: {
    borderWidth: 1,
  },
  likeButton: {
    shadowColor: Colors.light.accent,
  },
  passIcon: {
    fontSize: Spacing.three + Spacing.half, // 18px
    fontWeight: '800',
  },
  likeIcon: {
    fontSize: Spacing.four,
  },
});
