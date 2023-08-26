import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text } from '~/bundles/common/components/components';

// import { styles } from './styles';

type Properties = {
    index: number;
    isFocused: boolean;
    routeName: string;
    onPress: () => void;
};

const Step: React.FC<Properties> = ({
    index,
    onPress,
    isFocused,
    routeName,
}) => {
    const number = 1;
    return (
        <Pressable key={index} onPress={onPress}>
            {isFocused ? (
                <Icon name="circle" color="gray" size={20} />
            ) : (
                <Icon name="circle-outline" color="gray" size={18} />
            )}
            <Text>Step {index + number}</Text>
            <Text>{routeName}</Text>
        </Pressable>
    );
};

export { Step };
