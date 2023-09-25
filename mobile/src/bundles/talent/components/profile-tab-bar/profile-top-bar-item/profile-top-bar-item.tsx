import React from 'react';

import { Text, TouchableOpacity } from '~/bundles/common/components/components';

import { styles } from './styles';

type ProfileTopBarItemProperties = {
    isFocused: boolean;
    onPress: () => void;
    routeName: string;
};

const ProfileTabBarItem: React.FC<ProfileTopBarItemProperties> = ({
    onPress,
    routeName,
    isFocused,
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[isFocused && styles.active]}>{routeName}</Text>
        </TouchableOpacity>
    );
};

export { ProfileTabBarItem };
