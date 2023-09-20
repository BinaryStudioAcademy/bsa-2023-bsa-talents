import { actions as storeActions } from '~/app/store/app.js';
import {
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Grid,
    Input,
    Link,
    RadioGroup,
    Typography,
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    UserRole,
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import { NotificationType } from '~/services/notification/enums/notification-types.enum.js';

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
    const dispatch = useAppDispatch();

    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isPasswordVisible, setShowPassword] = useState(false);

    const { control, errors, watch, handleSubmit } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
        });

    const handleClickShowPassword = useCallback((): void => {
        setShowPassword((show) => !show);
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            if (watch('role') === UserRole.TALENT && !isTermsAccepted) {
                const termsErrorMessage =
                    'Please accept BSA Talents Terms to continue';
                void dispatch(
                    storeActions.notify({
                        type: NotificationType.ERROR,
                        message: termsErrorMessage,
                    }),
                );
                return;
            }
            void handleSubmit(onSubmit)(event_);
        },
        [dispatch, handleSubmit, isTermsAccepted, onSubmit, watch],
    );

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsTermsAccepted(event.target.checked);
        },
        [],
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
            *
        </Typography>
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
                {watch('role') === UserRole.TALENT && (
                    <FormControl className={styles.checkboxWrapper} required>
                        <Checkbox
                            label={checkboxLabel}
                            isChecked={isTermsAccepted}
                            onChange={handleCheckboxChange}
                        />
                    </FormControl>
                )}

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
