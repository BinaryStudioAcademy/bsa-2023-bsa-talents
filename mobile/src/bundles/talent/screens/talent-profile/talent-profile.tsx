import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    CommunityIcon,
    Pressable,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './style';

const TalentProfile: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isApproved } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View
                style={[
                    globalStyles.pv25,
                    globalStyles.pl25,
                    globalStyles.pr10,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    styles.header,
                ]}
            >
                <Text category={TextCategory.H3}>Your profile</Text>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentFlexEnd,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    {!isApproved && <VerificationMessage />}
                    <Pressable onPress={handleLogout}>
                        <CommunityIcon
                            name={IconName.LOGOUT}
                            size={30}
                            color={Color.TEXT2}
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export { TalentProfile };
