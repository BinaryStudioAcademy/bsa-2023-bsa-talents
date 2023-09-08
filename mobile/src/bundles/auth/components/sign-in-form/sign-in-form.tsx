import React from 'react';

import { type UserSignInForm } from '~/bundles/auth/types/types';
import { userSignInValidationSchema } from '~/bundles/auth/validation-schemas/validation-schemas';
import {
    Button,
    Checkbox,
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
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { USER_SIGN_IN_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: UserSignInForm) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInForm>({
        defaultValues: USER_SIGN_IN_DEFAULT_VALUES,
        validationSchema: userSignInValidationSchema,
    });
    const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit((userData) => {
            onSubmit({ ...userData, isRememberMeChecked });
        })();
    }, [isRememberMeChecked, handleSubmit, onSubmit]);

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
                    label="Email*"
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
                    label="Password*"
                    name="password"
                >
                    <Input
                        control={control}
                        name="password"
                        placeholder="Enter your password"
                        secureTextEntry
                    />
                </FormField>
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.ph25,
                        globalStyles.justifyContentSpaceAround,
                        globalStyles.alignItemsCenter,
                    ]}
                >
                    <Checkbox
                        label="Remember Me"
                        isChecked={isRememberMeChecked}
                        onChange={(): void => {
                            setIsRememberMeChecked(!isRememberMeChecked);
                        }}
                    />
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
                </View>

                <Button
                    style={[globalStyles.mb15, globalStyles.pv15]}
                    label="Login"
                    onPress={handleFormSubmit}
                />
            </View>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentCenter,
                    globalStyles.flex1,
                    globalStyles.m20,
                    styles.signUpWrapper,
                ]}
            >
                <Text style={styles.text}>Not Registered Yet? </Text>
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
