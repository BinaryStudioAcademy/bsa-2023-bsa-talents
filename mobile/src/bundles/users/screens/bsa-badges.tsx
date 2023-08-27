import React from 'react';

import { Checkbox } from '~/bundles/auth/components/checkbox/checkbox';
import {
    Button,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { Badge } from '../components/badge/badge';
import {
    DEFAULT_VALUE_IS_CHECKED,
    DEFAULT_VALUE_IS_DISABLED,
} from '../components/badge/constants/constants';
import { BadgeType } from '../enums/enums';

const values = Object.values(BadgeType);

const BsaBadges: React.FC = () => {
    const { control, handleSubmit } = useAppForm({
        defaultValues: DEFAULT_VALUE_IS_CHECKED,
    });

    const handleFormSubmit = useCallback((): void => {
        //void handleSubmit(onSubmit)();
    }, [handleSubmit]);

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
        <View style={globalStyles.p25}>
            <View style={globalStyles.mb25}>
                <Text>Some header</Text>
            </View>
            <Text
                category={TextCategory.BODY1}
                style={[globalStyles.mb25, { width: '80%' }]}
            >
                Choose BSA badges you want to show in your profile
            </Text>
            <ScrollView>{renderBadges}</ScrollView>
            <View style={[globalStyles.flexDirectionRow, globalStyles.mt25]}>
                <Button
                    style={[globalStyles.mr15, globalStyles.ph25]}
                    label="Back"
                    buttonType={ButtonType.OUTLINE}
                />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </View>
    );
};

export { BsaBadges };
