import { type ValueOf } from '~/bundles/common/types/types';

import { TalentOnboardingScreenName } from './talent-onboarding-screen-name.enum';

const TalentOnboardingScreenNumber: Record<
    ValueOf<typeof TalentOnboardingScreenName>,
    number
> = {
    [TalentOnboardingScreenName.PROFILE]: 1,
    [TalentOnboardingScreenName.BSA_BADGES]: 2,
    [TalentOnboardingScreenName.SKILLS_PROJECTS]: 3,
    [TalentOnboardingScreenName.CV_CONTACTS]: 4,
    [TalentOnboardingScreenName.PREVIEW]: 5,
} as const;

export { TalentOnboardingScreenNumber };
