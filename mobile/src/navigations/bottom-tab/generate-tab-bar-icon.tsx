import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Properties = {
    name: string;
    color: string;
};

const generateTabBarIcon = ({ name, color }: Properties): React.ReactNode => {
    const defaultSize = 24;

    return <Icon name={name} size={defaultSize} color={color} />;
};

export { generateTabBarIcon };
