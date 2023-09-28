import React from 'react';

import {
    FilePicker,
    FormField,
    Input,
    PhotoPicker,
} from '~/bundles/common/components/components';
import { useAppSelector } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldErrors } from '~/bundles/common/types/types';
import { type CvAndContactsFormDto } from '~/bundles/talent/types/types';

import { styles } from './styles';

type Properties = {
    control: Control<CvAndContactsFormDto>;
    errors: FieldErrors<CvAndContactsFormDto>;
    isEditable: boolean;
};

const ContactsFormData: React.FC<Properties> = ({
    control,
    errors,
    isEditable,
}) => {
    const { photoUrl } =
        useAppSelector(({ common }) => common.onboardingData) ?? {};

    return (
        <>
            <FormField
                errorMessage={errors.photo && 'Photo is required'}
                name="photo"
                containerStyle={globalStyles.alignItemsCenter}
            >
                <PhotoPicker
                    shouldHideButton={!isEditable}
                    control={control}
                    name="photo"
                    uri={photoUrl as string}
                />
            </FormField>
            <FormField
                errorMessage={errors.fullName?.message}
                label="Full name"
                name="fullName"
                required={isEditable}
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
                required={isEditable}
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
                required={isEditable}
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
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <FilePicker
                    label="Choose file"
                    control={control}
                    name="cv"
                    style={[globalStyles.borderRadius5, styles.buttonContainer]}
                />
            </FormField>
        </>
    );
};

export { ContactsFormData };
