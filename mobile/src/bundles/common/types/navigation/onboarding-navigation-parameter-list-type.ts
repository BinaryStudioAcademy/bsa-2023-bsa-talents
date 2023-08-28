import { type OnboardingScreenName } from '~/bundles/common/enums/enums';

type OnboardingNavigationParameterList = {
    [OnboardingScreenName.PROFILE]: { disabled: boolean; isCompleted: boolean };
    [OnboardingScreenName.BSA_BADGES]: {
        disabled: boolean;
        isCompleted: boolean;
    };
    [OnboardingScreenName.SKILLS_AND_PROJECTS]: {
        disabled: boolean;
        isCompleted: boolean;
    };
    [OnboardingScreenName.CV_AND_CONTACTS]: {
        disabled: boolean;
        isCompleted: boolean;
    };
    [OnboardingScreenName.PREVIEW]: { disabled: boolean; isCompleted: boolean };
};
export { type OnboardingNavigationParameterList };
