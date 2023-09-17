import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

const FIRST_ELEMENT = 0;
const LAST_TWO_CHARS = -2;
const STEP_ONE = 1;
const STEP_TWO = 2;
const STEP_THREE = 3;
const STEP_FOUR = 4;
const STEP_FIVE = 5;
const STEPS_NUMBER = 5;

const STEP_NUMBER_FROM_ROUTE = Object.fromEntries(
    Object.entries(StepsRoute)
        .map((x) => x.reverse())
        .map(([key, value]) => [key, Number(value.slice(LAST_TWO_CHARS))]),
);

export {
    FIRST_ELEMENT,
    STEP_FIVE,
    STEP_FOUR,
    STEP_NUMBER_FROM_ROUTE,
    STEP_ONE,
    STEP_THREE,
    STEP_TWO,
    STEPS_NUMBER,
};
