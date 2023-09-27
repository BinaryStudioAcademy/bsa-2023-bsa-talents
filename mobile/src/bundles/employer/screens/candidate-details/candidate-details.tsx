import React from 'react';

import {
    Button,
    Divider,
    ScrollView,
    TalentInfoDetails,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { RootScreenName } from '~/bundles/common/enums/navigation/root-screen-name.enum';
import {
    useAppRoute,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    type NavigationProp,
    type RootNavigationParameterList,
    type UserDetailsResponseDto,
} from '~/bundles/common/types/types';

const CandidateDetails: React.FC = () => {
    const route = useAppRoute();
    const talent = route.params as UserDetailsResponseDto;
    const navigation =
        useNavigation<NavigationProp<RootNavigationParameterList>>();

    const handleContactToTalent = useCallback(() => {
        navigation.navigate(RootScreenName.CONTACT_CANDIDATE, {
            talendId: talent.userId,
        });
    }, [navigation, talent]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[globalStyles.defaultScreenPadding, globalStyles.mb25]}
        >
            <View style={[globalStyles.flexDirectionRow]}>
                <TouchableOpacity style={globalStyles.flexDirectionRow}>
                    <Text>Candidates</Text>
                    <Text>&gt;</Text>
                </TouchableOpacity>
                <Text>{talent.jobTitle}</Text>
            </View>
            <Divider />
            <TalentInfoDetails talent={talent} />
            <Button
                style={globalStyles.mb25}
                onPress={handleContactToTalent}
                label="Contact Candidate"
            />
        </ScrollView>
    );
};

export { CandidateDetails };
