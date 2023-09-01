import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';
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
        label: 'I\'m hiring',
    },
    {
        value: UserRole.TALENT,
        label: 'I\'m looking for a job',
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

    const renderRadioGroup = useCallback(function renderRadio({
        field,
    }: {
        field: ControllerRenderProps<UserSignUpRequestDto, 'role'>;
        fieldState: ControllerFieldState;
        formState: UseFormStateReturn<UserSignUpRequestDto>;
    }): React.ReactElement {
        return (
            <RadioGroup
                {...{
                    onChange: field.onChange,
                    onBlur: field.onBlur,
                    name: field.name,
                    value: field.value,
                }}
                className={styles['radio-wrapper']}
                options={options}
            />
        );
    }, []);

    return (
        <>
            <form onSubmit={handleFormSubmit} className={styles.form}>
                <p className={getValidClassNames(styles.header)}>
                    Sign Up to get started!
                </p>

                <FormControl
                    className={getValidClassNames(
                        styles['input-container'],
                        styles.email,
                    )}
                >
                    <FormLabel className={styles.label}>Email *</FormLabel>
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
                    <FormLabel className={styles.label}>Password *</FormLabel>
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
                        render={renderRadioGroup}
                    />
                </FormControl>
                <Button
                    label="Continue"
                    className={styles['btn-login']}
                    type="submit"
                />
            </form>
            <Grid item className={styles.footer}>
                <Link className={styles.cta} to={'/sign-in'}>
                    I already have an account
                </Link>
                <Link to={'/'} className={styles.span}>
                    Privacy Policy
                </Link>
            </Grid>
        </>
    );
};

export { SignUpForm };
