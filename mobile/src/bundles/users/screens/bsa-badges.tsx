import React from 'react';

import {
    Button,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { ButtonType, TextCategory } from '~/bundles/common/enums/enums';
// import { useAppForm } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { Badge } from '../components/badge/badge';
import { BadgeType } from '../enums/enums';

const values = Object.values(BadgeType);

const renderBadges = values.map((badge) => (
    <Badge key={badge} badgeType={badge} />
));

const BsaBadges: React.FC = () => {
    // const { errors, handleSubmit } = useAppForm({
    //     defaultValues: {
    //         checked: true
    //     },
    // });

    // console.log(typeof  errors);

    return (
        <View style={[globalStyles.p25]}>
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
                    // errors={errors}
                />
                <Button label="Next" />
            </View>
        </View>
    );
};

export { BsaBadges };
