import { type AppEnvironmentMobile } from '~/bundles/common/enums/enums';
import { type ValueOf } from '~/bundles/common/types/types';

type StepState = ValueOf<typeof AppEnvironmentMobile>;

type OnboardingRouteProperties = {
    stepState: StepState;
};

export { type OnboardingRouteProperties };
