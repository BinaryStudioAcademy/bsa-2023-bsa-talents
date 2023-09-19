import {
    type TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type ScreenName = ValueOf<typeof TalentOnboardingScreenName>;

const STEP = 1;

const screenNames = Object.keys(TalentOnboardingScreenNumber) as ScreenName[];

const getPreviousStepTitle = (currentStep: number): ScreenName | undefined => {
    const screenName = screenNames.find(
        (key) => TalentOnboardingScreenNumber[key] === currentStep - STEP,
    );

    return screenName as ScreenName;
};

const getNextStepTitle = (currentStep: number): ScreenName | undefined => {
    const screenName = screenNames.find(
        (key) => TalentOnboardingScreenNumber[key] === currentStep + STEP,
    );

    return screenName as ScreenName;
};

export { getNextStepTitle, getPreviousStepTitle };
