import { type OnboardingStepState } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type StepState = ValueOf<typeof OnboardingStepState>;

type OnboardingRouteProperties = {
    stepState: StepState;
};

export { type OnboardingRouteProperties };
