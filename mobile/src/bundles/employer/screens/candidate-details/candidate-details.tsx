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
import { TextCategory } from '~/bundles/common/enums/enums';
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

import { styles } from './styles';

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

    const handleReturnPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[globalStyles.defaultScreenPadding, globalStyles.mb25]}
        >
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.mb10,
                    styles.titleContainer,
                ]}
            >
                <TouchableOpacity
                    onPress={handleReturnPress}
                    style={globalStyles.flexDirectionRow}
                >
                    <Text
                        category={TextCategory.H5}
                        style={[globalStyles.mr10, styles.pressableText]}
                    >
                        Candidates
                    </Text>
                    <Text
                        category={TextCategory.H5}
                        style={styles.pressableText}
                    >
                        &gt;
                    </Text>
                </TouchableOpacity>
                <Text category={TextCategory.H5} style={styles.navigationTitle}>
                    {talent.jobTitle}
                </Text>
            </View>
            <Divider containerStyle={globalStyles.mb10} />
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
