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
        // eslint-disable-next-line @typescript-eslint/quotes
        label: "I'm hiring",
    },
    {
        value: UserRole.TALENT,
        // eslint-disable-next-line @typescript-eslint/quotes
        label: "I'm looking for a job",
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

    const [isTalent, setIsTalent] = useState<string>(UserRole.TALENT);

    const renderRadioGroup = useCallback(
        function renderRadio({
            field,
        }: {
            field: ControllerRenderProps<UserSignUpRequestDto, 'role'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<UserSignUpRequestDto>;
        }): React.ReactElement {
            function handleChange(event_: React.BaseSyntheticEvent): void {
                field.onChange(event_.target.value);
                setIsTalent(() => event_.target.value);
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref, ...newField } = field;

            return (
                <RadioGroup
                    {...newField}
                    className={styles['radio-wrapper']}
                    defaultValue={isTalent}
                    options={options}
                    // eslint-disable-next-line react/jsx-no-bind
                    onChange={handleChange}
                />
            );
        },
        [isTalent],
    );

    const sellingPointText =
        isTalent === UserRole.TALENT
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
                                    render={renderRadioGroup}
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
