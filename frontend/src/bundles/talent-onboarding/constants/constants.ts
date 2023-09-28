import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

const EMPTY_FILE_COUNT = 0;
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
const PLURAL_YEARS = 1.5;
const PREVIEW_CHAR_LIMIT = 200;

const STEP_NUMBER_FROM_ROUTE = Object.fromEntries(
    Object.entries(StepsRoute)
        .map((x) => x.reverse())
        .map(([key, value]) => [key, Number(value.slice(LAST_TWO_CHARS))]),
);

export {
    EMPTY_FILE_COUNT,
    FIRST_ELEMENT,
    PLURAL_YEARS,
    PREVIEW_CHAR_LIMIT,
    STEP_NUMBER_FROM_ROUTE,
    STEPS_NUMBER,
    StepsList,
};
