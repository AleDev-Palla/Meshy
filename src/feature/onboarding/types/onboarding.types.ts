export type OnboardingIllustrationKind = 'NONE' | 'HELP' | 'CONTACTS' | 'ALERTS' | 'COMMUNITY';

export type OnboardingPageItem = {
  eyebrow: string;
  title: string;
  body: string;
  action: string;
  illustration: OnboardingIllustrationKind;
  secondaryBody?: string;
  note?: string;
};
