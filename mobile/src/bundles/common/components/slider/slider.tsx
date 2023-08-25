import CommunitySlider from '@react-native-community/slider';
import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useWindowDimensions } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type SliderProperties = {
    thumbTitleValue: string;
    sliderValue: number;
    onSliderValueChange: (value: number) => void;
    onResetClickHandler: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    minSliderValue?: number;
    maxSliderValue?: number;
    thumbTitleValueWidth?: number;
    resetTitle?: string;
};

const defaultMinSliderValue = 0;
const defaultMaxSliderValue = 120;
const defaultValueWidth = 70;

const Slider: React.FC<SliderProperties> = ({
    sliderValue,
    onSliderValueChange,
    thumbTitleValue,
    containerStyle,
    maxSliderValue = defaultMaxSliderValue,
    minSliderValue = defaultMinSliderValue,
    thumbTitleValueWidth = defaultValueWidth,
    onResetClickHandler,
    resetTitle = 'no',
}) => {
    const { width } = useWindowDimensions();
    const offset = (thumbTitleValueWidth / maxSliderValue) * sliderValue;
    const leftValue = (sliderValue * width) / maxSliderValue - offset;
    return (
        <View style={[globalStyles.p5, containerStyle]}>
            <Text
                style={[{ left: leftValue, width: thumbTitleValueWidth }]}
                category={TextCategory.BODY1}
            >
                {thumbTitleValue}
            </Text>
            <CommunitySlider
                style={[styles.slider]}
                minimumValue={minSliderValue}
                maximumValue={maxSliderValue}
                minimumTrackTintColor={Color.PRIMARY}
                maximumTrackTintColor={'#b3c3f2'}
                thumbTintColor={Color.PRIMARY}
                step={1}
                value={sliderValue}
                onValueChange={onSliderValueChange}
            />
            <Pressable onPress={onResetClickHandler} style={[globalStyles.p5]}>
                <Text>{resetTitle}</Text>
            </Pressable>
        </View>
    );
};

export { Slider };
