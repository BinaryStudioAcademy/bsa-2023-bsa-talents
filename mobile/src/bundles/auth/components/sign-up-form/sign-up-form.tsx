import React from 'react';
import { type RadioButtonProps } from 'react-native-radio-buttons-group';

import { type UserSignUpRequestDto } from '~/bundles/auth/types/types';
import { userSignUpValidationSchema } from '~/bundles/auth/validation-schemas/validation-schemas';
import {
    Button,
    FormField,
    Input,
    Link,
    RadioButtons,
    Text,
    View,
} from '~/bundles/common/components/components';
import { AuthScreenName, TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback, useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { UserRole } from '~/bundles/users/enums/enums';

import { USER_SIGN_UP_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};
const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: USER_SIGN_UP_DEFAULT_VALUES,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    const radioButtons: RadioButtonProps[] = useMemo(
        () => [
            {
                id: UserRole.EMPLOYER,
                label: 'I`m hiring',
            },
            {
                id: UserRole.TALENT,
                label: 'I`m looking for a job',
            },
        ],
        [],
    );

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
                    globalStyles.pb15,
                    globalStyles.alignSelfCenter,
                    styles.title,
                ]}
            >
                Sign Up
            </Text>
            <View style={styles.formWrapper}>
                <FormField
                    errorMessage={errors.email?.message}
                    label="Email"
                    name="email"
                    required
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
                    label="Sign up"
                    onPress={handleFormSubmit}
                    style={[globalStyles.mt15, globalStyles.pv15]}
                />
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentCenter,
                    ]}
                >
                    <RadioButtons
                        radioButtons={radioButtons}
                        control={control}
                        layout="row"
                        name="role"
                    />
                </View>
            </View>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentCenter,
                    globalStyles.mt20,
                ]}
            >
                <Text style={styles.text}>Already have an account? </Text>
                <Link
                    style={styles.linkToSignIn}
                    label="Sign In"
                    link={`/${AuthScreenName.SIGN_IN}`}
                />
            </View>
        </View>
    );
};

export { SignUpForm };
