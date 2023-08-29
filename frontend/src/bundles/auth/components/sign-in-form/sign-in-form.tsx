import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from 'shared/build/index.js';

import {
    Button,
    Checkbox,
    FormLabel,
    Grid,
    Input,
    Link,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';

import { GoogleButton } from '../google-button/google-button.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: {
            email: '',
            password: '',
        },
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
            <Grid container className={styles.container}>
                <Grid item xs={6}>
                    Test1
                </Grid>
                <Grid className={styles['form-wrapper']} item xs={6}>
                    <form onSubmit={handleFormSubmit} className={styles.form}>
                        <p className={getValidClassNames(styles.header)}>
                            Hi! Login to your Account
                        </p>
                        <GoogleButton />
                        <a href="/">
                            <span className={styles['email-sign']}>
                                or Sign in with Email
                            </span>
                        </a>

                        <div
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
                        </div>
                        <div
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
                        </div>
                        <div className={styles['auth-options']}>
                            <Checkbox
                                label={
                                    <Typography variant="label">
                                        Remeber Me?
                                    </Typography>
                                }
                                className={getValidClassNames(styles.checkbox)}
                            />
                            <a href="/" className={styles.forgot}>
                                <span>Forgot Password?</span>
                            </a>
                        </div>
                        <Button label="Login" className={styles['btn-login']} />
                    </form>
                    <div className={styles.footer}>
                        <span className={styles.span}>Not registered Yet?</span>
                        <Link className={styles.cta} to={'/sign-up'}>
                            Create an account
                        </Link>
                    </div>
                </Grid>
            </Grid>
        </>
    );
};

export { SignInForm };
