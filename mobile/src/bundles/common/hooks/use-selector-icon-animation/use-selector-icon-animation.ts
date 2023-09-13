import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const useSelectorIconAnimation = (
    isVisible: boolean,
): Record<string, unknown> => {
    return useAnimatedStyle(() => {
        return {
            transform: [{ rotate: withTiming(isVisible ? '180deg' : '0deg') }],
        };
    });
};

export { useSelectorIconAnimation };
