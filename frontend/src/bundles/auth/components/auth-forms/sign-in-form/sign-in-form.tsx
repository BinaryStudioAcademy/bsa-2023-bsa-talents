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
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            alert('You have been logged in.');
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <>
            <form onSubmit={handleFormSubmit} className={'form'}>
                <p className={getValidClassNames('header')}>
                    Hi! Login to your Account
                </p>

                <FormControl
                    required={true}
                    className={getValidClassNames('input-container', 'email')}
                >
                    <FormLabel className={'label'}>Email *</FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        placeholder="user@email.com"
                        name="email"
                    />
                </FormControl>
                <FormControl
                    required={true}
                    className={getValidClassNames(
                        'input-container',
                        'password',
                    )}
                >
                    <FormLabel className={'label'}>Password *</FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        type="password"
                        placeholder="****"
                        name="password"
                    />
                </FormControl>
                <Grid item className={styles['auth-options']}>
                    <Checkbox
                        label={
                            <Typography variant="label">
                                Remember Me?
                            </Typography>
                        }
                        className={getValidClassNames(styles.checkbox)}
                    />
                    {/* TODO: Link to reset password route */}
                    <Link to="/" className={styles.forgot}>
                        <span>Forgot Password?</span>
                    </Link>
                </Grid>
                <Button label="Login" className={'btn-login'} type="submit" />
            </form>
            <Grid item className={'footer'}>
                <span className={'span'}>Not registered Yet?</span>
                <Link className={'cta'} to={'/sign-up'}>
                    Create an account
                </Link>
            </Grid>
        </>
    );
};

export { SignInForm };
