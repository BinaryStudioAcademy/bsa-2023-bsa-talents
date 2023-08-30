import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { stepOne } from '../../../constants/constants.js';
import { type Step } from '../../../types/types.js';
import styles from './styles.module.scss';

type Properties = {
    currentStep: number;
    stepTabs: Step[];
};

const Steps: React.FC<Properties> = ({ currentStep, stepTabs }) => {
    const getClassNameForStep = (step: {
        stepName: string;
        stepIndex: number;
        baseClass: string;
        activeClass: string;
        passedStepClass?: string;
    }): string => {
        return getValidClassNames(
            step.baseClass,
            step.stepName.endsWith(String(currentStep + stepOne)) &&
                step.activeClass,
            step.stepIndex < currentStep && step.passedStepClass,
        );
    };
    return (
        <Grid item className={styles.stepsWrapper}>
            <ul className={styles.steps}>
                {stepTabs.map((step, index) => (
                    <li
                        key={step.name}
                        className={getClassNameForStep({
                            stepName: step.name,
                            stepIndex: index,
                            baseClass: styles.step,
                            activeClass: styles.currentStep,
                            passedStepClass: styles.passedStep,
                        })}
                    >
                        <Typography variant="h5" className={styles.title}>
                            {step.name}
                        </Typography>
                        <Typography
                            variant="body1"
                            className={getClassNameForStep({
                                stepName: step.name,
                                stepIndex: index,
                                baseClass: styles.description,
                                activeClass: styles.currentStepDescription,
                            })}
                        >
                            {step.description}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Grid>
    );
};

export { Steps };
