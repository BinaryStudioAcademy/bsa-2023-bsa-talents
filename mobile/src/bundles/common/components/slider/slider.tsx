import CommunitySlider, {
    type SliderProps,
} from '@react-native-community/slider';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useWindowDimensions } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type SliderProperties = {
    thumbTitleValue: string;
    containerStyle?: StyleProp<ViewStyle>;
    value: number;
    thumbTitleValueWidth?: number;
} & Omit<SliderProps, 'style' | 'value'>;

const defaultMinSliderValue = 0;
const defaultMaxSliderValue = 120;
const defaultValueWidth = 70;

const Slider: React.FC<SliderProperties> = ({
    thumbTitleValue,
    containerStyle,
    thumbTitleValueWidth = defaultValueWidth,
    value,
    minimumValue = defaultMinSliderValue,
    maximumValue = defaultMaxSliderValue,
    ...props
}) => {
    const { width } = useWindowDimensions();
    const offset = (thumbTitleValueWidth / maximumValue) * value;
    const leftValue = (value * width) / maximumValue - offset;
    return (
        <View style={[globalStyles.p5, containerStyle]}>
            <Text
                style={{ left: leftValue, width: thumbTitleValueWidth }}
                category={TextCategory.BODY1}
            >
                {thumbTitleValue}
            </Text>
            <CommunitySlider
                style={[styles.slider]}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor={Color.PRIMARY}
                maximumTrackTintColor={'#b3c3f2'}
                thumbTintColor={Color.PRIMARY}
                step={1}
                value={value}
                {...props}
            />
        </View>
    );
};

export { Slider };
