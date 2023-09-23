import React from 'react';

import {
    ScrollView,
    StatusBar,
    Text,
    VerificationMessage,
    View,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useAppSelector, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

import { styles } from './styles';

const EmployerProfile: React.FC = () => {
    const handleEmployerDataSubmit = useCallback(() => {
        // TODO: handle employer onboarding
    }, []);

    const { isApproved } =
        useAppSelector(({ talents }) => talents.onboardingData) ?? {};

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
                <Text category={TextCategory.H3}>My profile</Text>
                {!isApproved && <VerificationMessage />}
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.container,
                    globalStyles.defaultScreenPadding,
                ]}
            >
                <EmployerOnboardingForm
                    employerOnboardingData={null}
                    onSubmit={handleEmployerDataSubmit}
                />
            </ScrollView>
        </>
    );
};

export { EmployerProfile };
