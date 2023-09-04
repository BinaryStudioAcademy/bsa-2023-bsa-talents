import { Steps } from '~/bundles/talent-onboarding/enums/enums.js';

const STEP_ONE = 1;
const STEPS_NUMBER = 5;

const STEP_ROUTES = Object.fromEntries(
    Object.entries(Steps).map(([key, value]) => [
        key,
        value.toLowerCase().replaceAll(' ', '-'),
    ]),
) as { [K in keyof typeof Steps]: string };

export { STEP_ONE, STEP_ROUTES, STEPS_NUMBER };
