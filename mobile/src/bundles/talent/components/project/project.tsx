import React from 'react';

import { Image, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

const Project = (): JSX.Element => {
    return (
        <View style={[globalStyles.pv20, globalStyles.ph15]}>
            <Text category={TextCategory.H4} style={globalStyles.pb10}>
                Project
            </Text>
            {/* todo replace with actual data */}
            <Text>6 weeks / 6 engineers, 2 QA / JS / Healthtech industry</Text>
            <Image
                // eslint-disable-next-line unicorn/prefer-module
                source={require('~/assets/images/project.png')}
            />
        </View>
    );
};

export { Project };
