import React from 'react';

import { Image, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { styles } from './style';

const ProjectContainer = (): JSX.Element => {
    return (
        <View>
            <Text category={TextCategory.BODY1} style={globalStyles.pb10}>
                Project
            </Text>
            {/* todo replace with actual data */}
            <Text
                category={TextCategory.CAPTION}
                style={[styles.text, globalStyles.pb10]}
            >
                6 weeks / 6 engineers, 2 QA / JS / Healthtech industry
            </Text>
            <Image
                // eslint-disable-next-line unicorn/prefer-module
                source={require('~/assets/images/project.png')}
            />
        </View>
    );
};

export { ProjectContainer };
