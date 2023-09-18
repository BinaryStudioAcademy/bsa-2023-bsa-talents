const getStepRoute = (step: string, role: string): string =>
    `/${role}/my/${step}`;

export { getStepRoute };
