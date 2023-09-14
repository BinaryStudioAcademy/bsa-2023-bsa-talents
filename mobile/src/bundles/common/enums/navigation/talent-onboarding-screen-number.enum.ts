import { type ValueOf } from '~/bundles/common/types/types';

import { CompletedTalentOnboardingStep } from './completed-talent-onboarding-step.enum';
import { TalentOnboardingScreenName } from './talent-onboarding-screen-name.enum';

const TalentOnboardingScreenNumber: Record<
    ValueOf<typeof TalentOnboardingScreenName>,
    number
> = {
    [TalentOnboardingScreenName.PROFILE]: 1,
    [TalentOnboardingScreenName.BSA_BADGES]: 2,
    [TalentOnboardingScreenName.SKILLS_AND_PROJECTS]: 3,
    [TalentOnboardingScreenName.CV_AND_CONTACTS]: 4,
    [TalentOnboardingScreenName.PREVIEW]: 5,
} as const;

const TalentOnboardingScreenNumberByStep: Record<
    ValueOf<typeof CompletedTalentOnboardingStep>,
    number
> = {
    [CompletedTalentOnboardingStep.Profile]: 1,
    [CompletedTalentOnboardingStep[TalentOnboardingScreenName.BSA_BADGES]]: 2,
    [CompletedTalentOnboardingStep[
        TalentOnboardingScreenName.SKILLS_AND_PROJECTS
    ]]: 3,
    [CompletedTalentOnboardingStep[
        TalentOnboardingScreenName.CV_AND_CONTACTS
    ]]: 4,
    [CompletedTalentOnboardingStep.Preview]: 5,
};

export { TalentOnboardingScreenNumber, TalentOnboardingScreenNumberByStep };
