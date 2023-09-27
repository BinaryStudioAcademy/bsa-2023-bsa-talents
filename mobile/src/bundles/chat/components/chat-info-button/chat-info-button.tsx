import React from 'react';

import {
    CommunityIcon,
    Pressable,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import {
    type EmployerBottomTabNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';

const ChatInfoButton: React.FC = () => {
    const { goBack } =
        useNavigation<
            NavigationProp<EmployerBottomTabNavigationParameterList>
        >();

    const handlePreviousPress = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <Pressable onPress={handlePreviousPress}>
            <CommunityIcon
                name={IconName.INFORMATION}
                size={35}
                color={Color.TEXT2}
            />
        </Pressable>
    );
};

export { ChatInfoButton };
