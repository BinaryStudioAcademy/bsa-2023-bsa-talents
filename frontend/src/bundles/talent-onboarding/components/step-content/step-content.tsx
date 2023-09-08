import {
    Button,
    Grid,
    RouterOutlet,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { Steps } from '~/bundles/talent-onboarding/enums/enums.js';

import { STEP_ONE, STEPS_NUMBER } from '../../constants/constants.js';
import { useFormSubmit } from '../../context/context.js';
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
    const { submitForm } = useFormSubmit();

    const handleNextClick = async (): Promise<void> => {
        if (submitForm) {
            const success = await submitForm();
            if (success) {
                onNextStep();
            }
        }
    };

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
                <Grid className={styles.stepOutlet}>{<RouterOutlet />}</Grid>
                <Grid
                    className={getValidClassNames(
                        currentStep === STEPS_NUMBER
                            ? styles.wideStepButtons
                            : styles.stepButtons,
                    )}
                >
                    <Button
                        onClick={
                            currentStep === STEPS_NUMBER
                                ? undefined
                                : onPreviousStep
                        }
                        label={
                            currentStep === STEPS_NUMBER
                                ? 'Save without publishing'
                                : 'Back'
                        }
                        variant={
                            currentStep === STEP_ONE ? 'contained' : 'outlined'
                        }
                        className={getValidClassNames(
                            styles.button,
                            styles.buttonBack,
                        )}
                        disabled={currentStep === STEP_ONE}
                    />
                    <Button
                        onClick={
                            currentStep === STEPS_NUMBER
                                ? undefined
                                : handleNextClick
                        }
                        label={
                            currentStep === STEPS_NUMBER
                                ? 'Publish now'
                                : 'Next'
                        }
                        variant="contained"
                        className={getValidClassNames(
                            styles.button,
                            styles.buttonNext,
                        )}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { StepContent };
