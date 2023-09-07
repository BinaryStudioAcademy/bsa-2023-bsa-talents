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

const BsaBadgesStep: React.FC = () => {
    //TODO: get all user badges here, for now mock data
    const { bsaBadges, lmsBsaBadges } = useAppSelector((state) => ({
        bsaBadges: state.talentOnBoarding.bsaBadges,
        lmsBsaBadges: state.lms.bsaBadges,
    }));

    const bsaBadgesWithColors = lmsBsaBadges.map((badge) => ({
        ...badge,
        color: getRandomBadgeColor(),
    }));
    const { control, handleSubmit, errors } = useAppForm<BsaBadgesStepDto>({
        defaultValues: { bsaBadges },
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
            field: ControllerRenderProps<BsaBadgesStepDto, 'bsaBadges'>,
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
            field: ControllerRenderProps<BsaBadgesStepDto, 'bsaBadges'>;
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
                    name="bsaBadges"
                    render={renderCheckboxes}
                />
            </FormControl>
            {errors.bsaBadges && (
                <FormHelperText className={styles.hasError}>
                    {errors.bsaBadges.message}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export { BsaBadgesStep };
