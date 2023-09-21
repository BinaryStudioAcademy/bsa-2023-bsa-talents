import React from 'react';

import { ChatBackButton } from '~/bundles/chat/components/components';
import { EMPLOYER } from '~/bundles/chat/constants/constants';
import { Avatar, Text, View } from '~/bundles/common/components/components';
import { PhotoType, TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

const ChatHeader: React.FC = () => {
    const avatar = (
        <Avatar
            avatarSize={PhotoType.MEDIUM}
            customPhotoStyle={{
                photoShape: globalStyles.borderRadius15,
                defaultPhoto: globalStyles.borderRadius15,
            }}
        />
    );

    const headerContent = (
        <View style={[globalStyles.flex1, globalStyles.ph10]}>
            <Text
                category={TextCategory.H4}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}
            >
                {EMPLOYER}
            </Text>
            <View
                style={[
                    globalStyles.flex1,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <View style={[globalStyles.mr5, styles.indicator]} />
                <Text style={styles.status}>Online</Text>
            </View>
        </View>
    );

    return (
        <View
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.justifyContentSpaceBetween,
                globalStyles.alignItemsCenter,
                globalStyles.pv25,
                globalStyles.ph15,
                styles.headerContainer,
            ]}
        >
            <View style={[globalStyles.flexDirectionRow, globalStyles.flex1]}>
                {avatar}
                {headerContent}
            </View>
            <ChatBackButton />
        </View>
    );
};

export { ChatHeader };
