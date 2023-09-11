import { Grid, Typography } from '~/bundles/common/components/components.js';

import { EmployerRegistrationForm } from '../../components/registration-page/employer-registration-form.js';
import styles from './styles.module.scss';

const EmployerRegistration: React.FC = () => {
    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to see talents
            </Typography>
            <Grid container className={styles.registration}>
                <EmployerRegistrationForm />
            </Grid>
        </Grid>
    );
};

export { EmployerRegistration };
