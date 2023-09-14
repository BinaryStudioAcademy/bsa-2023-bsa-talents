import React from 'react';

import {
    AutocompleteSelector,
    Button,
    FormField,
    Input,
    ScrollView,
    View,
} from '~/bundles/common/components/components';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { AvatarPicker } from '~/bundles/talent/components/components';
import { CountryList } from '~/bundles/talent/enums/enums';

import { EMPLOYER_ONBOARDING_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

const locationOptions = Object.values(CountryList);

type Properties = {
    onSubmit: () => void;
};

const EmployerOnboardingForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: EMPLOYER_ONBOARDING_DEFAULT_VALUES,
    });

    const handleFormSubmit = useCallback(() => {
        void handleSubmit(() => {
            onSubmit();
        })();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <FormField
                errorMessage={
                    errors.profilePhoto && 'Profile photo is required'
                }
                name="profilePhoto"
                containerStyle={globalStyles.alignItemsCenter}
            >
                <AvatarPicker control={control} name="profilePhoto" />
            </FormField>
            <FormField
                errorMessage={errors.companyLogo && 'Company logo is required'}
                name="companyLogo"
                containerStyle={globalStyles.alignItemsCenter}
            >
                <AvatarPicker control={control} name="companyLogo" />
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
                    placeholder="Add text"
                />
            </FormField>
            <FormField
                errorMessage={errors.position?.message}
                label="Your position"
                name="position"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="position"
                    placeholder="Add text"
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
                    placeholder="Add text"
                    marker="www."
                />
            </FormField>
            <FormField
                errorMessage={errors.companyName?.message}
                label="Company name"
                name="companyName"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="companyName"
                    placeholder="Add text"
                />
            </FormField>
            <FormField
                errorMessage={errors.companyWebsite?.message}
                label="Company website"
                name="companyWebsite"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="companyWebsite"
                    placeholder="Add text"
                    marker="www."
                />
            </FormField>
            <FormField
                errorMessage={errors.location?.message}
                label="Current location"
                name="location"
                required
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteSelector
                    control={control}
                    name="location"
                    items={locationOptions}
                    placeholder="Option"
                />
            </FormField>
            <FormField
                errorMessage={errors.description?.message}
                label="Briefly tell about your companyand its values"
                name="description"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="description"
                    placeholder="Text"
                    numberOfLines={5}
                    multiline={true}
                />
            </FormField>

            <View>
                <Button
                    label="Submit for verification"
                    onPress={handleFormSubmit}
                />
            </View>
        </ScrollView>
    );
};

export { EmployerOnboardingForm };
