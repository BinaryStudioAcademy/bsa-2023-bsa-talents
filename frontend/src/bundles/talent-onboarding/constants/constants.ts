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

const NOT_NULLABLE_KEY_ARRAY = new Set([
    'notConsidered',
    'preferredLanguages',
    'employmentType',
    'hardSkills',
    'projectLinks',
]);

const NOT_NULLABLE_KEY_STRING = new Set(['fullName', 'linkedinLink', 'phone']);

export {
    FIRST_ELEMENT,
    NOT_NULLABLE_KEY_ARRAY,
    NOT_NULLABLE_KEY_STRING,
    STEP_NUMBER_FROM_ROUTE,
    STEP_ONE,
    STEP_ROUTES,
    STEPS_NUMBER,
};
