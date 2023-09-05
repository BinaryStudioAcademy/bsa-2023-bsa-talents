import { FormHelperText } from '@mui/material';
import { type ReactElement } from 'react';
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
    Typography,
} from '~/bundles/common/components/components.js';
import { type BadgeColors } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { type ValueOf } from '~/bundles/common/types/types.js';
import { type RootReducer } from '~/framework/store/store.package.js';

import { type BsaBadgesStepDto } from '../../types/types.js';
import { BsaBadgesStepValidationSchema } from '../../validation-schemas/validation-schemas.js';
import { mockBadges } from './constants/mock-badges.constants.js';
import styles from './styles.module.scss';

type BsaBadge = {
    id: string;
    score: number;
    maxScore: number;
    level?: string;
    description: string;
    isSelected?: boolean;
    isDisabled?: boolean;
    icon?: ReactElement;
    typeColor?: ValueOf<typeof BadgeColors>;
};

type Properties = {
    badges: BsaBadge[];
};

const BsaBadgesStep: React.FC<Properties> = ({ badges }) => {
    const savedPayload = useSelector(
        (state: RootReducer) => state.talentOnBoarding.bsaBadgesStep,
    );

    const { control, errors } = useAppForm<BsaBadgesStepDto>({
        defaultValues: { ...savedPayload },
        validationSchema: BsaBadgesStepValidationSchema,
    });

    const handleCheckboxOnChange = useCallback(
        (
            field: ControllerRenderProps<BsaBadgesStepDto, 'bsaBadges'>,
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
            field: ControllerRenderProps<BsaBadgesStepDto, 'bsaBadges'>;
            fieldState: ControllerFieldState;
            formState: UseFormStateReturn<BsaBadgesStepDto>;
        }): React.ReactElement => {
            return (
                <>
                    {mockBadges.map((badge) => (
                        <div
                            key={badge.id}
                            className={styles.badgeCheckboxContainer}
                        >
                            <Checkbox
                                key={badge.id}
                                value={badge.id}
                                isChecked={badge.isSelected}
                                isDisabled={badge.isDisabled}
                                onChange={handleCheckboxOnChange(
                                    field,
                                    badge.id,
                                )}
                            />
                            <Badge
                                primaryText={String(badge.score) + ' '}
                                secondText={'/ ' + String(badge.maxScore)}
                                description={badge.description}
                                color={badge.typeColor}
                                icon={badge.icon ?? undefined}
                            />
                        </div>
                    ))}
                </>
            );
        },
        [handleCheckboxOnChange],
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
                {badges.map((badge) => (
                    <div
                        key={badge.id}
                        className={styles.badgeCheckboxContainer}
                    >
                        <Checkbox
                            key={badge.id}
                            value={badge.id}
                            isChecked={badge.isSelected}
                            isDisabled={badge.isDisabled}
                        />
                        <Badge
                            primaryText={String(badge.score) + ' '}
                            secondText={'/ ' + String(badge.maxScore)}
                            description={badge.description}
                            color={badge.typeColor}
                            icon={badge.icon}
                        />
                    </div>
                ))}
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
