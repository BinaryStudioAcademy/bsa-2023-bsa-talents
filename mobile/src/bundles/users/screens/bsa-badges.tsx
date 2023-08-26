import React from 'react';

import { Button, View } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { Badge } from '../components/badge/badge';

// import { Badge } from '../components/badge/badge';

const BsaBadges: React.FC = () => {
    return (
        <View style={[globalStyles.p25]}>
            <Badge />
            <Badge />
            <View style={[globalStyles.flexDirectionRow, globalStyles.mt25]}>
                <Button
                    style={[globalStyles.mr15, globalStyles.ph25]}
                    label="Back"
                    buttonType={ButtonType.OUTLINE}
                />
                <Button label="Next" />
            </View>
        </View>
    );
};

export { BsaBadges };
