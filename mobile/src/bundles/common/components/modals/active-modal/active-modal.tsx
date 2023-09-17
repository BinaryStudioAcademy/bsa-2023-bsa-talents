import React from 'react';

import {
    Button,
    RNModal,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from '../styles';

type Properties = {
    title: string;
    visible: boolean;
    acceptText?: string;
    children: React.ReactNode;
    onClose: () => void;
    onAccept?: () => void;
};

const ActiveModal: React.FC<Properties> = ({
    title,
    visible,
    acceptText = 'Accept',
    children,
    onClose,
    onAccept,
}) => {
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
                    <Text category={TextCategory.H4}>{title}</Text>
                    <View style={styles.content}>{children}</View>
                    <View
                        style={[
                            globalStyles.flexDirectionRow,
                            globalStyles.justifyContentFlexEnd,
                        ]}
                    >
                        <Button
                            buttonType={ButtonType.GHOST}
                            label="Cancel"
                            onPress={onClose}
                        />
                        {onAccept && (
                            <Button
                                buttonType={ButtonType.GHOST}
                                label={acceptText}
                                onPress={onAccept}
                            />
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </RNModal>
    );
};

export { ActiveModal };
