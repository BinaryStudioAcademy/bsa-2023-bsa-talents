import React from 'react';

import employerComoanyLogo from '~/assets/images/company_logo.png';
import employerProfilePhoto from '~/assets/images/employer_profile.png';
import {
    AutocompleteSelector,
    AvatarPicker,
    Button,
    FormField,
    Image,
    Input,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { CountryList } from '~/bundles/employer/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';
import { EmployerOnboardingFormValidationSchema } from '~/bundles/employer/validation-schemas/validation-schemas';

import { EMPLOYER_ONBOARDING_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

const locationOptions = Object.values(CountryList);
const defaultProfilePhoto = Image.resolveAssetSource(employerProfilePhoto).uri;
const defaultCompanyLogo = Image.resolveAssetSource(employerComoanyLogo).uri;

type Properties = {
    employerOnboardingData: EmployerOnboardingFormDto | null;
    onSubmit: () => void;
};

const EmployerOnboardingForm: React.FC<Properties> = ({
    employerOnboardingData,
    onSubmit,
}) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues:
            employerOnboardingData ?? EMPLOYER_ONBOARDING_DEFAULT_VALUES,
        validationSchema: EmployerOnboardingFormValidationSchema,
    });

    const handleFormSubmit = useCallback(() => {
        //TODO logic saving employer data
        void handleSubmit(() => {
            onSubmit();
        })();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <Text
                category={TextCategory.H4}
                style={[globalStyles.mb15, styles.title]}
            >
                Create a profile to find a perfect match to your company
            </Text>
            <Text category={TextCategory.H6} style={globalStyles.mb10}>
                Please, fill out all the fields below, so we could verify your
                company
            </Text>
            <View
                style={[
                    globalStyles.width100,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceAround,
                    globalStyles.mb25,
                ]}
            >
                <View>
                    <FormField
                        errorMessage={
                            errors.profilePhoto && 'Profile photo is required'
                        }
                        name="profilePhoto"
                        containerStyle={globalStyles.alignItemsCenter}
                    >
                        <AvatarPicker
                            isSingleAvatarView
                            control={control}
                            uri={defaultProfilePhoto}
                            name="profilePhoto"
                        />
                    </FormField>
                    <Text category={TextCategory.H6}>Profile photo</Text>
                </View>
                <View>
                    <FormField
                        errorMessage={
                            errors.companyLogo && 'Company logo is required'
                        }
                        name="companyLogo"
                        containerStyle={globalStyles.alignItemsCenter}
                    >
                        <AvatarPicker
                            isSingleAvatarView
                            control={control}
                            uri={defaultCompanyLogo}
                            customAvatarStyle={styles.companyLogo}
                            name="companyLogo"
                        />
                    </FormField>
                    <Text category={TextCategory.H6}>Company logo</Text>
                </View>
            </View>
            <FormField
                errorMessage={errors.fullName?.message}
                label="Full name"
                name="fullName"
                required
                containerStyle={globalStyles.pb15}
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
                containerStyle={globalStyles.pb15}
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
                containerStyle={globalStyles.pb15}
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
                containerStyle={globalStyles.pb15}
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
                containerStyle={globalStyles.pb15}
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
                label="Location"
                name="location"
                required
                containerStyle={globalStyles.pb15}
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
            <Button
                label="Submit for verification"
                onPress={handleFormSubmit}
                style={globalStyles.mt25}
            />
        </ScrollView>
    );
};

export { EmployerOnboardingForm };
