import { Steps } from '../../../enums/enums.js';

const stepOne = 1;
const stepsNumber = 5;

const StepRoutes = Object.fromEntries(
    Object.entries(Steps).map(([key, value]) => [
        key,
        value.toLowerCase().replaceAll(' ', '-'),
    ]),
) as { [K in keyof typeof Steps]: string };

export { stepOne, StepRoutes, stepsNumber };
