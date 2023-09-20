import React from 'react';

import { CheckBox, Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type CheckBoxProps,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';

type Properties = CheckBoxProps & {
    label?: string;
    isChecked: boolean;
    onChange: (value: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const Checkbox: React.FC<Properties> = ({
    label,
    isChecked,
    onChange,
    containerStyle,
    ...props
}) => {
    const toggleCheckbox = (): void => {
        onChange(!isChecked);
    };

    const checkboxColor = props.disabled ? Color.INPUT : Color.PRIMARY;

    return (
        <View
            style={[
                containerStyle,
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsFlexStart,
            ]}
        >
            <CheckBox
                value={isChecked}
                onValueChange={toggleCheckbox}
                tintColors={{ true: checkboxColor, false: Color.INPUT }}
                {...props}
            />
            {label && (
                <View style={[globalStyles.flex1, globalStyles.mt5]}>
                    <Text category={TextCategory.LABEL}>{label}</Text>
                </View>
            )}
        </View>
    );
};

export { Checkbox };
