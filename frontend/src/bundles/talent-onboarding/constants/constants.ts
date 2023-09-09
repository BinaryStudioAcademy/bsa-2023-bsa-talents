import { Steps } from '~/bundles/talent-onboarding/enums/enums.js';

const FIRST_ELEMENT = 0;
const LAST_TWO_CHARS = -2;
const STEP_ONE = 1;
const STEPS_NUMBER = 5;

const StepKeys = Object.keys(Steps);

const STEP_ROUTES: Record<string, string> = {};
for (const key of StepKeys) {(STEP_ROUTES[key] = Steps[key as keyof typeof Steps]
            .toLowerCase()
            .replaceAll(' ', '-'))
;}

const STEP_NUMBERS: Record<string, number> = {};
for (const key of StepKeys) {
    STEP_NUMBERS[STEP_ROUTES[key]] = Number(key.slice(LAST_TWO_CHARS));
}

export { FIRST_ELEMENT, STEP_NUMBERS, STEP_ONE, STEP_ROUTES, STEPS_NUMBER };
