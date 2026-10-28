import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useOnboarding } from '@/feature/onboarding/hooks/useOnboarding';
import { OnboardingBrandHeader } from '@/feature/onboarding/components/layouts/OnboardingBrandHeader';
import { OnboardingScene } from '@/feature/onboarding/components/layouts/OnboardingScene';

import { ThemedButton } from '@/components/ui/ThemedButton';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';

export function ViewOnboarding() {
  const { currentPage, canGoBack, goBack, goNext } = useOnboarding();
  const isWelcome = currentPage.illustration === 'NONE';

  return (
    <ThemedView style={styles.root}>
      <SafeAreaView style={styles.safeArea}>
        <OnboardingBrandHeader canGoBack={canGoBack} onBack={goBack} />

        <View style={styles.contentWrapper}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              isWelcome && styles.welcomeScrollContent,
            ]}
            showsVerticalScrollIndicator={false}>
            <ThemedText type="eyebrow" themeColor="secondary" style={styles.eyebrow}>
              {currentPage.eyebrow}
            </ThemedText>

            <ThemedText type={isWelcome ? 'welcome' : 'title'} style={styles.title}>
              {currentPage.title}
            </ThemedText>

            <ThemedText
              type="body"
              themeColor="secondary"
              style={isWelcome ? styles.welcomeBody : styles.body}>
              {currentPage.body}
            </ThemedText>

            {currentPage.secondaryBody ? (
              <ThemedText type="body" style={styles.secondaryBody}>
                {currentPage.secondaryBody}
              </ThemedText>
            ) : null}

            {!isWelcome ? (
              <View style={styles.sceneWrapper}>
                <OnboardingScene kind={currentPage.illustration} />
                {currentPage.note ? (
                  <ThemedText type="caption" themeColor="secondary" style={styles.note}>
                    {currentPage.note}
                  </ThemedText>
                ) : null}
              </View>
            ) : null}
          </ScrollView>
        </View>

        <View style={styles.footer}>
          <ThemedButton
            label={currentPage.action}
            trailingIcon="arrowRight"
            fullWidth
            onPress={goNext}
            style={styles.primaryButton}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 12,
    alignItems: 'center',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 460,
    marginTop: 20,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 12,
  },
  welcomeScrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  eyebrow: {
    opacity: 0.75,
  },
  title: {
    marginTop: 14,
  },
  welcomeBody: {
    marginTop: 28,
  },
  body: {
    marginTop: 16,
  },
  secondaryBody: {
    marginTop: 20,
  },
  sceneWrapper: {
    marginTop: 24,
  },
  note: {
    marginTop: 16,
  },
  footer: {
    width: '100%',
    maxWidth: 460,
    marginTop: 16,
  },
  primaryButton: {
    minHeight: 56,
  },
});
