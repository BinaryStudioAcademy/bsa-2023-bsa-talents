import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { RadioButton } from 'react-native-radio-buttons-group';
import { type RadioGroupProps } from 'react-native-radio-buttons-group/lib/types';

import { View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type RadioWrapperProperties<T extends FieldValues> = Omit<
    RadioGroupProps,
    'layout' | 'testID' | 'onPress'
> & {
    name: FieldPath<T>;
    control: Control<T, null>;
};
import { styles } from './styles';

const RadioWrapper = <T extends FieldValues>({
    name,
    control,
    radioButtons,
    containerStyle,
}: RadioWrapperProperties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const handlePress = (id: string): void => {
        onChange(id === value ? '' : id);
    };
    return (
        <View style={[globalStyles.flexDirectionRow, containerStyle]}>
            {radioButtons.map((button) => (
                <RadioButton
                    {...button}
                    key={button.id}
                    labelStyle={styles.labelStyle}
                    borderColor={Color.PRIMARY}
                    color={Color.PRIMARY}
                    selected={button.id === value}
                    onPress={(): void => {
                        handlePress(button.id);
                    }}
                />
            ))}
        </View>
    );
};

export { RadioWrapper };
