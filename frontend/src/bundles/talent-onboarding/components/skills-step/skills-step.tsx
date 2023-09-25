import { type State } from '~/bundles/auth/store/auth.js';
import {
    Autocomplete,
    Checkbox,
    Controller,
    FormControl,
    FormLabel,
    Grid,
    Select,
    Typography,
} from '~/bundles/common/components/components.js';
import { ErrorMessage } from '~/bundles/common/components/error-message/error-message.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { useCommonData } from '~/bundles/common/data/hooks/use-common-data.hook.js';
import { type AutoselectOptions } from '~/bundles/common/data/types/autoselect-options.js';
import { getValidClassNames } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import {
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from '~/bundles/common/types/types.js';
import { actions as cabinetActions } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import {
    EnglishLevel,
    NotConsidered,
    OnboardingStep,
    PreferredLanguage,
} from '~/bundles/talent-onboarding/enums/enums.js';
import {
    type SkillsStepDto,
    type TalentHardSkill,
    type UserDetailsGeneralCustom,
} from '~/bundles/talent-onboarding/types/types.js';
import { type RootReducer } from '~/framework/store/store.js';

import { fromUrlLinks, toUrlLinks } from '../../helpers/helpers.js';
import { actions as talentActions } from '../../store/talent-onboarding.js';
import { skillsStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { SkillsProjectLinks } from './components/components.js';
import styles from './styles.module.scss';

const englishLevelOptions = Object.values(EnglishLevel).map((level) => ({
    value: level,
    label: level,
}));

const preferredLanguagesOptions = Object.values(PreferredLanguage).map(
    (language) => ({
        value: language,
        label: language,
    }),
);
const notConsideredOptions = Object.values(NotConsidered).map((option) => ({
    value: option,
    label: option,
}));

const getAuthState = (state: RootReducer): State => state.auth;
const getTalentOnBoardingState = (
    state: RootReducer,
): UserDetailsGeneralCustom => state.talentOnBoarding;
const SkillsStep: React.FC = () => {
    const currentUser = useAppSelector(
        (rootState) => getAuthState(rootState).currentUser,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(
            talentActions.getTalentDetails({
                userId: currentUser?.id,
            }),
        );
    }, [currentUser?.id, dispatch]);

    const {
        talentHardSkills,
        englishLevel,
        notConsidered,
        preferredLanguages,
        projectLinks,
    } = useAppSelector((rootState) => getTalentOnBoardingState(rootState));

    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );

    const { hardSkillsOptions } = useCommonData();

    const hardSkills = useMemo((): AutoselectOptions => {
        return hardSkillsOptions.filter((item) =>
            (talentHardSkills as unknown as TalentHardSkill[]).some(
                (skill) => skill.hardSkillId === item.value,
            ),
        );
    }, [talentHardSkills, hardSkillsOptions]);

    const { control, getValues, handleSubmit, errors, reset, watch } =
        useAppForm<SkillsStepDto>({
            defaultValues: useMemo(
                () => ({
                    hardSkills,
                    englishLevel: englishLevel ?? '',
                    notConsidered,
                    preferredLanguages,
                    projectLinks: projectLinks?.length
                        ? toUrlLinks(projectLinks)
                        : [{ url: '' }],
                }),
                [
                    englishLevel,
                    hardSkills,
                    notConsidered,
                    preferredLanguages,
                    projectLinks,
                ],
            ),
            validationSchema: skillsStepValidationSchema,
        });

    useEffect(() => {
        reset({
            hardSkills,
            englishLevel,
            notConsidered,
            preferredLanguages,
            projectLinks: projectLinks?.length
                ? toUrlLinks(projectLinks)
                : [{ url: '' }],
        });
    }, [
        hardSkills,
        englishLevel,
        notConsidered,
        preferredLanguages,
        reset,
        projectLinks,
    ]);

    const { setSubmitForm } = useFormSubmit();

    const watchedValues = watch([
        'hardSkills',
        'englishLevel',
        'notConsidered',
        'preferredLanguages',
        'projectLinks',
    ]);

    useEffect(() => {
        const newValues = getValues([
            'hardSkills',
            'englishLevel',
            'notConsidered',
            'preferredLanguages',
            'projectLinks',
        ]);
        const initialValues = {
            hardSkills,
            englishLevel,
            notConsidered,
            preferredLanguages,
            projectLinks,
        };
        const hasChanges =
            JSON.stringify(Object.values(initialValues)) !==
            JSON.stringify(newValues);
        if (hasChangesInDetails !== hasChanges) {
            dispatch(cabinetActions.setHasChangesInDetails(hasChanges));
        }
    }, [
        dispatch,
        englishLevel,
        getValues,
        hardSkills,
        hasChangesInDetails,
        notConsidered,
        preferredLanguages,
        projectLinks,
        watchedValues,
    ]);

    const handleFormSubmit = useCallback(
        (data: SkillsStepDto): boolean => {
            const {
                englishLevel,
                notConsidered,
                preferredLanguages,
                hardSkills,
                projectLinks,
            } = data;

            const enteredLinks = projectLinks.filter((link) =>
                Boolean(link.url),
            );
            const preparedLinks =
                enteredLinks.length > 0 ? fromUrlLinks(enteredLinks) : null;

            void dispatch(
                talentActions.updateTalentDetails({
                    englishLevel,
                    notConsidered,
                    preferredLanguages,
                    userId: currentUser?.id,
                    projectLinks: preparedLinks,
                    completedStep: OnboardingStep.STEP_03,
                    hardSkills,
                }),
            );
            return true;
        },
        [currentUser?.id, dispatch],
    );

    useEffect(() => {
        setSubmitForm(() => {
            return async () => {
                let result = false;
                await handleSubmit((formData) => {
                    result = handleFormSubmit(formData);
                })();
                return result;
            };
        });
        return () => {
            setSubmitForm(null);
        };
    }, [handleSubmit, handleFormSubmit, setSubmitForm]);

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<SkillsStepDto, 'notConsidered'>,
            selectedValue: string,
        ) =>
            (): void => {
                const updatedValue = field.value.includes(selectedValue)
                    ? field.value.filter((item) => item !== selectedValue)
                    : [...field.value, selectedValue];
                field.onChange(updatedValue);
            },
        [],
    );

    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<SkillsStepDto, 'notConsidered'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<SkillsStepDto>;
        }): React.ReactElement => {
            return (
                <Grid
                    container
                    spacing={2}
                    className={styles.checkboxContainer}
                >
                    {notConsideredOptions.map((option) => (
                        <Grid
                            item
                            xs={6}
                            key={option.value}
                            className={styles['MuiGrid-item']}
                        >
                            <Checkbox
                                {...{
                                    onChange: field.onChange,
                                    onBlur: field.onBlur,
                                    name: field.name,
                                    value: field.value,
                                }}
                                key={option.value}
                                label={option.label}
                                value={option.value}
                                isChecked={field.value.includes(option.value)}
                                onChange={handleCheckboxOnChange(
                                    field,
                                    option.value,
                                )}
                            />
                        </Grid>
                    ))}
                </Grid>
            );
        },
        [handleCheckboxOnChange],
    );

    return (
        <>
            <Autocomplete
                name="hardSkills"
                control={control}
                options={hardSkillsOptions}
                placeholder="Start typing and select skills"
                label="Hard Skills"
            />

            <FormControl>
                <FormLabel className={styles.label} required>
                    <Typography variant={'label'}>Level of English</Typography>
                </FormLabel>

                <Select
                    control={control}
                    errors={errors}
                    options={englishLevelOptions}
                    name={'englishLevel'}
                    placeholder="Option"
                />
                <ErrorMessage errors={errors} name={'englishLevel'} />
            </FormControl>
            <FormControl className={styles.checkboxBlockWrapper}>
                <FormLabel className={styles.label}>
                    <Typography variant={'label'}>I do not consider</Typography>
                </FormLabel>

                <Controller
                    control={control}
                    name="notConsidered"
                    render={renderCheckboxes}
                />
            </FormControl>
            <FormControl>
                <FormLabel
                    className={getValidClassNames(
                        styles.label,
                        styles.labelMargin,
                    )}
                    required
                >
                    <Typography variant={'label'}>
                        Preferred language of communication
                    </Typography>
                </FormLabel>
                <Select
                    isMulti
                    control={control}
                    errors={errors}
                    placeholder="Option"
                    name={'preferredLanguages'}
                    options={preferredLanguagesOptions}
                />
                <ErrorMessage errors={errors} name={'preferredLanguages'} />
            </FormControl>
            <SkillsProjectLinks control={control} errors={errors} />
        </>
    );
};

export { SkillsStep };
