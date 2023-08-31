import React from 'react';

import { Image, StatusBar, View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    children: React.ReactNode;
};

// eslint-disable-next-line unicorn/prefer-module, @typescript-eslint/no-var-requires
const logoImg = require('~/assets/images/logo.png');

const AuthWrapper: React.FC<Properties> = ({ children }) => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={Color.TEXT} />
            <View
                style={[
                    globalStyles.flex1,
                    globalStyles.defaultScreenPadding,
                    globalStyles.alignItemsCenter,
                    styles.container,
                ]}
            >
                <Image source={logoImg} style={styles.img} />
                {children}
            </View>
        </>
    );
};

export { AuthWrapper };
