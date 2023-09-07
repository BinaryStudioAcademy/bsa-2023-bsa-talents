import {
    Controller,
    type ControllerFieldState,
    type ControllerRenderProps,
    type UseFormStateReturn,
} from 'react-hook-form';
import { useSelector } from 'react-redux';

import {
    Badge,
    Checkbox,
    FormControl,
    FormHelperText,
    Typography,
} from '~/bundles/common/components/components.js';
import {
    // useAppDispatch,
    useAppForm,
    useCallback,
    // useEffect,
} from '~/bundles/common/hooks/hooks.js';
import { type RootReducer } from '~/framework/store/store.package.js';

//import { useFormSubmit } from '../../context/context.js';
import { getRandomBadgeColor } from '../../helpers/helpers.js';
//import { actions } from '../../store/talent-onboarding.js';
import { type BsaBadgesStepDto } from '../../types/types.js';
import { BsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import styles from './styles.module.scss';

//TODO: uncomment when context for submitting will be added
const BsaBadgesStep: React.FC = () => {
    const savedPayload = useSelector(
        (state: RootReducer) => state.talentOnBoarding.bsaBadgesStep,
    );

    const bsaBadges = useSelector(
        //TODO: get all user badges here, for now mock data
        (state: RootReducer) => state.lms.bsaBadges,
    );
    const bsaBadgesWithColors = bsaBadges.map((badge) => ({
        ...badge,
        color: getRandomBadgeColor(),
    }));
    // const { control, handleSubmit, errors } = useAppForm<BsaBadgesStepDto>({
    //     defaultValues: { ...savedPayload },
    //     validationSchema: BsaBadgesStepValidationSchema,
    // });

    const { control, errors } = useAppForm<BsaBadgesStepDto>({
        defaultValues: { ...savedPayload },
        validationSchema: BsaBadgesStepValidationSchema,
    });

    // const { setSubmitForm } = useFormSubmit();

    // const dispatch = useAppDispatch();

    // const onSubmit = useCallback(
    //     async (data: BsaBadgesStepDto): Promise<boolean> => {
    //         await dispatch(actions.bsaBadgesStep(data));
    //         return true;
    //     },
    //     [dispatch],
    // );

    // useEffect(() => {
    //     setSubmitForm(() => {
    //         return async () => {
    //             let result = false;
    //             await handleSubmit(async (formData) => {
    //                 result = await onSubmit(formData);
    //             })();
    //             return result;
    //         };
    //     });
    //     return () => {
    //         setSubmitForm(null);
    //     };
    // }, [handleSubmit, onSubmit, setSubmitForm]);

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
