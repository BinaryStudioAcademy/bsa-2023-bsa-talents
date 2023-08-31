import React from 'react';

import logoImg from '~/assets/images/logo.png';
import { Image, StatusBar, View } from '~/bundles/common/components/components';
import { Color } from '~/bundles/common/enums/enums';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    children: React.ReactNode;
};

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
