import { type ValueOf } from '~/bundles/common/types/types';

import { OnboardingScreenName } from './onboarding-screen-name.enum';

const OnboardingScreenNumber: Record<
    ValueOf<typeof OnboardingScreenName>,
    number
> = {
    [OnboardingScreenName.PROFILE]: 1,
    [OnboardingScreenName.BSA_BADGES]: 2,
    [OnboardingScreenName.SKILLS_PROJECTS]: 3,
    [OnboardingScreenName.CV_CONTACTS]: 4,
    [OnboardingScreenName.PREVIEW]: 5,
} as const;

export { OnboardingScreenNumber };
