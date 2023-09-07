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
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks.js';

import { useFormSubmit } from '../../context/context.js';
import { getRandomBadgeColor } from '../../helpers/helpers.js';
import { actions } from '../../store/talent-onboarding.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { BsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

const BadgesStep: React.FC = () => {
    const { badges, bsaBadges } = useAppSelector((state) => ({
        badges: state.talentOnBoarding.badges,
        bsaBadges: state.lms.bsaBadges,
    }));

    const bsaBadgesWithColors = bsaBadges.map((badge) => ({
        ...badge,
        color: getRandomBadgeColor(),
    }));
    const { control, handleSubmit, errors } = useAppForm<BsaBadgesStepDto>({
        defaultValues: { badges },
        validationSchema: BsaBadgesStepValidationSchema,
    });

    const { setSubmitForm } = useFormSubmit();

    const dispatch = useAppDispatch();

    const onSubmit = useCallback(
        async (data: BsaBadgesStepDto): Promise<boolean> => {
            await dispatch(actions.updateTalentDetails(data));
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
                    {bsaBadgesWithColors.map((badge) => {
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
        [bsaBadgesWithColors, handleCheckboxOnChange],
    );

    return (
        <FormControl className={styles.formControl}>
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
        </FormControl>
    );
};

export { BadgesStep };
