import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from 'shared/build/index.js';

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
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    isTalent: boolean;
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit, isTalent = true }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: {
            email: DEFAULT_SIGN_IN_PAYLOAD.email,
            password: DEFAULT_SIGN_IN_PAYLOAD.password,
        },
        validationSchema: userSignInValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const sellingPointText = isTalent
        ? 'Start your career easily'
        : 'Find the top talent for your business';

    return (
        <>
            <Grid container className={styles.container}>
                <Grid item xs={12} md={6}>
                    <Grid item className={styles['selling-point']}>
                        <div className={styles.logo}></div>
                        <h1 className={styles.text}>{sellingPointText}</h1>
                    </Grid>
                </Grid>
                <Grid className={styles['form-wrapper']} item xs={12} md={6}>
                    <Grid item className={styles.wrapper}>
                        <form
                            onSubmit={handleFormSubmit}
                            className={styles.form}
                        >
                            <p className={getValidClassNames(styles.header)}>
                                Hi! Login to your Account
                            </p>

                            <FormControl
                                className={getValidClassNames(
                                    styles['input-container'],
                                    styles.email,
                                )}
                            >
                                <FormLabel className={styles.label}>
                                    Email
                                </FormLabel>
                                <Input
                                    control={control}
                                    errors={errors}
                                    placeholder="user@email.com"
                                    name="email"
                                    className={styles.input}
                                />
                            </FormControl>
                            <FormControl
                                className={getValidClassNames(
                                    styles['input-container'],
                                    styles.password,
                                )}
                            >
                                <FormLabel className={styles.label}>
                                    Password
                                </FormLabel>
                                <Input
                                    control={control}
                                    errors={errors}
                                    type="password"
                                    placeholder="****"
                                    name="password"
                                    className={styles.input}
                                />
                            </FormControl>
                            <Grid item className={styles['auth-options']}>
                                <Checkbox
                                    label={
                                        <Typography variant="label">
                                            Remember Me?
                                        </Typography>
                                    }
                                    className={getValidClassNames(
                                        styles.checkbox,
                                    )}
                                />
                                {/* TODO: Link to reset password route */}
                                <Link to="/" className={styles.forgot}>
                                    <span>Forgot Password?</span>
                                </Link>
                            </Grid>
                            <Button
                                label="Login"
                                className={styles['btn-login']}
                            />
                        </form>
                        <Grid item className={styles.footer}>
                            <span className={styles.span}>
                                Not registered Yet?
                            </span>
                            <Link className={styles.cta} to={'/sign-up'}>
                                Create an account
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export { SignInForm };
