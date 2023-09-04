import {
    type RootScreenName,
    type TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';

type RootNavigationParameterList = {
    [RootScreenName.AUTH_ROOT_ROUTE]: undefined;
    [RootScreenName.MAIN_ROOT_ROUTE]: undefined;
    [RootScreenName.ONBOARDING_ROOT_ROUTE]: undefined;
    [TalentOnboardingScreenName.PROFILE]: undefined;
    [TalentOnboardingScreenName.BSA_BADGES]: undefined;
    [TalentOnboardingScreenName.SKILLS_AND_PROJECTS]: undefined;
    [TalentOnboardingScreenName.CV_AND_CONTACTS]: undefined;
    [TalentOnboardingScreenName.PREVIEW]: undefined;
};

export { type RootNavigationParameterList };
