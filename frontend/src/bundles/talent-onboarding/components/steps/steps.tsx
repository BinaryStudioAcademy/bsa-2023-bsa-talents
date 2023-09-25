import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

import { StepsList } from '../../constants/constants.js';
import { formatStepLabels } from '../../helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
    currentStep: number;
};

const Steps: React.FC<Properties> = ({ currentStep }) => {
    const getClassNameForStep = (step: {
        stepName: string;
        stepIndex: number;
        baseClass: string;
        activeClass: string;
        passedStepClass?: string;
    }): string => {
        return getValidClassNames(
            step.baseClass,
            step.stepName.endsWith(String(currentStep)) && step.activeClass,
            step.stepIndex < currentStep && step.passedStepClass,
        );
    };
    return (
        <Grid item className={styles.stepsWrapper}>
            <ul className={styles.steps}>
                {Object.entries(StepsRoute).map(([step, stepName], index) => (
                    <li
                        key={step}
                        className={getClassNameForStep({
                            stepName: step,
                            stepIndex: index + StepsList.ONE,
                            baseClass: styles.step,
                            activeClass: styles.currentStep,
                            passedStepClass: styles.passedStep,
                        })}
                    >
                        <Typography variant="h5" className={styles.title}>
                            {step.replace('_', ' ')}
                        </Typography>
                        <Typography
                            variant="body1"
                            className={getClassNameForStep({
                                stepName: step,
                                stepIndex: index,
                                baseClass: styles.description,
                                activeClass: styles.currentStepDescription,
                            })}
                        >
                            {formatStepLabels(stepName)}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Grid>
    );
};

export { Steps };
