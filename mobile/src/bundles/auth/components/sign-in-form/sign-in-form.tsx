import React from 'react';

import {
    Button,
    FormField,
    Input,
    Link,
    Text,
    View,
} from '~/bundles/common/components/components';
import { RootScreenName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';

import { USER_SIGN_IN_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <View
            style={[
                globalStyles.ph25,
                globalStyles.flex1,
                globalStyles.justifyContentCenter,
            ]}
        >
            <Text
                category={TextCategory.H4}
                style={[
                    globalStyles.pb25,
                    globalStyles.alignSelfCenter,
                    styles.title,
                ]}
            >
                Hi! Login to your Account
            </Text>
            <View style={styles.formWrapper}>
                <FormField errors={errors} label="Email" name="email" required>
                    <Input
                        control={control}
                        name="email"
                        placeholder="Enter your email"
                    />
                </FormField>
                <FormField
                    errors={errors}
                    label="Password"
                    name="password"
                    required
                >
                    <Input
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </FormField>
                <Text
                    category={TextCategory.CAPTION}
                    style={[
                        globalStyles.alignSelfFlexEnd,
                        styles.linkForgotPassword,
                    ]}
                >
                    <Link label="Forgot Password?" to={''} />
                </Text>

                <Button
                    style={[globalStyles.mb25, globalStyles.pv15]}
                    label="Login"
                    onPress={handleFormSubmit}
                />
            </View>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignSelfCenter,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.BODY1} style={styles.text}>
                    Not Registered Yet?{' '}
                </Text>

                <Text
                    category={TextCategory.BODY1}
                    style={[
                        globalStyles.alignSelfFlexStart,
                        globalStyles.alignSelfFlexEnd,
                        globalStyles.pv25,
                        styles.linkSignUp,
                    ]}
                >
                    <Link
                        label="Create an account"
                        to={`/${RootScreenName.SIGN_UP}`}
                    />
                </Text>
            </View>
        </View>
    );
};

export { SignInForm };
