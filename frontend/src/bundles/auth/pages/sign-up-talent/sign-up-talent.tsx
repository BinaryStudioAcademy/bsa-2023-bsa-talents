import arrowIcon from '~/assets/img/arrow-right.svg';
import { type Step } from '~/bundles/auth/types/types.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { StepContent, Steps } from '../../components/components.js';
import { firstStep, stepOne } from '../../constants/constants.js';
import styles from './styles.module.scss';

const SignUpTalent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(firstStep);

    // these components only for example how to use it
    // remove them when our real tab components are ready
    const Profile: React.FC = () => <button>Profile</button>;
    const BSABadges: React.FC = () => <button>BSABadges</button>;
    const Skills: React.FC = () => <button>Skills and projects</button>;
    const CV: React.FC = () => <button>CV and contacts</button>;
    const Preview: React.FC = () => <button>Preview</button>;
    // also add our real tab components in stepTabs
    const stepTabs: Step[] = [
        {
            name: 'Step 01',
            description: 'Profile',
            tab: Profile,
        },
        {
            name: 'Step 02',
            description: 'BSA Badges',
            tab: BSABadges,
        },
        {
            name: 'Step 03',
            description: 'Skills and projects',
            tab: Skills,
        },
        {
            name: 'Step 04',
            description: 'CV and contacts',
            tab: CV,
        },
        {
            name: 'Step 05',
            description: 'Preview',
            tab: Preview,
        },
    ];

    const handleNextStep = useCallback((): void => {
        setCurrentStep(currentStep + stepOne);
    }, [currentStep]);
    const handlePreviousStep = useCallback((): void => {
        setCurrentStep(currentStep - stepOne);
    }, [currentStep]);

    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to receive proposals
            </Typography>
            <Grid container className={styles.career}>
                {currentStep < stepTabs.length - stepOne && (
                    <Grid item className={styles.careerContent}>
                        <Typography variant="h2" className={styles.careerTitle}>
                            Let`s get started!
                        </Typography>
                        <Typography
                            variant="h5"
                            className={styles.careerDescription}
                        >
                            Hi! If you are looking for your next career
                            adventure - we`re here to help your succeed. We look
                            forward to working with you.
                        </Typography>
                        <img
                            src={arrowIcon}
                            className={styles.icon}
                            alt="arrow icon"
                        />
                    </Grid>
                )}
                <Grid item xs className={styles.registration}>
                    {currentStep < stepTabs.length - stepOne && (
                        <Steps currentStep={currentStep} stepTabs={stepTabs} />
                    )}
                    <StepContent
                        currentStep={currentStep}
                        onNextStep={handleNextStep}
                        onPreviousStep={handlePreviousStep}
                        stepTabs={stepTabs}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { SignUpTalent };
