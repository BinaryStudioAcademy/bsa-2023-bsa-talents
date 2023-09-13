import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type ScreenName = ValueOf<typeof TalentOnboardingScreenName>;

const STEP = 1;

const screenNames = Object.keys(
    TalentOnboardingScreenNumber,
) as (keyof typeof TalentOnboardingScreenName)[];

const getPreviousStepTitle = (currentStep: number): ScreenName | undefined => {
    const screenName = screenNames.find(
        (key) =>
            TalentOnboardingScreenNumber[key as ScreenName] ===
            currentStep - STEP,
    );

    return screenName as ScreenName;
};

const getNextStepTitle = (currentStep: number): ScreenName | undefined => {
    const screenName = screenNames.find(
        (key) =>
            TalentOnboardingScreenNumber[key as ScreenName] ===
            currentStep + STEP,
    );

    return screenName as ScreenName;
};

export { getNextStepTitle, getPreviousStepTitle };
