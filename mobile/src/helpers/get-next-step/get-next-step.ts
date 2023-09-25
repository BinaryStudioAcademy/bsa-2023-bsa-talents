import {
    CompletedTalentOnboardingStep,
    type TalentOnboardingScreenName,
} from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

const INDEX = 1;
const NEGATIVE_INDEX = -1;

const getNextStep = (currentStep: string): string => {
    const completedStepToScreen = Object.fromEntries(
        Object.entries(CompletedTalentOnboardingStep).map(
            ([screenName, step]) => [step, screenName],
        ),
    );
    const currentIndex = Object.keys(completedStepToScreen).indexOf(
        currentStep,
    );
    if (
        currentIndex !== NEGATIVE_INDEX &&
        currentIndex < Object.keys(completedStepToScreen).length - INDEX
    ) {
        const nextStepName = Object.keys(completedStepToScreen)[
            currentIndex + INDEX
        ];
        return completedStepToScreen[nextStepName] as ValueOf<
            typeof TalentOnboardingScreenName
        >;
    }
    return '';
};

export { getNextStep };
