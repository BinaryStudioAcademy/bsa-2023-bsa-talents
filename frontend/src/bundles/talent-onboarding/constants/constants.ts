import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

const FIRST_ELEMENT = 0;
const LAST_TWO_CHARS = -2;
const StepsList = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
} as const;

const STEPS_NUMBER = 5;

const STEP_NUMBER_FROM_ROUTE = Object.fromEntries(
    Object.entries(StepsRoute)
        .map((x) => x.reverse())
        .map(([key, value]) => [key, Number(value.slice(LAST_TWO_CHARS))]),
);

export { FIRST_ELEMENT, STEP_NUMBER_FROM_ROUTE, STEPS_NUMBER, StepsList };
