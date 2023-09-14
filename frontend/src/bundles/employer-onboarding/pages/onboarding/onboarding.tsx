import { Grid, Typography } from '~/bundles/common/components/components.js';

import { OnboardingForm } from '../../components/onboarding-form/onboarding-form.js';
import styles from './styles.module.scss';

const Onboarding: React.FC = () => {
    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to see talents
            </Typography>
            <Grid container className={styles.onboarding}>
                <OnboardingForm />
            </Grid>
        </Grid>
    );
};

export { Onboarding };