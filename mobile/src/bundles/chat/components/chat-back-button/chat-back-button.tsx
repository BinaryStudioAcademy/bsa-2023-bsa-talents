import React from 'react';

import { Button } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { useCallback, useNavigation } from '~/bundles/common/hooks/hooks';
import {
    type EmployerBottomTabNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';

const ChatBackButton: React.FC = () => {
    const { goBack } =
        useNavigation<
            NavigationProp<EmployerBottomTabNavigationParameterList>
        >();

    const handlePreviousPress = useCallback(() => {
        goBack();
    }, [goBack]);

    return (
        <Button
            label="Back"
            buttonType={ButtonType.OUTLINE}
            onPress={handlePreviousPress}
        />
    );
};

export { ChatBackButton };
