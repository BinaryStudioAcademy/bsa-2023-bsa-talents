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
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

import { PasswordVisibility } from '../password-visibility/password-visibility.js';
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
    const [isPasswordVisible, setShowPassword] = useState(false);

    const handleClickShowPassword = useCallback((): void => {
        setShowPassword((show) => !show);
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const showPasswordIcon = (
        <PasswordVisibility
            handleClick={handleClickShowPassword}
            showPassword={isPasswordVisible}
        ></PasswordVisibility>
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
                    <FormLabel className="label">Email*</FormLabel>
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
                    <FormLabel className="label">Password*</FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="****"
                        name="password"
                        endAdornment={showPasswordIcon}
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
