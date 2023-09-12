import React from 'react';

import { View } from '~/bundles/common/components/components';
import { globalStyles } from '~/bundles/common/styles/global-styles';

type Properties = {
    personalityType: string[];
    HRBadges: string[];
};

const Feedbacks = ({ personalityType, HRBadges }: Properties): JSX.Element => {
    return (
        <View style={[globalStyles.pv20, globalStyles.ph15]}>
            {personalityType} {HRBadges}
        </View>
    );
};

export { Feedbacks };
