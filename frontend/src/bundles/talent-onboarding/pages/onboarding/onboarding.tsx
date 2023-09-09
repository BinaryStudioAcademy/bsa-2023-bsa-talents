import arrowIcon from '~/assets/img/arrow-right.svg';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import {
    useCallback,
    useLocation,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { NotFoundPage } from '~/bundles/common/pages/not-found/not-found.js';
import {
    StepContent,
    Steps,
} from '~/bundles/talent-onboarding/components/components.js';
import {
    FIRST_ELEMENT,
    STEP_NUMBERS,
    STEP_ONE,
    STEP_ROUTES,
    STEPS_NUMBER,
} from '~/bundles/talent-onboarding/constants/constants.js';
import { getStepRoute } from '~/bundles/talent-onboarding/helpers/helpers.js';

import { FormSubmitProvider } from '../../context/context.js';
import styles from './styles.module.scss';

const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const slugs = Object.keys(STEP_NUMBERS);
    const slug = slugs.find((slug) => location.pathname.endsWith(slug));

    const [currentStep, setCurrentStep] = useState<number>(() => {
        const slugToNumber = slug ?? slugs[FIRST_ELEMENT];
        return STEP_NUMBERS[slugToNumber];
    });

    const handleNextStep = useCallback((): void => {
        setCurrentStep(currentStep + STEP_ONE);

        const nextStepPath =
            STEP_ROUTES[
                `STEP_0${currentStep + STEP_ONE}` 
            ];

        navigate(getStepRoute(nextStepPath));
    }, [currentStep, navigate]);

    const handlePreviousStep = useCallback((): void => {
        setCurrentStep(currentStep - STEP_ONE);

        const previousStepPath =
            STEP_ROUTES[
                `STEP_0${currentStep - STEP_ONE}` 
            ];

        navigate(getStepRoute(previousStepPath));
    }, [currentStep, navigate]);

    if (!slug) {
        return <NotFoundPage />;
    }

    return (
        <FormSubmitProvider>
            <Grid className={styles.careerWrapper}>
                <Typography variant="h4" className={styles.header}>
                    Create an account to receive proposals
                </Typography>
                <Grid container className={styles.career}>
                    {currentStep < STEPS_NUMBER && (
                        <Grid item className={styles.careerContent}>
                            <Typography
                                variant="h2"
                                className={styles.careerTitle}
                            >
                                Let`s get started!
                            </Typography>
                            <Typography
                                variant="h5"
                                className={styles.careerDescription}
                            >
                                Hi! If you are looking for your next career
                                adventure - we`re here to help your succeed. We
                                look forward to working with you.
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
        </FormSubmitProvider>
    );
};

export { Onboarding };
