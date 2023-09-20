import React from 'react';

import {
    ScrollView,
    StatusBar,
    Text,
    View,
} from '~/bundles/common/components/components';
import { Color, TextCategory } from '~/bundles/common/enums/enums';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerOnboardingForm } from '~/bundles/employer/components/components';

import { styles } from './styles';

const EmployerProfile: React.FC = () => {
    const handleEmployerDataSubmit = useCallback(() => {
        // TODO: handle employer onboarding
    }, []);

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={Color.BACKGROUND}
            />
            <View style={[globalStyles.p25, styles.header]}>
                <Text category={TextCategory.H3}>My profile</Text>
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
