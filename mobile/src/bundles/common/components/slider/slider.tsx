import CommunitySlider from '@react-native-community/slider';
import React, { useState } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';

import { Pressable, Text, View } from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { convertInputToDate } from '~/bundles/common/helpers/helpers';
import { useCallback, useWindowDimensions } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type SliderProperties = {
    style?: StyleProp<ViewStyle>;
};

const minSliderValue = 0;
const maxSliderValue = 120;
const valueWidth = 70;

const Slider: React.FC<SliderProperties> = ({ style: viewStyle }) => {
    const [value, setValue] = useState(minSliderValue);
    const { width } = useWindowDimensions();
    const monthTitle = convertInputToDate(value);
    const resetValue = useCallback(() => {
        setValue(minSliderValue);
    }, []);
    const offset = (valueWidth / maxSliderValue) * value;
    const leftValue = (value * width) / maxSliderValue - offset;
    return (
        <View style={[globalStyles.p5, viewStyle]}>
            <View style={[globalStyles.flexDirectionRow]}>
                <Text category={TextCategory.LABEL} style={styles.label}>
                    Experience
                </Text>
                <Text category={TextCategory.LABEL} style={styles.label_icon}>
                    *
                </Text>
            </View>
            <Text
                style={[styles.value, { left: leftValue }]}
                category={TextCategory.BODY1}
            >
                {monthTitle}
            </Text>
            <CommunitySlider
                style={[styles.slider]}
                minimumValue={minSliderValue}
                maximumValue={maxSliderValue}
                minimumTrackTintColor={Color.PRIMARY}
                maximumTrackTintColor={'#b3c3f2'}
                thumbTintColor={Color.PRIMARY}
                step={1}
                value={value}
                onValueChange={setValue}
            />
            <Pressable onPress={resetValue} style={[globalStyles.p5]}>
                <Text>no</Text>
            </Pressable>
        </View>
    );
};

export { Slider };
