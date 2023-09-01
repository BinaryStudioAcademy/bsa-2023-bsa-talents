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
import {
    AuthScreenName,
    Color,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback, useMemo } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles';
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
                value: 'option1',
                color: Color.PRIMARY,
                borderColor: Color.INPUT,
            },
            {
                id: UserRole.TALENT,
                label: 'I`m looking for a job',
                value: 'option2',
                color: Color.PRIMARY,
                borderColor: Color.INPUT,
            },
        ],
        [],
    );

    return (
        <View
            style={[
                globalStyles.defaultScreenPadding,
                globalStyles.flex1,
                globalStyles.justifyContentCenter,
                styles.wrapper,
            ]}
        >
            <Text
                category={TextCategory.H2}
                style={globalStyles.alignSelfCenter}
            >
                Sign Up
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
                    id="role"
                />
            </View>

            <Button
                label="Sign up"
                style={[globalStyles.mt25, globalStyles.pv15]}
                onPress={handleFormSubmit}
            />

            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignSelfCenter,
                    globalStyles.alignItemsCenter,
                ]}
            >
                <Text category={TextCategory.BODY1} style={styles.text}>
                    Already have an account?{' '}
                </Text>

                <Link
                    textComponentCategory={TextCategory.BODY1}
                    style={[
                        globalStyles.alignSelfFlexEnd,
                        globalStyles.pr10,
                        styles.linkToSignIn,
                    ]}
                    label="Sign In"
                    link={`/${AuthScreenName.SIGN_IN}`}
                />
            </View>
        </View>
    );
};

export { SignUpForm };
