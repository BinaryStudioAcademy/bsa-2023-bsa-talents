import React from 'react';

import {
    Button,
    FilePicker,
    FormField,
    Input,
    PhotoPicker,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { OnboardingBackButton } from '~/bundles/talent/components/components';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';
import { cvAndContactsFormValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { CV_AND_CONTACTS_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    cvAndContactsStepData: CvAndContactsFormDto | null;
    onSubmit: (payload: CvAndContactsFormDto) => void;
    currentStep: number;
};

const CVAndContactsForm: React.FC<Properties> = ({
    cvAndContactsStepData,
    onSubmit,
    currentStep,
}) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: cvAndContactsStepData ?? CV_AND_CONTACTS_DEFAULT_VALUES,
        validationSchema: cvAndContactsFormValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
            showsVerticalScrollIndicator={false}
        >
            <FormField
                errorMessage={errors.photo && 'Photo is required'}
                name="photo"
                containerStyle={globalStyles.alignItemsCenter}
            >
                <PhotoPicker control={control} name="photo" />
            </FormField>
            <FormField
                errorMessage={errors.fullName?.message}
                label="Full name"
                name="fullName"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="fullName"
                    placeholder="Name Name"
                />
            </FormField>
            <FormField
                errorMessage={errors.phone?.message}
                label="Phone number"
                name="phone"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="phone"
                    placeholder="+38000 000 00 00"
                    keyboardType="phone-pad"
                />
            </FormField>
            <FormField
                errorMessage={errors.linkedinLink?.message}
                label="Linkedin profile"
                name="linkedinLink"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="linkedinLink"
                    placeholder="Link to linkedin profile"
                    marker="www."
                />
            </FormField>
            <FormField
                errorMessage={errors.cv && 'CV is required'}
                label="CV"
                name="cv"
                required
                containerStyle={globalStyles.pb25}
            >
                <FilePicker
                    label="Choose file"
                    control={control}
                    name="cv"
                    style={[globalStyles.borderRadius5, styles.buttonContainer]}
                />
            </FormField>
            <View
                style={[
                    globalStyles.p15,
                    globalStyles.mb25,
                    globalStyles.borderRadius5,
                    styles.captionContainer,
                ]}
            >
                <Text category={TextCategory.CAPTION}>
                    Job search is anonymous. This information will be seen only
                    in case you share it.
                </Text>
            </View>
            <View style={globalStyles.flexDirectionRow}>
                <OnboardingBackButton currentStep={currentStep} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { CVAndContactsForm };
