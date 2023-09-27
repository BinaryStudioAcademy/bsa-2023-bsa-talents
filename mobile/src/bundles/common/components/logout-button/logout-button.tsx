import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    CommunityIcon,
    Pressable,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { useAppDispatch } from '~/bundles/common/hooks/hooks';

type Properties = {
    onPress?: () => void;
};

const LogoutButton: React.FC<Properties> = ({ onPress }) => {
    const dispatch = useAppDispatch();

    const handleLogout = (): void => {
        void dispatch(logout());
        onPress?.();
    };

    return (
        <Pressable onPress={handleLogout}>
            <CommunityIcon
                name={IconName.LOGOUT}
                size={30}
                color={Color.TEXT2}
            />
        </Pressable>
    );
};

export { LogoutButton };
