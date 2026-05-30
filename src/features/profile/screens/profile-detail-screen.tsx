import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';

import { ThemedText } from '@/shared/components/themed-text';
import { ThemedView } from '@/shared/components/themed-view';
import { Spacing } from '@/constants/theme';

export function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const handleClose = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="title">Profile {id}</ThemedText>

        <Pressable onPress={handleClose} style={styles.closeButton}>
          <ThemedText style={styles.closeButtonText}>Close</ThemedText>
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
  closeButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    backgroundColor: '#000000',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
