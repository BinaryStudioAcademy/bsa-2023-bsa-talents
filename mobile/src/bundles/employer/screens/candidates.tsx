import React from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { Button, Text, View } from '~/bundles/common/components/components';
import { useState } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { SearchCandidatesFilter } from '~/bundles/employer/components/components';

const Candidates: React.FC = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterAnimationStyle = useAnimatedStyle(() => {
        return {
            width: withTiming(isFilterOpen ? '100%' : '0%'),
            height: withTiming(isFilterOpen ? '100%' : '0%'),
        };
    });
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const onSearchHandler = (payload: unknown): unknown => {
        return payload;
    };
    const handleFilterToggle = (): void => {
        setIsFilterOpen((previous) => !previous);
    };
    return (
        <View style={globalStyles.flex1}>
            <Animated.View style={filterAnimationStyle}>
                <SearchCandidatesFilter
                    onSubmit={onSearchHandler}
                    onFilterClose={handleFilterToggle}
                />
            </Animated.View>
            <Text>Employer screen: Candidates</Text>
            <Button label="Open filter" onPress={handleFilterToggle} />
        </View>
    );
};

export { Candidates };
