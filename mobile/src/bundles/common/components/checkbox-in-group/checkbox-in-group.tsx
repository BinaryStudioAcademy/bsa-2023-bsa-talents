import CheckBox, { type CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = CheckBoxProps & {
    label?: string;
    isChecked: boolean;
    onChange: (value: boolean) => void;
    containerStyle?: StyleProp<ViewStyle>;
};

const CheckboxInGroup = ({
    label,
    isChecked,
    onChange,
    containerStyle,
    ...props
}: Properties): JSX.Element => {
    const toggleCheckbox = (): void => {
        onChange(!isChecked);
    };

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
                tintColors={{ true: Color.PRIMARY, false: Color.INPUT }}
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

export { CheckboxInGroup };
