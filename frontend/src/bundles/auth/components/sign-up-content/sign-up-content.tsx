import arrowIcon from '~/assets/img/arrow-right.svg';
import { Grid, Typography } from '~/bundles/common/components/components.js';

import { StepContent, Steps } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
    stepContent: React.ReactNode;
};

const SignUpContent: React.FC<Properties> = ({ stepContent }) => {
    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to receive proposals
            </Typography>
            <Grid container className={styles.career}>
                <Grid item>
                    <Typography variant="h2" className={styles.careerTitle}>
                        Let`s get started!
                    </Typography>
                    <Typography
                        variant="h5"
                        className={styles.careerDescription}
                    >
                        Hi! If you are looking for your next career adventure -
                        we`re here to help your succeed. We look forward to
                        working with you.
                    </Typography>
                    <img
                        src={arrowIcon}
                        className={styles.icon}
                        alt="arrow icon"
                    />
                </Grid>
                <Grid item xs className={styles.registration}>
                    <Steps />
                    <StepContent stepContent={stepContent} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { SignUpContent };
