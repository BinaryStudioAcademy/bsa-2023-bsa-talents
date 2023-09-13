import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const useSelectorHeightAnimation = (
    isVisible: boolean,
): Record<string, unknown> => {
    const INITIAL_DROPDOWN_HEIGHT = 0;
    const MAX_DROPDOWN_HEIGHT = 150;
    return useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(
                isVisible ? MAX_DROPDOWN_HEIGHT : INITIAL_DROPDOWN_HEIGHT,
                { duration: 400 },
            ),
            borderWidth: withTiming(+isVisible, { duration: 400 }),
        };
    });
};

export { useSelectorHeightAnimation };
