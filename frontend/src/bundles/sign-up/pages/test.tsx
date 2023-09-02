import {
    type Control,
    type FieldErrors,
    type FieldValues,
    type UseFormHandleSubmit,
} from 'react-hook-form';

import { Button, Grid } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { actions as signUpActions } from '~/bundles/sign-up/store/sign-up.js';
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';
import { signUpStep1ValidationSchema } from '~/bundles/sign-up/validation-schemas/validation-schemas.js';

import { DEFAULT_SIGN_UP_PAYLOAD_STEP1 } from '../components/first-step/constants/constants.js';
import { FirstStep as FirstStepForm } from '../components/first-step/first-step.js';
import styles from './styles.module.scss';

type Properties = {
    test?: boolean;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
    control: Control<T, null>;
    errors: FieldErrors<T>;
    handleSubmit: UseFormHandleSubmit<T>;
};

const TestStepLayout: React.FC<Properties> = () => {
    const dispatch = useAppDispatch();

    const firstStep = useAppForm<UserSignUpStep1Dto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD_STEP1,
        validationSchema: signUpStep1ValidationSchema,
    });

    const [userPayload, setUserPayload] = useState<UserSignUpStep1Dto>(
        DEFAULT_SIGN_UP_PAYLOAD_STEP1,
    );

    const ONE_STEP_LENGTH = 1;
    const FIRST_INDEX = 0;
    const [currentStep, setCurrentStep] = useState(ONE_STEP_LENGTH);
    const handleStepChange = useCallback((step: number): void => {
        setCurrentStep(step);
    }, []);
    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpStep1Dto): void => {
            void dispatch(signUpActions.signUpStep1(payload));
        },
        [dispatch],
    );
    useEffect(() => {
        handleSignUpSubmit(userPayload);
    }, [dispatch, handleSignUpSubmit, userPayload]);

    const handleNextStep = useCallback(() => {
        if (currentStep === ONE_STEP_LENGTH) {
            return;
        }
        handleStepChange(currentStep + ONE_STEP_LENGTH);
    }, [currentStep, handleStepChange]);

    const handleStepSubmit = useCallback(
        (newUserPayload: Partial<UserSignUpStep1Dto>) => {
            setUserPayload((oldUserPayload) => ({
                ...oldUserPayload,
                ...newUserPayload,
            }));

            handleNextStep();
        },
        [handleNextStep],
    );

    const steps = useMemo(() => [FirstStepForm] as const, []);

    const getStep = useCallback((): ReturnValue<UserSignUpStep1Dto> => {
        //add steps
        // switch (currentStep) {
        //     case 1: {
        //         return firstStep;
        //     }
        //     default: {
        //         return null;
        //     }
        // }
        //return currentStep == ONE_STEP_LENGTH ? firstStep : null;
        return firstStep;
    }, [firstStep]);

    const handleValidateBeforeSubmit = useCallback((): void => {
        const step = getStep();
        void step.handleSubmit(handleStepSubmit)();
    }, [getStep, handleStepSubmit]);

    const CurrentForm = useMemo(
        () => steps[(currentStep - ONE_STEP_LENGTH) as typeof FIRST_INDEX],
        [currentStep, steps],
    );

    return (
        <div>
            <CurrentForm userInfo={userPayload} methods={getStep()} />
            <Grid className={styles.stepButtons}>
                <Button label="Back" className={styles.buttonBack} disabled />
                <Button
                    onClick={handleValidateBeforeSubmit}
                    label="Next"
                    variant="contained"
                    className={styles.buttonNext}
                />
            </Grid>
        </div>
    );
};

export { TestStepLayout };
