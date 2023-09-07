import arrowIcon from '~/assets/img/arrow-right.svg';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    StepContent,
    Steps,
} from '~/bundles/talent-onboarding/components/components.js';
import {
    FIRST_ELEMENT,
    STEP_NUMBER_FROM_ROUTE,
    STEP_ONE,
    STEP_ROUTES,
    STEPS_NUMBER,
} from '~/bundles/talent-onboarding/constants/constants.js';
import { getStepRoute } from '~/bundles/talent-onboarding/helpers/helpers.js';

import styles from './styles.module.scss';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [currentStep, setCurrentStep] = useState<number>(() => {
        const slugs = Object.keys(STEP_NUMBER_FROM_ROUTE);
        const slug =
            slugs.find((slug) => location.pathname.endsWith(slug)) ??
            slugs[FIRST_ELEMENT];
        return STEP_NUMBER_FROM_ROUTE[slug];
    });

    const handleNextStep = useCallback((): void => {
        setCurrentStep(currentStep + STEP_ONE);

        const nextStepPath =
            STEP_ROUTES[
                `STEP_0${currentStep + STEP_ONE}` as keyof typeof STEP_ROUTES
            ];

        navigate(getStepRoute(nextStepPath));
    }, [currentStep, navigate]);

    const handlePreviousStep = useCallback((): void => {
        setCurrentStep(currentStep - STEP_ONE);

        const previousStepPath =
            STEP_ROUTES[
                `STEP_0${currentStep - STEP_ONE}` as keyof typeof STEP_ROUTES
            ];

        navigate(getStepRoute(previousStepPath));
    }, [currentStep, navigate]);

    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to receive proposals
            </Typography>
            <Grid container className={styles.career}>
                {currentStep < STEPS_NUMBER && (
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
                    {currentStep < STEPS_NUMBER && (
                        <Steps currentStep={currentStep} />
                    )}
                    <StepContent
                        currentStep={currentStep}
                        onNextStep={handleNextStep}
                        onPreviousStep={handlePreviousStep}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export { Onboarding };
