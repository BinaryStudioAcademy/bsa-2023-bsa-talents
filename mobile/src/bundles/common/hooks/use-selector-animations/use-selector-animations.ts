import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type useSelectorAnimationsReturn = {
    iconAnimatedStyle: Record<string, unknown>;
    heightAnimatedStyle: Record<string, unknown>;
};
const useSelectorAnimations = (
    isVisible: boolean,
): useSelectorAnimationsReturn => {
    const INITIAL_DROPDOWN_HEIGHT = 0;
    const MAX_DROPDOWN_HEIGHT = 150;
    const heightAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: withTiming(
                isVisible ? MAX_DROPDOWN_HEIGHT : INITIAL_DROPDOWN_HEIGHT,
                { duration: 400 },
            ),
            borderWidth: withTiming(+isVisible, { duration: 400 }),
        };
    });
    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: withTiming(isVisible ? '180deg' : '0deg') }],
        };
    });
    return { iconAnimatedStyle, heightAnimatedStyle };
};

export { useSelectorAnimations };
