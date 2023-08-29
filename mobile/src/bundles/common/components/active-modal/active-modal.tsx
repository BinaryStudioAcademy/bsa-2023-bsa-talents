import React from 'react';

import {
    RNModal,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    visible: boolean;
    children: React.ReactNode;
    onClose: () => void;
};

const ActiveModal: React.FC<Properties> = ({ visible, children, onClose }) => {
    return (
        <RNModal
            animationType="fade"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={[
                    styles.backdrop,
                    globalStyles.flex1,
                    globalStyles.justifyContentCenter,
                    globalStyles.alignItemsCenter,
                ]}
                onPress={onClose}
            >
                <View
                    style={[
                        styles.container,
                        globalStyles.p25,
                        globalStyles.borderRadius10,
                    ]}
                >
                    {children}
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};

export { ActiveModal };
