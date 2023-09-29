import React from 'react';

import { actions as chatActions } from '~/bundles/chat/store';
import {
    CommunityIcon,
    Pressable,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import {
    type EmployerBottomTabNavigationParameterList,
    type NavigationProp,
} from '~/bundles/common/types/types';

type Properties = {
    chatId: string;
    userId?: string;
};

const ChatBackButton: React.FC<Properties> = ({ chatId, userId }) => {
    const { goBack } =
        useNavigation<
            NavigationProp<EmployerBottomTabNavigationParameterList>
        >();
    const dispatch = useAppDispatch();

    const handlePreviousPress = useCallback(() => {
        void dispatch(
            chatActions.leaveRoom({
                userId,
                chatId,
            }),
        );

        goBack();
    }, [chatId, dispatch, goBack, userId]);

    return (
        <Pressable onPress={handlePreviousPress}>
            <CommunityIcon
                name={IconName.ARROW_LEFT_CIRCLE}
                size={35}
                color={Color.TEXT2}
            />
        </Pressable>
    );
};

export { ChatBackButton };
