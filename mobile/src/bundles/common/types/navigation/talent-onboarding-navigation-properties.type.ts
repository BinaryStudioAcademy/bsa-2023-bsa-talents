import { type TalentOnboardingStepState } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type StepState = ValueOf<typeof TalentOnboardingStepState>;

type TalentOnboardingRouteProperties = {
    stepState: StepState;
};

export { type TalentOnboardingRouteProperties };
