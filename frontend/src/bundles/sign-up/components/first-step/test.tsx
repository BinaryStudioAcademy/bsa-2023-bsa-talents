import { Button, Grid } from '~/bundles/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import { actions as signUpActions } from '~/bundles/sign-up/store/sign-up.js';
import { type UserSignUpStep1Dto } from '~/bundles/sign-up/types/types.js';
import { signUpStep1ValidationSchema } from '~/bundles/sign-up/validation-schemas/validation-schemas.js';

import { DEFAULT_SIGN_UP_PAYLOAD_STEP1 } from './constants/constants.js';
import { FirstStep } from './first-step.js';
import styles from './styles.module.scss';

type Properties = {
    test?: boolean;
};

const TestStepLayout: React.FC<Properties> = () => {
    const dispatch = useAppDispatch();

    const method = useAppForm({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD_STEP1,
        validationSchema: signUpStep1ValidationSchema,
    });

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpStep1Dto): void => {
            void dispatch(signUpActions.signUpStep1(payload));
        },
        [dispatch],
    );

    const handleValidateBeforeSubmit = useCallback((): void => {
        void method.handleSubmit(handleSignUpSubmit)();
    }, [handleSignUpSubmit, method]);

    return (
        <div>
            <FirstStep methods={method} />
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
