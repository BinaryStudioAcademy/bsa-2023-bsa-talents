import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';

import { Checkbox, View } from '~/bundles/common/components/components';
import { useCallback, useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { DEFAULT_VALUE_IS_DISABLED } from '~/bundles/talent/components/badge/constants/constants';
import { Badge } from '~/bundles/talent/components/components';
import { type BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';

type Properties<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T, null>;
    options: ValueOf<typeof BsaBadgeStepBadgesTitle>[];
};

const BadgesGroup = <T extends FieldValues>({
    name,
    control,
    options,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;

    const handleToggleCheckbox = useCallback(
        (selectedType: string) => {
            const isCheckedBefore = value.includes(selectedType);
            const updatedCheckboxGroup = isCheckedBefore
                ? value.filter((type: string) => type !== selectedType)
                : [...value, selectedType];

            onChange(updatedCheckboxGroup);
        },
        [value, onChange],
    );

    return (
        <>
            {options.map((badge) => (
                <View
                    key={badge}
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    <Checkbox
                        isChecked={value ? value.includes(badge) : false}
                        onChange={(): void => {
                            handleToggleCheckbox(badge);
                        }}
                        disabled={DEFAULT_VALUE_IS_DISABLED[badge]}
                    />
                    <Badge badgeType={badge} />
                </View>
            ))}
        </>
    );
};

export { BadgesGroup };
