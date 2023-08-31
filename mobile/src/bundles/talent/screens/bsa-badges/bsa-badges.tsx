import React from 'react';

// this component in another task bt-104
import { Checkbox } from '~/bundles/common/components/checkbox/checkbox';
import {
    Button,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { type TalentOnboardingScreenName } from '~/bundles/common/enums/enums';
import {
    ButtonType,
    TalentOnboardingScreenNumber,
    TextCategory,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useAppRoute,
    useCallback,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
import { type ValueOf } from '~/bundles/common/types/types';
import { Badge } from '~/bundles/talent/components/badge/badge';
import {
    DEFAULT_VALUE_IS_CHECKED,
    DEFAULT_VALUE_IS_DISABLED,
} from '~/bundles/talent/components/badge/constants/constants';
import { NewAccountHeader } from '~/bundles/talent/components/components';
import { BadgeType } from '~/bundles/talent/enums/enums';

import { styles } from './styles';

const values = Object.values(BadgeType);

const BsaBadges: React.FC = () => {
    const { control } = useAppForm({
        defaultValues: DEFAULT_VALUE_IS_CHECKED,
    });
    const { name } = useAppRoute();
    const stepTitle = name as ValueOf<typeof TalentOnboardingScreenName>;
    const stepNumber = TalentOnboardingScreenNumber[stepTitle];

    const handleFormSubmit = useCallback(() => {
        // TODO: add submit logic
        return null;
    }, []);

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
                    />
                    <Button label="Next" onPress={handleFormSubmit} />
                </View>
            </ScrollView>
        </View>
    );
};

export { BsaBadges };
