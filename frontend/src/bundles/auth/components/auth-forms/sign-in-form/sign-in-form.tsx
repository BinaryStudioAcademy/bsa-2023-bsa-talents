import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Link,
    Typography,
} from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <form onSubmit={handleFormSubmit} className="form">
                <p className="header">Hi! Login to your Account</p>

                <FormControl
                    className={getValidClassNames(
                        'inputContainer',
                        errors.email ? '' : 'email',
                    )}
                >
                    <FormLabel className="label">
                        Email
                        <span className={styles.required}>*</span>
                    </FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        placeholder="user@email.com"
                        name="email"
                    />
                </FormControl>
                <FormControl
                    className={getValidClassNames(
                        'inputContainer',
                        errors.password ? '' : 'password',
                    )}
                >
                    <FormLabel className="label">
                        Password
                        <span className={styles.required}>*</span>
                    </FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        type="password"
                        placeholder="****"
                        name="password"
                    />
                </FormControl>
                <Grid item className={styles.authOptions}>
                    <Checkbox
                        label={
                            <Typography variant="label">Remember Me</Typography>
                        }
                        className={styles.checkbox}
                    />
                    {/* TODO: Link to reset password route */}
                    <Link
                        to={AppRoute.RESET_PASSWORD}
                        className={styles.forgot}
                    >
                        <span>Forgot Password?</span>
                    </Link>
                </Grid>
                <Button label="Login" className="btn" type="submit" />
            </form>
            <Grid item className="footer">
                <span className="span">Not Registered Yet?</span>
                <Link className="cta" to={'/sign-up'}>
                    Create an account
                </Link>
            </Grid>
        </>
    );
};

export { SignInForm };
