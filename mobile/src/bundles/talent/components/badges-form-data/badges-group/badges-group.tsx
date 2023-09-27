import React from 'react';

import { Badge, Checkbox, View } from '~/bundles/common/components/components';
import { useCallback, useFieldArray } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldPath } from '~/bundles/common/types/types';
import { BsaBadgesStepUncontrolledBadges } from '~/bundles/talent/enums/enums';
import {
    type BadgeFormItem,
    type BadgesFormDto,
} from '~/bundles/talent/types/types';

import { styles } from '../styles';

type Properties = {
    name: FieldPath<BadgesFormDto>;
    control: Control<BadgesFormDto, null>;
    isDisabled: boolean;
};

const BadgesGroup = ({ control, isDisabled }: Properties): JSX.Element => {
    const { fields, update } = useFieldArray<BadgesFormDto>({
        name: 'badges',
        control,
    });

    const uncontrolledBadges = Object.values(BsaBadgesStepUncontrolledBadges);

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
                        disabled={
                            uncontrolledBadges.includes(badge.name) ||
                            isDisabled
                        }
                    />
                    <Badge badge={badge} />
                </View>
            ))}
        </View>
    );
};

export { BadgesGroup };
