import { UserRole, type ValueOf } from 'shared/build/index.js';

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
} from '~/bundles/common/components/components.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import { NotificationType } from '~/services/notification/enums/notification-types.enum.js';

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

    const [selectedRole, setSelectedRole] = useState<ValueOf<typeof UserRole>>(
        UserRole.TALENT,
    );
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            if (selectedRole === UserRole.EMPLOYER) {
                void handleSubmit(onSubmit)(event_);
            } else if (isTermsAccepted) {
                void handleSubmit(onSubmit)(event_);
            } else {
                const termsErrorMessage =
                    'Please accept BSA Talents Terms to continue';
                void dispatch(
                    storeActions.notify({
                        type: NotificationType.ERROR,
                        message: termsErrorMessage,
                    }),
                );
            }
        },
        [dispatch, handleSubmit, isTermsAccepted, onSubmit, selectedRole],
    );

    const handleRadioChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            switch (event.target.value) {
                case UserRole.TALENT: {
                    setSelectedRole(UserRole.TALENT);
                    break;
                }
                case UserRole.EMPLOYER: {
                    setSelectedRole(UserRole.EMPLOYER);
                    break;
                }
                default: {
                    break;
                }
            }
        },
        [],
    );

    const handleCheckboxChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setIsTermsAccepted(event.target.checked);
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
                        value={selectedRole}
                        onChange={handleRadioChange}
                    />
                </FormControl>
                {selectedRole === UserRole.TALENT && (
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
