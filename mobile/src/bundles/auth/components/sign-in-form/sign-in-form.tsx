import React from 'react';

import {
    Button,
    Link,
    Text,
    View,
} from '~/bundles/common/components/components';
import { AuthScreenName } from '~/bundles/common/enums/enums';

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
            <Link label="Go to Sign Up" to={`/${AuthScreenName.SIGN_UP}`} />
        </View>
    );
};

export { SignInForm };
