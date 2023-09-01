import React from 'react';

import { type UserSignInRequestDto } from '~/bundles/auth/types/types';
import { userSignInValidationSchema } from '~/bundles/auth/validation-schemas/validation-schemas';
import {
    Button,
    FormField,
    Input,
    Link,
    Text,
    View,
} from '~/bundles/common/components/components';
import { AuthScreenName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { USER_SIGN_IN_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
        validationSchema: userSignInValidationSchema,
    });
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <View
            style={[
                globalStyles.defaultScreenPadding,
                globalStyles.justifyContentCenter,
                globalStyles.borderRadius10,
                styles.container,
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
                <FormField errors={errors} label="Email" name="email">
                    <Input
                        control={control}
                        name="email"
                        placeholder="Enter your email"
                    />
                </FormField>
                <FormField errors={errors} label="Password" name="password">
                    <Input
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </FormField>
                <Link
                    textComponentCategory={TextCategory.CAPTION}
                    style={[
                        globalStyles.alignSelfFlexEnd,
                        globalStyles.pr10,
                        styles.linkForgotPassword,
                    ]}
                    label="Forgot Password?"
                    link={`/${AuthScreenName.SIGN_UP}`}
                />

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
                    globalStyles.mt20,
                ]}
            >
                <Text category={TextCategory.BODY1} style={styles.text}>
                    Not Registered Yet?{' '}
                </Text>

                <Link
                    textComponentCategory={TextCategory.BODY1}
                    style={[
                        globalStyles.alignSelfFlexEnd,
                        globalStyles.pr10,
                        styles.linkForgotPassword,
                    ]}
                    label="Create an account"
                    link={`/${AuthScreenName.SIGN_UP}`}
                />
            </View>
        </View>
    );
};

export { SignInForm };
