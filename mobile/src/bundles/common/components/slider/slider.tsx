import CommunitySlider, {
    type SliderProps,
} from '@react-native-community/slider';
import React from 'react';
import {
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import {
    useFormController,
    useWindowDimensions,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    thumbTitleValue?: string;
    containerStyle?: StyleProp<ViewStyle>;
    thumbTitleValueWidth?: number;
    onTitleChange?: (value: number) => string;
} & Omit<SliderProps, 'style' | 'value' | 'onValueChange'>;

const defaultMinSliderValue = 0;
const defaultMaxSliderValue = 10;
const defaultValueWidth = 70;

const Slider = <T extends FieldValues>({
    name,
    control,
    thumbTitleValue,
    containerStyle,
    thumbTitleValueWidth = defaultValueWidth,
    minimumValue = defaultMinSliderValue,
    maximumValue = defaultMaxSliderValue,
    onTitleChange,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const { width } = useWindowDimensions();
    const offset = (thumbTitleValueWidth / maximumValue) * value;
    const leftValue = (value * width) / maximumValue - offset;
    const title = onTitleChange ? onTitleChange(value) : thumbTitleValue;

    return (
        <View style={[globalStyles.pv5, containerStyle]}>
            <Text style={{ left: leftValue, width: thumbTitleValueWidth }}>
                {title}
            </Text>
            <CommunitySlider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor={Color.PRIMARY}
                maximumTrackTintColor={'#b3c3f2'}
                thumbTintColor={Color.PRIMARY}
                step={1}
                onValueChange={onChange}
                value={value}
                {...props}
            />
        </View>
    );
};

export { Slider };
