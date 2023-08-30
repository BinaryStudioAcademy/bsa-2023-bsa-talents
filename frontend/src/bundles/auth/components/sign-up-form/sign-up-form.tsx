import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

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
    isTalent: boolean;
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const options = [
    {
        value: 'employer',
        label: 'I\'m hiring',
    },
    {
        value: 'talent',
        label: 'I\'m looking for a job',
    },
];

const renderRadio = ({
    field,
}: {
    field: ControllerRenderProps<UserSignUpRequestDto, 'role'>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<UserSignUpRequestDto>;
}): React.ReactElement => (
    <RadioGroup
        {...field}
        className={styles['radio-wrapper']}
        options={options}
    />
);

const SignUpForm: React.FC<Properties> = ({ onSubmit, isTalent = true }) => {
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
                                Sign Up to get started!
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
                                />
                            </FormControl>
                            <FormControl className={styles['radio-group']}>
                                <Controller
                                    control={control}
                                    name="role"
                                    render={renderRadio}
                                />
                            </FormControl>
                            <Button
                                label="Sign Up"
                                className={styles['btn-login']}
                                type="submit"
                            />
                        </form>
                        <Grid item className={styles.footer}>
                            <span className={styles.span}>
                                Already registered?
                            </span>
                            <Link className={styles.cta} to={'/sign-in'}>
                                Sign In
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export { SignUpForm };
