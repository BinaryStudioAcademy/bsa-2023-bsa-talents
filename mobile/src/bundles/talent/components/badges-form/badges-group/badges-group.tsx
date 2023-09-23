import React from 'react';

import { Badge, Checkbox, View } from '~/bundles/common/components/components';
import { useCallback, useFieldArray } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldPath } from '~/bundles/common/types/types';
import { UNCONTROLLED_BADGES } from '~/bundles/talent/components/badges-form/constants/constants';
import { type BadgeFormItem } from '~/bundles/talent/types/badge-form-item/badge-form-item';
import { type BadgesFormDto } from '~/bundles/talent/types/badges-form-dto/badges-form-dto';

import { styles } from '../styles';

type Properties = {
    name: FieldPath<BadgesFormDto>;
    control: Control<BadgesFormDto, null>;
};

const BadgesGroup = ({ control }: Properties): JSX.Element => {
    const { fields, update } = useFieldArray<BadgesFormDto>({
        name: 'badges',
        control,
    });
    const handleToggleCheckbox = useCallback(
        (clickedBadge: BadgeFormItem, index: number) => {
            update(index, {
                ...clickedBadge,
                isChecked: !clickedBadge.isChecked,
            });
        },
        [update],
    );

    return (
        <View style={styles.groupWrapper}>
            {fields.map((badge, index) => (
                <View
                    key={badge.id}
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    <Checkbox
                        isChecked={badge.isChecked}
                        onChange={(): void => {
                            handleToggleCheckbox(badge, index);
                        }}
                        disabled={UNCONTROLLED_BADGES.includes(badge.name)}
                    />
                    <Badge badge={badge} />
                </View>
            ))}
        </View>
    );
};

export { BadgesGroup };
