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
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks.js';
import { actions as lmsActions } from '~/bundles/lms/store/lms.js';
import { actions as cabinetActions } from '~/bundles/profile-cabinet/store/profile-cabinet.js';
import { type RootReducer } from '~/framework/store/store.js';

import { OnboardingStep } from '../../enums/enums.js';
import { actions as talentActions } from '../../store/talent-onboarding.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { bsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const BadgesStep: React.FC = () => {
    const { badges, talentBadges, currentUser } = useAppSelector((state) => ({
        currentUser: state.auth.currentUser,
        badges: state.talentOnBoarding.badges,
        talentBadges: state.lms.talentBadges,
    }));
    const hasChangesInDetails = useAppSelector(
        (state: RootReducer) => state.cabinet.hasChangesInDetails,
    );
    const { control, handleSubmit, errors, watch } =
        useAppForm<BsaBadgesStepDto>({
            defaultValues: useMemo(
                () => ({
                    badges,
                }),
                [badges],
            ),
            validationSchema: bsaBadgesStepValidationSchema,
        });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();
    const watchedBadges = watch('badges');

    useEffect(() => {
        if (talentBadges.length === 0 && currentUser?.id) {
            void dispatch(lmsActions.getTalentBadges(currentUser.id));
        }
    }, [dispatch, talentBadges, currentUser?.id]);

    const memoizedTalentBadges = useMemo(() => {
        return talentBadges;
    }, [talentBadges]);

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
                    ...data,
                    userId: currentUser?.id,
                    completedStep: OnboardingStep.STEP_02,
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
                    {memoizedTalentBadges.map((badge) => {
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
                                    isChecked={
                                        field.value.includes(badge.id) ||
                                        badge.type == 'service'
                                    }
                                    onChange={handleCheckboxOnChange(
                                        field,
                                        badge.id,
                                    )}
                                />
                                <Badge
                                    primaryText={primaryText}
                                    secondText={secondText}
                                    description={badge.name}
                                    color={badge.color}
                                />
                            </div>
                        );
                    })}
                </>
            );
        },
        [memoizedTalentBadges, handleCheckboxOnChange],
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
