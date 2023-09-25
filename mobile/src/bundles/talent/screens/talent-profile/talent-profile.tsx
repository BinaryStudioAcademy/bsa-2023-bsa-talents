import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    Button,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './style';

const TalentProfile: React.FC = () => {
    const { isApproved } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};
    const dispatch = useAppDispatch();
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
                    styles.header,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.H3}>Your profile</Text>
                {isApproved ? (
                    <Button
                        label="Logout"
                        style={[
                            globalStyles.ml5,
                            globalStyles.ph10,
                            globalStyles.pv5,
                        ]}
                        onPress={handleLogout}
                    />
                ) : (
                    <VerificationMessage />
                )}
            </View>
        </>
    );
};

export { TalentProfile };
