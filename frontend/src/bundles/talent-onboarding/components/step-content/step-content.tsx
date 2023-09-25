import {
    Button,
    FormControl,
    Grid,
    RouterOutlet,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';

import { STEPS_NUMBER, StepsList } from '../../constants/constants.js';
import { formatStepLabels } from '../../helpers/helpers.js';
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
            const isSuccessful = await submitForm();
            if (isSuccessful) {
                onNextStep();
            }
        }
    };

    return (
        <Grid item className={styles.stepContent}>
            <Grid
                className={getValidClassNames(
                    styles.stepTitle,
                    currentStep === StepsList.ONE && styles.step1,
                    currentStep === StepsList.TWO && styles.step2,
                    currentStep === StepsList.THREE && styles.step3,
                    currentStep === StepsList.FOUR && styles.step4,
                    currentStep === StepsList.FIVE && styles.step5,
                )}
            >
                <Typography variant="body1" className={styles.stepName}>
                    {formatStepLabels(
                        StepsRoute[
                            `STEP_0${currentStep}` as keyof typeof StepsRoute
                        ],
                    )}
                </Typography>
                <Typography variant="caption" className={styles.stepNumber}>
                    Step 0{currentStep}
                </Typography>
            </Grid>
            <Grid className={styles.stepBody}>
                <Grid className={styles.stepOutlet}>
                    <FormControl
                        className={getValidClassNames(
                            styles.form,
                            currentStep === STEPS_NUMBER ? styles.wideForm : '',
                        )}
                    >
                        {<RouterOutlet />}
                    </FormControl>
                </Grid>
                <Grid
                    className={getValidClassNames(
                        currentStep === STEPS_NUMBER
                            ? styles.wideStepButtons
                            : styles.stepButtons,
                    )}
                >
                    {currentStep !== StepsList.ONE && (
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
                            variant="outlined"
                            className={getValidClassNames(
                                styles.button,
                                styles.buttonBack,
                            )}
                        />
                    )}
                    {currentStep === StepsList.ONE && (
                        <Grid className={styles.buttonPlaceholder} />
                    )}
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
