import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';

import { styles } from './styles';

type Properties = {
    isPasswordVisible: boolean;
    setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordVisibilityToggle: React.FC<Properties> = ({
    isPasswordVisible,
    setIsPasswordVisible,
}) => {
    return (
        <TouchableOpacity
            style={styles.icon}
            onPress={(): void => {
                setIsPasswordVisible((previous) => !previous);
            }}
        >
            <Icon
                name={
                    isPasswordVisible
                        ? IconName.VISIBILITY_OFF
                        : IconName.VISIBILITY
                }
                size={20}
                color={Color.PRIMARY}
            />
        </TouchableOpacity>
    );
};

export { PasswordVisibilityToggle };
