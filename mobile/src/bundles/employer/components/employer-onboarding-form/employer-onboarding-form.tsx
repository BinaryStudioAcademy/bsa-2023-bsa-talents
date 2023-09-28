import React from 'react';

import { actions } from '~/bundles/auth/store';
import {
    AutocompleteSelector,
    Button,
    FormField,
    Input,
    PhotoPicker,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
    Country,
    EmployerBottomTabScreenName,
    IconName,
} from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
    useEffect,
    useRoute,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EmployerDataSubmitLabel } from '~/bundles/employer/enums/enums';
import { type EmployerOnboardingFormDto } from '~/bundles/employer/types/types';
import { EmployerOnboardingFormValidationSchema } from '~/bundles/employer/validation-schemas/validation-schemas';

import { EMPLOYER_ONBOARDING_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

type Properties = {
    employerOnboardingData: EmployerOnboardingFormDto | null;
    onSubmit: (payload: EmployerOnboardingFormDto) => void;
};

const locationOptions = Object.values(Country);

const EmployerOnboardingForm: React.FC<Properties> = ({
    employerOnboardingData,
    onSubmit,
}) => {
    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues:
            employerOnboardingData ?? EMPLOYER_ONBOARDING_DEFAULT_VALUES,
        validationSchema: EmployerOnboardingFormValidationSchema,
    });

    useEffect(() => {
        employerOnboardingData && reset(employerOnboardingData);
    }, [employerOnboardingData, reset]);

    const route = useRoute();
    const dispatch = useAppDispatch();

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    const handleRedirectToProfile = useCallback((): void => {
        dispatch(actions.onChangeToEmployerScreen());
    }, [dispatch]);

    const isEmployerProfileScreen =
        route.name === EmployerBottomTabScreenName.EMPLOYER_PROFILE;

    const labelForSubmitButton =
        isEmployerProfileScreen && employerOnboardingData
            ? EmployerDataSubmitLabel.SAVE
            : EmployerDataSubmitLabel.SUBMIT_FOR_VERIFICATION;

    return (
        <>
            <View
                style={[
                    globalStyles.width100,
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceAround,
                    globalStyles.alignItemsCenter,
                    globalStyles.mb25,
                ]}
            >
                <View style={styles.photoContainer}>
                    <FormField
                        errorMessage={
                            errors.photo && 'Profile photo is required'
                        }
                        name="photo"
                        containerStyle={globalStyles.alignItemsCenter}
                        label="Profile photo"
                        required
                    >
                        <PhotoPicker
                            control={control}
                            name="photo"
                            shouldHideButton
                            defaultIcon={IconName.PERSON}
                            uri={employerOnboardingData?.photoUrl}
                        />
                    </FormField>
                </View>
                <View style={styles.photoContainer}>
                    <FormField
                        name="companyLogo"
                        label="Company logo"
                        containerStyle={globalStyles.alignItemsCenter}
                    >
                        <PhotoPicker
                            control={control}
                            name="companyLogo"
                            shouldHideButton
                            defaultIcon={IconName.IMAGE}
                            customPhotoStyle={{
                                photoShape: globalStyles.borderRadius15,
                            }}
                            uri={employerOnboardingData?.companyLogoUrl}
                        />
                    </FormField>
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
                errorMessage={errors.employerPosition?.message}
                label="Your position"
                name="employerPosition"
                required
                containerStyle={globalStyles.pb15}
            >
                <Input
                    control={control}
                    name="employerPosition"
                    placeholder="Add text"
                />
            </FormField>
            <FormField
                errorMessage={errors.linkedinLink?.message}
                label="LinkedIn profile"
                name="linkedinLink"
                containerStyle={globalStyles.pb15}
                required
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
                required
            >
                <Input
                    control={control}
                    name="description"
                    placeholder="Text"
                    numberOfLines={5}
                    multiline={true}
                />
            </FormField>
            {!(employerOnboardingData && !isEmployerProfileScreen) && (
                <Button
                    label={labelForSubmitButton}
                    onPress={handleFormSubmit}
                    style={globalStyles.mt25}
                />
            )}
            {!isEmployerProfileScreen && (
                <Button
                    label="Go to the profile"
                    onPress={handleRedirectToProfile}
                    buttonType={ButtonType.OUTLINE}
                    style={globalStyles.mt10}
                    disabled={!employerOnboardingData}
                />
            )}
        </>
    );
};

export { EmployerOnboardingForm };
