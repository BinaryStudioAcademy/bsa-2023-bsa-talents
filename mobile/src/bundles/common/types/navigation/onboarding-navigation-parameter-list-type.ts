import { type OnboardingScreenName } from '~/bundles/common/enums/enums';

import { type OnboardingRouteProperties } from './navigation';

type OnboardingNavigationParameterList = {
    [OnboardingScreenName.PROFILE]: OnboardingRouteProperties;
    [OnboardingScreenName.BSA_BADGES]: OnboardingRouteProperties;
    [OnboardingScreenName.SKILLS_AND_PROJECTS]: OnboardingRouteProperties;
    [OnboardingScreenName.CV_AND_CONTACTS]: OnboardingRouteProperties;
    [OnboardingScreenName.PREVIEW]: OnboardingRouteProperties;
};
export { type OnboardingNavigationParameterList };
