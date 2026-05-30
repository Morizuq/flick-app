import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { ThemedText } from '@/shared/components/themed-text';
import { ThemedView } from '@/shared/components/themed-view';
import { Spacing } from '@/constants/theme';

export function SwipeScreen() {
  const handleCardPress = () => {
    // Navigate to a dynamic profile path
    router.push('/profile/1');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Swipe Screen</ThemedText>
        
        <Pressable onPress={handleCardPress} style={styles.card}>
          <ThemedText style={styles.cardText}>Tap to View Profile 1</ThemedText>
        </Pressable>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    alignItems: 'center',
    gap: Spacing.four,
  },
  card: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.six,
    backgroundColor: '#FF3B30',
    borderRadius: 24,
  },
  cardText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
