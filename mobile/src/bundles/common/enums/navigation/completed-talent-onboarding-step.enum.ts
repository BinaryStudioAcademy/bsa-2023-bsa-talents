import { TalentOnboardingScreenName } from '~/bundles/common/enums/navigation/talent-onboarding-screen-name.enum';
import { type ValueOf } from '~/bundles/common/types/types';

const CompletedTalentOnboardingStep: Record<
    ValueOf<typeof TalentOnboardingScreenName>,
    string
> = {
    [TalentOnboardingScreenName.PROFILE]: 'profile',
    [TalentOnboardingScreenName.BSA_BADGES]: 'bsa-badges',
    [TalentOnboardingScreenName.SKILLS_AND_PROJECTS]: 'skills-and-projects',
    [TalentOnboardingScreenName.CV_AND_CONTACTS]: 'cv-and-contacts',
    [TalentOnboardingScreenName.PREVIEW]: 'preview',
} as const;

export { CompletedTalentOnboardingStep };
