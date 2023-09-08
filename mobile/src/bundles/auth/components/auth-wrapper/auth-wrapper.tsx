import React from 'react';

import logoImg from '~/assets/images/logo-with-name.png';
import {
    Image,
    ScrollView,
    StatusBar,
} from '~/bundles/common/components/components';
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
            <ScrollView
                contentContainerStyle={[
                    globalStyles.defaultScreenPadding,
                    globalStyles.pb5,
                    styles.container,
                ]}
            >
                <Image
                    source={logoImg}
                    style={[globalStyles.alignSelfCenter, styles.img]}
                />
                {children}
            </ScrollView>
        </>
    );
};

export { AuthWrapper };
