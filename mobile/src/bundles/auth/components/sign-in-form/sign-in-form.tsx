import React from 'react';

import { PasswordVisibilityToggle } from '~/bundles/auth/components/components';
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
import {
    useAppForm,
    useCallback,
    useVisibility,
} from '~/bundles/common/hooks/hooks';
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

    const { isVisible, toggleVisibility } = useVisibility(false);

    return (
        <View
            style={[
                globalStyles.defaultScreenPadding,
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
                <FormField
                    errorMessage={errors.email?.message}
                    required={true}
                    label="Email"
                    name="email"
                >
                    <Input
                        control={control}
                        name="email"
                        placeholder="Enter your email"
                    />
                </FormField>
                <FormField
                    errorMessage={errors.password?.message}
                    label="Password"
                    required={true}
                    name="password"
                >
                    <View>
                        <Input
                            control={control}
                            name="password"
                            placeholder="Enter your password"
                            secureTextEntry={!isVisible}
                        />
                        <PasswordVisibilityToggle
                            isPasswordVisible={isVisible}
                            onChangeVisibility={toggleVisibility}
                        />
                    </View>
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
                {/* TODO: Create forget password logic */}
                <Button
                    style={[globalStyles.mb15, globalStyles.pv15]}
                    label="Login"
                    onPress={handleFormSubmit}
                />
            </View>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsCenter,
                    globalStyles.m10,
                    styles.linkContainer,
                ]}
            >
                <Text style={styles.text}>Not Registered Yet?</Text>
                <Link
                    style={styles.linkSignUp}
                    label="Create an account"
                    link={`/${AuthScreenName.SIGN_UP}`}
                />
            </View>
        </View>
    );
};

export { SignInForm };
