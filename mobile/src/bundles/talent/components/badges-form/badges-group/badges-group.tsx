import React from 'react';

import { DEFAULT_VALUE_IS_DISABLED } from '~/bundles/common/components/badge/constants/constants';
import { Badge, Checkbox, View } from '~/bundles/common/components/components';
import { type BsaBadgeStepBadgesTitle } from '~/bundles/common/enums/enums';
import { useCallback, useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type ValueOf,
} from '~/bundles/common/types/types';

import { styles } from '../styles';

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
        <View style={styles.groupWrapper}>
            {options.map((badge) => (
                <View
                    key={badge}
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    <Checkbox
                        isChecked={value?.includes(badge)}
                        onChange={(): void => {
                            handleToggleCheckbox(badge);
                        }}
                        disabled={DEFAULT_VALUE_IS_DISABLED[badge]}
                    />
                    <Badge badgeType={badge} />
                </View>
            ))}
        </View>
    );
};

export { BadgesGroup };
