import { stepOne } from '~/bundles/auth/components/sign-up-content/constants/constants.js';

class StepService {
    public get(): number {
        const stepNumber = localStorage.getItem('bt-step');
        return stepNumber === null ? stepOne : JSON.parse(stepNumber);
    }

    public set(stepNumber: number): void {
        localStorage.setItem('bt-step', JSON.stringify(stepNumber));
    }
}

export { StepService };
