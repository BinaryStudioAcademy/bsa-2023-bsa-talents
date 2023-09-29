/* eslint-disable no-console */
import { type ValueOf } from '~/bundles/common/types/types.js';

import { StepsRoute } from '../../enums/enums.js';

const getNextStep = (step: ValueOf<typeof StepsRoute> | null): string => {
    if (!step) {
        return StepsRoute.STEP_01;
    }

    const steps = Object.values(StepsRoute);
    const stepIndex = steps.indexOf(step);
    const stepNumber = stepIndex + 1;

    console.log('stepNumber', stepNumber);

    if (steps.length === stepNumber) {
        return StepsRoute.STEP_05;
    }

    const slug = `STEP_0${stepNumber + 1}` as keyof typeof StepsRoute;

    return StepsRoute[slug];
};

export { getNextStep };
