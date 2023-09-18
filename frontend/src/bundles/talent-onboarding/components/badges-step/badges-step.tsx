import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Badge,
    Checkbox,
    FormControl,
    FormHelperText,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

import { OnboardingSteps } from '../../enums/enums.js';
import { actions } from '../../store/talent-onboarding.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { BsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const BadgesStep: React.FC = () => {
    const { badges, bsaBadges } = useAppSelector((state) => ({
        badges: state.talentOnBoarding.badges,
        bsaBadges: state.lms.bsaBadges,
    }));

    const { control, handleSubmit, errors, watch } =
        useAppForm<BsaBadgesStepDto>({
            defaultValues: { badges },
            validationSchema: BsaBadgesStepValidationSchema,
        });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();
    const watchedBadges = watch('badges');

    useEffect(() => {
        if (JSON.stringify(watchedBadges) === JSON.stringify(badges)) {
            dispatch(actions.setHasChangesInDetails(false));
        } else {
            dispatch(actions.setHasChangesInDetails(true));
        }
    }, [badges, dispatch, watchedBadges]);

    const onSubmit = useCallback(
        async (data: BsaBadgesStepDto): Promise<boolean> => {
            await dispatch(
                actions.updateTalentDetails({
                    ...data,
                    completedStep: OnboardingSteps.STEP_02,
                }),
            );
            return true;
        },
        [dispatch],
    );

    useEffect(() => {
        setSubmitForm(() => {
            return async () => {
                let result = false;
                await handleSubmit(async (formData) => {
                    result = await onSubmit(formData);
                })();
                return result;
            };
        });
        return () => {
            setSubmitForm(null);
        };
    }, [handleSubmit, onSubmit, setSubmitForm]);

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<BsaBadgesStepDto, 'badges'>,
            selectedValue: string,
        ) =>
            (): void => {
                const updatedValue = field.value.includes(selectedValue)
                    ? field.value.filter(
                          (item: string) => item !== selectedValue,
                      )
                    : [...field.value, selectedValue];
                field.onChange(updatedValue);
            },
        [],
    );

    const renderCheckboxes = useCallback(
        ({
            field,
        }: {
            field: ControllerRenderProps<BsaBadgesStepDto, 'badges'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<BsaBadgesStepDto>;
        }): React.ReactElement => {
            return (
                <>
                    {bsaBadges.map((badge) => {
                        const primaryText =
                            badge.level ?? String(badge.score) + ' ';
                        const secondText = badge.level
                            ? ''
                            : '/ ' + String(badge.maxScore);
                        return (
                            <div
                                key={badge.id}
                                className={styles.badgeCheckboxContainer}
                            >
                                <Checkbox
                                    key={badge.id}
                                    value={badge.id}
                                    isDisabled={badge.type == 'service'}
                                    isChecked={field.value.includes(badge.id)}
                                    onChange={handleCheckboxOnChange(
                                        field,
                                        badge.id,
                                    )}
                                />
                                <Badge
                                    primaryText={primaryText}
                                    secondText={secondText}
                                    description={badge.description}
                                    color={badge.color}
                                />
                            </div>
                        );
                    })}
                </>
            );
        },
        [bsaBadges, handleCheckboxOnChange],
    );

    return (
        <>
            <Typography className={styles.formLabel} variant={'h6'}>
                Choose BSA badges you want to show in your profile
            </Typography>
            <FormControl className={styles.badgesContainer}>
                <Controller
                    control={control}
                    name="badges"
                    render={renderCheckboxes}
                />
            </FormControl>
            {errors.badges && (
                <FormHelperText className={styles.hasError}>
                    {errors.badges.message}
                </FormHelperText>
            )}
        </>
    );
};

export { BadgesStep };
