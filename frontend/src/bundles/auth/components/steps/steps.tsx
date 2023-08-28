import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';

import styles from './styles.module.scss';

const Steps: React.FC = () => {
    const steps = [
        {
            title: 'Step 01',
            description: 'Profile',
        },
        {
            title: 'Step 02',
            description: 'BSA badges',
        },
        {
            title: 'Step 03',
            description: 'Skills and projects',
        },
        {
            title: 'Step 04',
            description: 'CV and contacts',
        },
        {
            title: 'Step 05',
            description: 'Preview',
        },
    ];

    return (
        <Grid item className={styles.stepsWrapper}>
            <ul className={styles.steps}>
                {steps.map((step) => (
                    <li
                        key={step.title}
                        className={getValidClassNames(
                            styles.step,
                            step.title === 'Step 01' && styles.currentStep,
                        )}
                    >
                        <Typography variant="h5" className={styles.title}>
                            {step.title}
                        </Typography>
                        <Typography
                            variant="body1"
                            className={getValidClassNames(
                                styles.description,
                                step.title === 'Step 01' &&
                                    styles.currentStepDescription,
                            )}
                        >
                            {step.description}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Grid>
    );
};

export { Steps };
