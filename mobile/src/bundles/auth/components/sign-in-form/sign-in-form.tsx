import React from 'react';

import {
    Button,
    Header,
    Link,
    Text,
    View,
} from '~/bundles/common/components/components';
import { RootScreenName } from '~/bundles/common/enums/enums';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => {
    return (
        <View>
            <Text>Sign In</Text>
            <Button
                label="Sign in"
                onPress={(): void => {
                    // TODO: handle Sign in
                }}
            />
            <Link label="Go to Sign Up" to={`/${RootScreenName.SIGN_UP}`} />
            <Header />
        </View>
    );
};

export { SignInForm };
