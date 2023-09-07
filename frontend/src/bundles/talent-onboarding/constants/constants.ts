import { Steps } from '~/bundles/talent-onboarding/enums/enums.js';

const FIRST_ELEMENT = 0;
const LAST_TWO_CHARS = -2;
const STEP_ONE = 1;
const STEPS_NUMBER = 5;

const STEP_ROUTES = Object.fromEntries(
    Object.entries(Steps).map(([key, value]) => [
        key,
        value.toLowerCase().replaceAll(' ', '-'),
    ]),
) as { [K in keyof typeof Steps]: string };

const STEP_NUMBER_FROM_ROUTE = Object.fromEntries(
    Object.entries(STEP_ROUTES)
        .map((x) => x.reverse())
        .map(([key, value]) => [key, Number(value.slice(LAST_TWO_CHARS))]),
);

export {
    FIRST_ELEMENT,
    STEP_NUMBER_FROM_ROUTE,
    STEP_ONE,
    STEP_ROUTES,
    STEPS_NUMBER,
};