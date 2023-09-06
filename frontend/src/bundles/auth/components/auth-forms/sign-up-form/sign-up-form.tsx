import { FormHelperText } from '@mui/material';
import { UserRole } from 'shared/build/index.js';

import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Link,
    RadioGroup,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
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
    const [selectedRole, setSelectedRole] = useState('talent');
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isTermsError, setIsTermsError] = useState(false);

    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            if (isTermsAccepted) {
                void handleSubmit(onSubmit)(event_);
            } else {
                setIsTermsError(true);
            }
        },
        [handleSubmit, isTermsAccepted, onSubmit],
    );

    const handleRadioChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            let role = 'talent';
            switch (event.target.value) {
                case UserRole.TALENT: {
                    role = UserRole.TALENT;
                    break;
                }
                case UserRole.EMPLOYER: {
                    role = UserRole.EMPLOYER;
                    break;
                }
                case UserRole.ADMIN: {
                    role = UserRole.ADMIN;
                    break;
                }
                default: {
                    break;
                }
            }
            setSelectedRole(role);
        },
        [],
    );

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsTermsAccepted(event.target.checked);
            setIsTermsError((previous) => !previous);
        },
        [],
    );

    const checkboxLabel = (
        <p className={styles.termsLabel}>
            I agree to the
            <span>
                {/* TODO: replace with actual terms link */}
                <Link to="/">BSA Talents Terms</Link>
            </span>
            *
        </p>
    );

    return (
        <>
            <form onSubmit={handleFormSubmit} className={'form'}>
                <p className={getValidClassNames('header')}>
                    Sign Up to get started!
                </p>

                <FormControl
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
                <FormControl className={styles['radio-wrapper']}>
                    <RadioGroup
                        className={styles['radio-group']}
                        control={control}
                        options={options}
                        name={'role'}
                        value={selectedRole}
                        onChange={handleRadioChange}
                    />
                </FormControl>
                {selectedRole === UserRole.TALENT && (
                    <FormControl
                        className={styles.checkboxWrapper}
                        required
                        hasError={!isTermsAccepted}
                    >
                        <Checkbox
                            label={checkboxLabel}
                            isChecked={isTermsAccepted}
                            onChange={handleCheckboxChange}
                        />
                        <FormHelperText
                            className={getValidClassNames(
                                styles.termsErrorText,
                                isTermsError && styles.rejected,
                            )}
                        >
                            Please accept Terms to continue
                        </FormHelperText>
                    </FormControl>
                )}

                <Button
                    label="Continue"
                    className={getValidClassNames(
                        'btn-login',
                        styles['btn-login'],
                    )}
                    type="submit"
                    disabled={selectedRole === UserRole.TALENT && isTermsError}
                />
            </form>
            <Grid item className={'footer'}>
                <Link className={'cta'} to={'/sign-in'}>
                    I already have an account
                </Link>
                <Link to={'/'} className={'span'}>
                    Privacy Policy
                </Link>
            </Grid>
        </>
    );
};

export { SignUpForm };
