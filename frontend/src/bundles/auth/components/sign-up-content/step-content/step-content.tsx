import { type Step } from '~/bundles/auth/types/types.js';
import {
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import { firstStep, stepOne } from '../../../constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    currentStep: number;
    onNextStep: () => void;
    onPreviousStep: () => void;
    stepTabs: Step[];
};

const StepContent: React.FC<Properties> = ({
    currentStep,
    onNextStep,
    onPreviousStep,
    stepTabs,
}) => {
    const StepTab = stepTabs[currentStep].tab;
    return (
        <Grid item className={styles.stepContent}>
            <Grid className={styles.stepTitle}>
                <Typography variant="body1" className={styles.stepName}>
                    {stepTabs[currentStep].description}
                </Typography>
                <Typography variant="caption" className={styles.stepNumber}>
                    {stepTabs[currentStep].name}
                </Typography>
            </Grid>
            <Grid className={styles.stepBody}>
                <Grid>{<StepTab />}</Grid>
                <Grid
                    className={getValidClassNames(
                        currentStep === stepTabs.length - stepOne
                            ? styles.wideStepButtons
                            : styles.stepButtons,
                    )}
                >
                    {/* for now I`ve just prevented working these funcs when user reach step 5
                 when we have next part of app we should change it (onClick) */}
                    <Button
                        onClick={
                            currentStep === stepTabs.length - stepOne
                                ? undefined
                                : onPreviousStep
                        }
                        label={
                            currentStep === stepTabs.length - stepOne
                                ? 'Save without publishing'
                                : 'Back'
                        }
                        variant={
                            currentStep === firstStep ? 'contained' : 'outlined'
                        }
                        className={styles.buttonBack}
                        disabled={currentStep === firstStep}
                    />
                    {/* for now I`ve just prevented working these funcs when user reach step 5
                 when we have next part of app we should change it (onClick) */}
                    <Button
                        onClick={
                            currentStep === stepTabs.length - stepOne
                                ? undefined
                                : onNextStep
                        }
                        label={
                            currentStep === stepTabs.length - stepOne
                                ? 'Publish now'
                                : 'Next'
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
