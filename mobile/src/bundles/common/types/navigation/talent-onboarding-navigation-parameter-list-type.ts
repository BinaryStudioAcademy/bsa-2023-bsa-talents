import { type TalentOnboardingScreenName } from '~/bundles/common/enums/enums';

import { type TalentOnboardingRouteProperties } from './talent-onboarding-navigation-properties.type';

type TalentOnboardingNavigationParameterList = {
    [TalentOnboardingScreenName.PROFILE]: TalentOnboardingRouteProperties;
    [TalentOnboardingScreenName.BSA_BADGES]: TalentOnboardingRouteProperties;
    [TalentOnboardingScreenName.SKILLS_AND_PROJECTS]: TalentOnboardingRouteProperties;
    [TalentOnboardingScreenName.CV_AND_CONTACTS]: TalentOnboardingRouteProperties;
    [TalentOnboardingScreenName.PREVIEW]: TalentOnboardingRouteProperties;
};
export { type TalentOnboardingNavigationParameterList };
