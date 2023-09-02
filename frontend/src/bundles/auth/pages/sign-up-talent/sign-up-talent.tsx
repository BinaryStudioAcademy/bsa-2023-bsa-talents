import arrowIcon from '~/assets/img/arrow-right.svg';
import { StepContent, Steps } from '~/bundles/auth/components/components.js';
import {
    stepOne,
    StepRoutes,
    stepsNumber,
} from '~/bundles/auth/components/sign-up-content/constants/constants.js';
import { Grid, Typography } from '~/bundles/common/components/components.js';
import { getSignUpTalentStepRoute } from '~/bundles/common/helpers/helpers.js';
import {
    useCallback,
    useNavigate,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { stepService } from '~/services/services.js';

import styles from './styles.module.scss';

const SignUpTalent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(stepService.get());
    const navigate = useNavigate();

    const handleNextStep = useCallback((): void => {
        setCurrentStep(currentStep + stepOne);
        stepService.set(currentStep + stepOne);

        const nextStepPath =
            StepRoutes[
                `STEP_0${currentStep + stepOne}` as keyof typeof StepRoutes
            ];

        navigate(getSignUpTalentStepRoute(nextStepPath));
    }, [currentStep, navigate]);

    const handlePreviousStep = useCallback((): void => {
        setCurrentStep(currentStep - stepOne);
        stepService.set(currentStep - stepOne);

        const previousStepPath =
            StepRoutes[
                `STEP_0${currentStep - stepOne}` as keyof typeof StepRoutes
            ];

        navigate(getSignUpTalentStepRoute(previousStepPath));
    }, [currentStep, navigate]);

    return (
        <Grid className={styles.careerWrapper}>
            <Typography variant="h4" className={styles.header}>
                Create an account to receive proposals
            </Typography>
            <Grid container className={styles.career}>
                {currentStep < stepsNumber && (
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
                    {currentStep < stepsNumber && (
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

export { SignUpTalent };
