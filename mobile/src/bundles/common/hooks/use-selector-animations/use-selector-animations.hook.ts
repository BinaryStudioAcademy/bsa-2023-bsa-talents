import { useAnimatedStyle, withTiming } from '~/bundles/common/hooks/hooks';

import {
    INITIAL_DROPDOWN_HEIGHT,
    MAX_DROPDOWN_HEIGHT,
} from './constants/constants';

type useSelectorAnimationsReturn = {
    iconAnimatedStyle: Record<string, unknown>;
    heightAnimatedStyle: Record<string, unknown>;
};
const useSelectorAnimations = (
    isVisible: boolean,
): useSelectorAnimationsReturn => {
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
