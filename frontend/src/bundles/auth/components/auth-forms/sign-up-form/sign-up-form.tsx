import {
    Button,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    Link,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    UserRole,
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';

import { PasswordVisibility } from '../password-visibility/password-visibility.js';
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
    const [isTermsAcceptedAfterSubmit, setIsTermsAcceptedAfterSubmit] =
        useState({
            isFormSubmitted: false,
            isTermsAccepted: false,
        });

    const [isPasswordVisible, setShowPassword] = useState(false);

    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleClickShowPassword = useCallback((): void => {
        setShowPassword((show) => !show);
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();

            setIsTermsAcceptedAfterSubmit({
                isFormSubmitted: true,
                isTermsAccepted: isTermsAcceptedAfterSubmit.isTermsAccepted,
            });

            if (isTermsAcceptedAfterSubmit.isTermsAccepted) {
                void handleSubmit(onSubmit)(event_);
            }
        },
        [handleSubmit, onSubmit, isTermsAcceptedAfterSubmit],
    );

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsTermsAcceptedAfterSubmit({
                isFormSubmitted: isTermsAcceptedAfterSubmit.isFormSubmitted,
                isTermsAccepted: event.target.checked,
            });
        },
        [isTermsAcceptedAfterSubmit],
    );

    const checkboxLabel = (
        <Typography variant="body1" className={styles.termsLabel}>
            I agree to the
            <span className={styles.bsaTermsLinkWrapper}>
                {/* TODO: replace with actual terms link */}
                <Link to="/" className={styles.bsaTermsLink}>
                    BSA Talents Terms
                </Link>
            </span>
            <span className={styles.required}>*</span>
        </Typography>
    );

    const showPasswordIcon = (
        <PasswordVisibility
            handleClick={handleClickShowPassword}
            showPassword={isPasswordVisible}
        />
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
                    <FormLabel className="label">
                        Email <span className={styles.required}>*</span>
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
                        Password <span className={styles.required}>*</span>
                    </FormLabel>
                    <Input
                        control={control}
                        errors={errors}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="****"
                        name="password"
                        endAdornment={showPasswordIcon}
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

                <FormControl className={styles.checkboxWrapper} required>
                    <Checkbox
                        label={checkboxLabel}
                        isChecked={isTermsAcceptedAfterSubmit.isTermsAccepted}
                        onChange={handleCheckboxChange}
                    />
                    {isTermsAcceptedAfterSubmit.isFormSubmitted &&
                        !isTermsAcceptedAfterSubmit.isTermsAccepted && (
                            <FormHelperText className={styles.hasError}>
                                Please accept BSA Talents Terms to continue
                            </FormHelperText>
                        )}
                </FormControl>

                <Button
                    label="Continue"
                    className={getValidClassNames('btn', styles.btnLogin)}
                    type="submit"
                />
            </form>
            <Grid item className="footer">
                <Link className="cta" to={'/sign-in'}>
                    I already have an account
                </Link>
                {/* TODO: replace with actual privacy policy link */}
                <Link to={'/'} className="span">
                    Privacy Policy
                </Link>
            </Grid>
        </>
    );
};

export { SignUpForm };
