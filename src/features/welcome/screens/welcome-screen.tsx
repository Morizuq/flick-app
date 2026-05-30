import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { FlickButton } from '@/shared/components/flick-button';
import { ThemedText } from '@/shared/components/themed-text';
import { ThemedView } from '@/shared/components/themed-view';

export function WelcomeScreen() {
  const handleStart = () => {
    router.push('/swipe');
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.content}>
          <ThemedText type="title">
            Flick
          </ThemedText>
          <ThemedText type="default" style={styles.subtitle}>
            A minimalistic dating app prototype.
          </ThemedText>
        </ThemedView>

        <FlickButton 
          title="Start Swiping" 
          onPress={handleStart} 
        />
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
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: Spacing.six,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.two,
  },
  subtitle: {
    textAlign: 'center',
    color: '#8E8E93',
  },
});
