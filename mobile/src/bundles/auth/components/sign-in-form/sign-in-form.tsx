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
import { userSignUpValidationSchema } from '~/bundles/users/users';

import { USER_SIGN_IN_DEFAULT_VALUES } from './constants/constants';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
        validationSchema: userSignUpValidationSchema,
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
            <Text category={TextCategory.H4} style={globalStyles.pb25}>
                Hi! Login to your Account
            </Text>
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
            <Button
                style={[globalStyles.mt25, globalStyles.mb25]}
                label="Sign in"
                onPress={handleFormSubmit}
            />
            <View style={globalStyles.flexDirectionRow}>
                <Text>Not Registered Yet? </Text>
                <Link
                    label="Create an account"
                    to={`/${RootScreenName.SIGN_UP}`}
                />
            </View>
        </View>
    );
};

export { SignInForm };
