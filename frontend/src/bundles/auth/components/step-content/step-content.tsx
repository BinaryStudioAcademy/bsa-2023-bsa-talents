import {
    Button,
    Grid,
    Typography,
} from '~/bundles/common/components/components.js';

import styles from './styles.module.scss';

type Properties = {
    stepContent: React.ReactNode;
};

const StepContent: React.FC<Properties> = ({ stepContent }) => {
    return (
        <Grid item className={styles.stepContent}>
            <Grid className={styles.stepTitle}>
                <Typography variant="body1" className={styles.stepName}>
                    Profile
                </Typography>
                <Typography variant="caption" className={styles.stepNumber}>
                    Step 01
                </Typography>
            </Grid>
            <Grid className={styles.stepBody}>
                <Grid>{stepContent}</Grid>
                <Grid className={styles.stepButtons}>
                    <Button
                        label="Back"
                        variant="contained"
                        className={styles.buttonBack}
                        disabled
                    />
                    <Button
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
