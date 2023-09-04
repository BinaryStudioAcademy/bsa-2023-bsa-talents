import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Checkbox } from '~/bundles/common/components/checkbox/checkbox';
import {
    Button,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    TalentOnboardingScreenName,
    TalentOnboardingScreenNumber,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useAppRoute,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import {
    type RootNavigationParameterList,
    type ValueOf,
} from '~/bundles/common/types/types';
import { Badge } from '~/bundles/talent/components/badge/badge';
import {
    DEFAULT_VALUE_IS_CHECKED,
    DEFAULT_VALUE_IS_DISABLED,
} from '~/bundles/talent/components/badge/constants/constants';
import { NewAccountHeader } from '~/bundles/talent/components/components';
import { BadgeType } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

const values = Object.values(BadgeType);

type formSubmitDto = Record<ValueOf<typeof BadgeType>, boolean>; // TODO: Change with shared dto

const BsaBadges: React.FC = () => {
    const { control, handleSubmit } = useAppForm<formSubmitDto>({
        defaultValues: DEFAULT_VALUE_IS_CHECKED,
    });
    const { navigate, goBack } =
        useNavigation<NavigationProp<RootNavigationParameterList>>();
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit((payload): void => {
            // eslint-disable-next-line no-console
            console.log(payload);
        })();
        navigate(TalentOnboardingScreenName.SKILLS_AND_PROJECTS);
    }, [handleSubmit, navigate]);

    const handlePreviousPress = useCallback((): void => {
        goBack();
    }, [goBack]);

    const renderBadges = values.map((badge) => (
        <View
            key={badge}
            style={[
                globalStyles.flexDirectionRow,
                globalStyles.alignItemsCenter,
            ]}
        >
            <Checkbox
                control={control}
                name={badge}
                disabled={DEFAULT_VALUE_IS_DISABLED[badge]}
            />
            <Badge badgeType={badge} />
        </View>
    ));

    return (
        <View style={globalStyles.flex1}>
            <NewAccountHeader title={stepTitle} currentStep={stepNumber} />
            <ScrollView style={globalStyles.ph25}>
                <Text
                    category={TextCategory.BODY1}
                    style={[globalStyles.pv15, styles.description]}
                >
                    Choose BSA badges you want to show in your profile
                </Text>
                <View>{renderBadges}</View>
                <View
                    style={[globalStyles.flexDirectionRow, globalStyles.mt20]}
                >
                    <Button
                        style={globalStyles.mr10}
                        label="Back"
                        buttonType={ButtonType.OUTLINE}
                        onPress={handlePreviousPress}
                    />
                    <Button label="Next" onPress={handleFormSubmit} />
                </View>
            </ScrollView>
        </View>
    );
};

export { BsaBadges };
