import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Pressable, Text } from '~/bundles/common/components/components';
import { IconName, TextCategory } from '~/bundles/common/enums/enums';

import { globalStyles } from '../../styles/styles';
import { styles } from './styles';

type Properties = {
    skill: string;
    onPress: (skillLabel: string) => void;
};

const Tag: React.FC<Properties> = ({ skill, onPress }) => {
    return (
        <Pressable
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.borderRadius5,
                globalStyles.justifyContentSpaceAround,
                globalStyles.alignItemsCenter,
                globalStyles.p5,
                styles.tag,
            ]}
            onPress={(): void => {
                onPress(skill);
            }}
        >
            <Text category={TextCategory.LABEL}>{skill}</Text>
            <Icon name={IconName.CLOSE} size={15} color="#000" />
        </Pressable>
    );
};

export { Tag };
