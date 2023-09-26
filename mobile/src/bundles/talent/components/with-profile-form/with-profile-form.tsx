import React from 'react';

import { Pressable, ScrollView } from '~/bundles/common/components/components';
import {
    useAppForm,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/global-styles/global-styles';
import {
    type Control,
    type DefaultValues,
    type FieldErrors,
    type FieldValues,
    type ObjectSchema,
    type ValueOf,
} from '~/bundles/common/types/types';
import { OnboardingButtons } from '~/bundles/talent/components/onboarding-buttons/onboarding-buttons';
import { ProfileScreenButtons } from '~/bundles/talent/components/profile-screen-buttons/profile-screen-buttons';
import { TalentFormType } from '~/bundles/talent/enums/talent-form-type/talent-form-type.enum';

import { styles } from './styles';

type Properties<T extends FieldValues> = {
    defaultValue: DefaultValues<T>;
    value: DefaultValues<T | null>;
    onSubmit: (data: T) => void;
    validationSchema: ObjectSchema<T>;
    formType: ValueOf<typeof TalentFormType>;
    renderedForm: React.ComponentType<{
        control: Control<T>;
        errors: FieldErrors<T>;
        isEditable: boolean;
    }>;
    currentStep?: number;
    isFormEditable?: boolean;
};
const WithProfileForm = <T extends FieldValues>({
    value,
    validationSchema,
    defaultValue,
    onSubmit,
    renderedForm,
    formType,
    currentStep,
    isFormEditable = true,
}: Properties<T>): JSX.Element => {
    const [isEditable, setIsEditable] = useState(isFormEditable);

    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: value ?? defaultValue,
        validationSchema,
    });

    useEffect(() => {
        value && reset(value);
    }, [value, reset]);

    const handleFormSubmit = useCallback(() => {
        void handleSubmit(onSubmit)();
        setIsEditable(false);
    }, [handleSubmit, onSubmit]);

    const handleFormReset = (): void => {
        reset(value as T);
        setIsEditable(false);
    };

    const handleFormEdit = (): void => {
        setIsEditable(true);
    };

    const isOnboardingScreen = formType === TalentFormType.ONBOARDING;

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
            showsVerticalScrollIndicator={false}
        >
            <Pressable pointerEvents={isEditable ? 'auto' : 'none'}>
                {React.createElement(renderedForm, {
                    control,
                    errors,
                    isEditable,
                })}
            </Pressable>

            {isOnboardingScreen ? (
                <OnboardingButtons
                    currentStep={currentStep ?? 0}
                    onFormSubmit={handleFormSubmit}
                />
            ) : (
                <ProfileScreenButtons
                    onFormEdit={handleFormEdit}
                    isEditable={isEditable}
                    onFormReset={handleFormReset}
                    onFormSubmit={handleFormSubmit}
                />
            )}
        </ScrollView>
    );
};

export { WithProfileForm };
