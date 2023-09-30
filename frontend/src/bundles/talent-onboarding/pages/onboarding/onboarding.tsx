import arrowIcon from '~/assets/img/arrow-right.svg';
import {
    Grid,
    PageLayout,
    Typography,
} from '~/bundles/common/components/components.js';
import { FormSubmitProvider } from '~/bundles/common/context/context.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useEffect,
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
    STEPS_NUMBER,
    StepsList,
} from '~/bundles/talent-onboarding/constants/constants.js';
import { StepsRoute } from '~/bundles/talent-onboarding/enums/enums.js';
import { type RootReducer } from '~/framework/store/store.js';
import { configureString } from '~/helpers/helpers.js';

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
    const [isWaitingForApproval, setIsWaitingForApproval] =
        useState<boolean>(false);

    const { publishedAt, isApproved } = useAppSelector(
        (state: RootReducer) => state.talentOnBoarding,
    );
    const handleNextStep = useCallback((): void => {
        setCurrentStep(currentStep + StepsList.ONE);

        const nextStepPath =
            StepsRoute[
                `STEP_0${
                    currentStep + StepsList.ONE
                }` as keyof typeof StepsRoute
            ];

        navigate(
            configureString(AppRoute.TALENT_ONBOARDING_STEP, {
                step: nextStepPath,
            }),
        );
    }, [currentStep, navigate]);

    const handlePreviousStep = useCallback((): void => {
        setCurrentStep(currentStep - StepsList.ONE);

        const previousStepPath =
            StepsRoute[
                `STEP_0${
                    currentStep - StepsList.ONE
                }` as keyof typeof StepsRoute
            ];

        navigate(
            configureString(AppRoute.TALENT_ONBOARDING_STEP, {
                step: previousStepPath,
            }),
        );
    }, [currentStep, navigate]);

    useEffect(() => {
        const updateStepFromLocation = (): void => {
            const slugs = Object.keys(STEP_NUMBER_FROM_ROUTE);
            const slug =
                slugs.find((slug) => location.pathname.endsWith(slug)) ??
                slugs[FIRST_ELEMENT];
            setCurrentStep(STEP_NUMBER_FROM_ROUTE[slug]);
        };
        updateStepFromLocation();
    }, [location.pathname]);

    useEffect(() => {
        if (publishedAt && !isApproved) {
            setIsWaitingForApproval(true);
        }
    }, [isApproved, publishedAt]);

    useEffect(() => {
        if (isApproved) {
            setIsWaitingForApproval(false);
        }
    }, [isApproved]);
    return (
        <PageLayout
            avatarUrl=""
            isOnline={false}
            isWaitingForApproval={isWaitingForApproval}
        >
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
                                    adventure - we`re here to help your succeed.
                                    We look forward to working with you.
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
        </PageLayout>
    );
};

export { Onboarding };
