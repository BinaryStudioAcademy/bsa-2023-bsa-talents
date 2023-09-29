import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';

import {
    Badge,
    Checkbox,
    ErrorMessage,
    FormControl,
    Typography,
} from '~/bundles/common/components/components.js';
import { useFormSubmit } from '~/bundles/common/context/context.js';
import { BadgeColors } from '~/bundles/common/enums/badge-colors.enum.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { actions as cabinetActions } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { type RootReducer } from '~/framework/store/store.js';

import { OnboardingStep } from '../../enums/enums.js';
import { actions as talentActions } from '../../store/talent-onboarding.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { bsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const BadgesStep: React.FC = () => {
    const { badges, bsaBadges } = useAppSelector((state) => ({
        badges: state.talentOnBoarding.badges,
        bsaBadges: state.lms.bsaBadges,
    }));
    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );
    const { control, handleSubmit, errors, watch } =
        useAppForm<BsaBadgesStepDto>({
            defaultValues: { badges: badges ?? [] },
            validationSchema: bsaBadgesStepValidationSchema,
        });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();
    const watchedBadges = watch('badges');

    useEffect(() => {
        const hasChanges =
            JSON.stringify(watchedBadges) === JSON.stringify(badges);
        if (hasChangesInDetails !== hasChanges) {
            dispatch(cabinetActions.setHasChangesInDetails(hasChanges));
        }
    }, [badges, dispatch, hasChangesInDetails, watchedBadges]);

    const handleFormSubmit = useCallback(
        (data: BsaBadgesStepDto): boolean => {
            void dispatch(
                talentActions.updateTalentDetails({
                    badges: badges?.filter((item) =>
                        data.badges.includes(item),
                    ),
                    completedStep: OnboardingStep.STEP_02,
                }),
            );
            return true;
        },
        [badges, dispatch],
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
                                    color={BadgeColors.YELLOW}
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
            <ErrorMessage errors={errors} name="badges" />
        </>
    );
};

export { BadgesStep };
