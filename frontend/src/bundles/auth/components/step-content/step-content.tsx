import { type Step } from '~/bundles/auth/types/types.js';
import {
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

import { firstStep } from '../../constants/constants.js';
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
                <Grid className={styles.stepButtons}>
                    <Button
                        onClick={onPreviousStep}
                        label="Back"
                        variant={
                            currentStep === firstStep ? 'contained' : 'outlined'
                        }
                        className={styles.buttonBack}
                        disabled={currentStep === firstStep}
                    />
                    <Button
                        onClick={onNextStep}
                        label="Next"
                        variant="contained"
                        className={styles.buttonNext}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { StepContent };
