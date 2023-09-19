import React from 'react';
import { type ValueOf } from 'shared/build/index';

import {
    AutocompleteSelector,
    Button,
    FormField,
    Input,
    PhotoPicker,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    CountryList,
    IconName,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type LabelForButtonEmployerProfile } from '~/bundles/employer/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';
import { EmployerOnboardingFormValidationSchema } from '~/bundles/employer/validation-schemas/validation-schemas';

import { EMPLOYER_ONBOARDING_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

const locationOptions = Object.values(CountryList);

type Properties = {
    employerOnboardingData: EmployerOnboardingFormDto | null;
    onSubmit: () => void;
    labelForSubmitButton: ValueOf<typeof LabelForButtonEmployerProfile>;
};

const EmployerOnboardingForm: React.FC<Properties> = ({
    employerOnboardingData,
    onSubmit,
    labelForSubmitButton,
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
        <>
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
                        <PhotoPicker
                            control={control}
                            name="profilePhoto"
                            shouldHideButton
                            defaultIcon={IconName.PERSON}
                            customPhotoStyle={{
                                defaultPhotoContainer: [
                                    styles.defaultContainer,
                                    styles.employerProfileContainer,
                                ],
                                defaultPhoto: [
                                    styles.defaultPhoto,
                                    styles.employerPhoto,
                                ],
                            }}
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
                        <PhotoPicker
                            control={control}
                            name="companyLogo"
                            shouldHideButton
                            defaultIcon={IconName.AUTO_GRAPH}
                            customPhotoStyle={{
                                defaultPhotoContainer: [
                                    styles.defaultContainer,
                                    styles.companyLogoContainer,
                                ],
                                defaultPhoto: [
                                    styles.defaultPhoto,
                                    styles.companyLogo,
                                ],
                                photoShape: styles.photoShape,
                            }}
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
                label="Briefly tell about your company and its values"
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
                label={labelForSubmitButton}
                onPress={handleFormSubmit}
                style={globalStyles.mt25}
            />
        </>
    );
};

export { EmployerOnboardingForm };
