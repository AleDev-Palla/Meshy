import { router } from 'expo-router';
import { useState } from 'react';

import { MESHY_ONBOARDING_PAGES } from '@/feature/onboarding/constans/onboarding.constans';
import { useOnboardingStore } from '@/feature/onboarding/states/onboarding.state';

export function useOnboarding() {
  const [pageIndex, setPageIndex] = useState(0);
  const completed = useOnboardingStore((s) => s.completed);
  const setCompleted = useOnboardingStore((s) => s.setCompleted);

  const pages = MESHY_ONBOARDING_PAGES;
  const safeIndex = Math.min(Math.max(pageIndex, 0), pages.length - 1);
  const currentPage = pages[safeIndex];
  const canGoBack = safeIndex > 0;
  const isLastPage = safeIndex === pages.length - 1;

  const goBack = () => {
    if (canGoBack) {
      setPageIndex(safeIndex - 1);
    }
  };

  const goNext = () => {
    if (isLastPage) {
      setCompleted(true);
      router.replace('/');
    } else {
      setPageIndex(safeIndex + 1);
    }
  };

  return {
    pages,
    pageIndex: safeIndex,
    currentPage,
    canGoBack,
    isLastPage,
    completed,
    goBack,
    goNext,
  };
}
