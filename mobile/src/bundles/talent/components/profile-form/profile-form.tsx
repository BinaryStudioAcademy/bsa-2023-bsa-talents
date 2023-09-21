import React from 'react';

import {
    AutocompleteSelector,
    Button,
    CheckboxGroup,
    FormField,
    Input,
    ScrollView,
    Selector,
    Slider,
    View,
} from '~/bundles/common/components/components';
import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useEffect,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ProfileStepValidationRule } from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { ProfileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    EXPERIENCE_YEARS,
    TALENT_PROFILE_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

const jobTitleOptions = Object.values(JobTitle);
const locationOptions = Object.values(CountryList);
const employmentTypeOptions = Object.values(EmploymentType);

type Properties = {
    profileStepData: ProfileStepDto | null;
    onSubmit: (payload: ProfileStepDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ profileStepData, onSubmit }) => {
    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: profileStepData ?? TALENT_PROFILE_DEFAULT_VALUES,
        validationSchema: ProfileStepValidationSchema,
    });

    useEffect(() => {
        profileStepData && reset(profileStepData);
    }, [profileStepData, reset]);

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            onSubmit({
                ...data,
                salaryExpectation: +data.salaryExpectation,
            });
        })();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
            showsVerticalScrollIndicator={false}
        >
            <FormField
                errorMessage={errors.profileName?.message}
                label="Profile name"
                name="profileName"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="profileName"
                    placeholder='ex. "Java scripter" or ".Net hard-worker"'
                />
            </FormField>
            <FormField
                errorMessage={errors.salaryExpectation?.message}
                label="Salary expectations"
                name="salaryExpectation"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="salaryExpectation"
                    placeholder="0000"
                    keyboardType="numeric"
                    marker="$"
                    defaultValue={profileStepData?.salaryExpectation.toString()}
                    value={undefined}
                />
            </FormField>
            <FormField
                errorMessage={errors.jobTitle?.message}
                label="Job title"
                name="jobTitle"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={jobTitleOptions}
                    control={control}
                    name="jobTitle"
                    placeholder="Option"
                />
            </FormField>
            <FormField
                errorMessage={errors.experienceYears?.message}
                label="Experience"
                name="experienceYears"
                required
                containerStyle={globalStyles.pb25}
            >
                <Slider
                    name="experienceYears"
                    control={control}
                    thumbTitleValueWidth={100}
                    minimumValue={
                        ProfileStepValidationRule.MIN_YEARS_OF_EXPERIENCE
                    }
                    maximumValue={
                        ProfileStepValidationRule.MAX_YEARS_OF_EXPERIENCE
                    }
                    sliderOptions={EXPERIENCE_YEARS}
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
                errorMessage={errors.employmentType?.message}
                label="Employment type"
                name="employmentType"
                required
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="employmentType"
                    options={employmentTypeOptions}
                />
            </FormField>
            <FormField
                errorMessage={errors.description?.message}
                label="Introduce yourself"
                name="description"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="description"
                    placeholder="Candidates who share more about their experience have higher chances of getting a job offer"
                    numberOfLines={5}
                    multiline={true}
                />
            </FormField>
            <View style={globalStyles.flexDirectionRow}>
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { ProfileForm };
