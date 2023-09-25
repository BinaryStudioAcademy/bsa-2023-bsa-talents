import React from 'react';

import {
    CommunitySlider,
    Text,
    View,
} from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import {
    useFormController,
    useWindowDimensions,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type Control,
    type FieldPath,
    type FieldValues,
    type SliderProps,
    type StyleProp,
    type ViewStyle,
} from '~/bundles/common/types/types';

import { SliderValues } from './constants/constants';
import { styles } from './styles';

type SliderOption = {
    value: string | number;
    label?: string;
};

type Properties<T extends FieldValues> = {
    control: Control<T, null>;
    name: FieldPath<T>;
    thumbTitleValue?: string;
    containerStyle?: StyleProp<ViewStyle>;
    thumbTitleValueWidth?: number;
    sliderOptions: SliderOption[];
} & Omit<SliderProps, 'style' | 'value' | 'onValueChange'>;

const Slider = <T extends FieldValues>({
    name,
    control,
    containerStyle,
    thumbTitleValueWidth = SliderValues.DEFAULT_WIDTH,
    minimumValue = SliderValues.DEFAULT_MIN_VALUE,
    maximumValue = SliderValues.DEFAULT_MAX_VALUE,
    sliderOptions,
    ...props
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });
    const { value, onChange } = field;
    const { width } = useWindowDimensions();
    const offset = (thumbTitleValueWidth / maximumValue) * value;
    const leftValue = (value * width) / maximumValue - offset;
    const title = sliderOptions.find(
        (option) => option.value === Number.parseFloat(value),
    );

    return (
        <View style={[globalStyles.pv5, containerStyle]}>
            <Text
                style={{
                    left: leftValue,
                    width: thumbTitleValueWidth,
                }}
            >
                {title?.label ?? value}
            </Text>
            <CommunitySlider
                style={styles.slider}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor={Color.PRIMARY}
                maximumTrackTintColor={'#b3c3f2'}
                thumbTintColor={Color.PRIMARY}
                step={0.5}
                onValueChange={onChange}
                value={Number(value)}
                {...props}
            />
        </View>
    );
};

export { Slider };
