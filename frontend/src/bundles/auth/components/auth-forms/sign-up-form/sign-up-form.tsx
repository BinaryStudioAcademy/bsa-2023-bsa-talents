import { UserRole } from 'shared/build/index.js';

import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Link,
    RadioGroup,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const options = [
    {
        value: UserRole.EMPLOYER,
        label: 'I am hiring',
    },
    {
        value: UserRole.TALENT,
        label: 'I am looking for a job',
    },
];

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
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
                <p className="header">Sign Up to get started!</p>

                <FormControl
                    className={getValidClassNames(
                        'inputContainer',
                        errors.email ? '' : 'email',
                    )}
                >
                    <FormLabel className="label">Email *</FormLabel>
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
                    <FormLabel className="label">Password *</FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        type="password"
                        placeholder="****"
                        name="password"
                    />
                </FormControl>
                <FormControl
                    className={getValidClassNames(
                        styles.radioWrapper,
                        errors.password ? 'hasError' : '',
                    )}
                >
                    <RadioGroup
                        className={styles.radioGroup}
                        control={control}
                        options={options}
                        name={'role'}
                    />
                </FormControl>
                <Button
                    label="Continue"
                    className={getValidClassNames('btnLogin', styles.btnLogin)}
                    type="submit"
                />
            </form>
            <Grid item className="footer">
                <Link className="cta" to={'/sign-in'}>
                    I already have an account
                </Link>
                <Link to={'/'} className="span">
                    Privacy Policy
                </Link>
            </Grid>
        </>
    );
};

export { SignUpForm };
