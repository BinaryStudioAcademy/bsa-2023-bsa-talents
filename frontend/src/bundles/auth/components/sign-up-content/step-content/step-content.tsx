import { Steps } from '~/bundles/auth/enums/enums.js';
import {
    Button,
    Grid,
    RouterOutlet,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { stepOne, stepsNumber } from '../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    currentStep: number;
    onNextStep: () => void;
    onPreviousStep: () => void;
};

const StepContent: React.FC<Properties> = ({
    currentStep,
    onNextStep,
    onPreviousStep,
}) => {
    return (
        <Grid item className={styles.stepContent}>
            <Grid className={styles.stepTitle}>
                <Typography variant="body1" className={styles.stepName}>
                    {Steps[`STEP_0${currentStep}` as keyof typeof Steps]}
                </Typography>
                <Typography variant="caption" className={styles.stepNumber}>
                    Step 0{currentStep}
                </Typography>
            </Grid>
            <Grid className={styles.stepBody}>
                <Grid>{<RouterOutlet />}</Grid>
                <Grid
                    className={getValidClassNames(
                        currentStep === stepsNumber
                            ? styles.wideStepButtons
                            : styles.stepButtons,
                    )}
                >
                    {/* for now I`ve just prevented working these funcs when user reach step 5
                 when we have next part of app we should change it (onClick) */}
                    <Button
                        onClick={
                            currentStep === stepsNumber
                                ? undefined
                                : onPreviousStep
                        }
                        label={
                            currentStep === stepsNumber
                                ? 'Save without publishing'
                                : 'Back'
                        }
                        variant={
                            currentStep === stepOne ? 'contained' : 'outlined'
                        }
                        className={styles.buttonBack}
                        disabled={currentStep === stepOne}
                    />
                    {/* for now I`ve just prevented working these funcs when user reach step 5
                 when we have next part of app we should change it (onClick) */}
                    <Button
                        onClick={
                            currentStep === stepsNumber ? undefined : onNextStep
                        }
                        label={
                            currentStep === stepsNumber ? 'Publish now' : 'Next'
                        }
                        variant="contained"
                        className={styles.buttonNext}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { StepContent };
