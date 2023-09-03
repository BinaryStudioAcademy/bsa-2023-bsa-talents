import React from 'react';
import { CountryList, EmploymentType, JobTitle } from 'shared/build/index.js';

import {
    Button,
    Checkbox,
    FormField,
    Input,
    ScrollView,
    Selector,
    Slider,
    View,
} from '~/bundles/common/components/components';
import { splitArrayInHalf } from '~/bundles/common/helpers/helpers';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type TalentOnboardingProfileDto } from '~/bundles/talent/types/types';
import { talentOnboardingProfileValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { TALENT_PROFILE_DEFAULT_VALUES } from './constants/constants';
import { styles } from './styles';

const jobTitleOptions = Object.values(JobTitle).map((title) => ({
    value: title,
    label: title,
}));

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));

const employmentTypeOptions = Object.values(EmploymentType).map((type) => ({
    value: type,
    label: type,
}));

const [column1Options, column2Options] = splitArrayInHalf(
    employmentTypeOptions,
);

const extractSelectedEmploymentTypes = (data: string[]): string[] => {
    return employmentTypeOptions
        .filter((_, index) => data[index])
        .map((option) => option.value);
};

type Properties = {
    onSubmit: (payload: TalentOnboardingProfileDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: TALENT_PROFILE_DEFAULT_VALUES,
        validationSchema: talentOnboardingProfileValidationSchema,
    });

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            data.salaryExpectation = Number(data.salaryExpectation);
            data.employmentTypes = extractSelectedEmploymentTypes(
                data.employmentTypes,
            );

            onSubmit(data);
        })();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[globalStyles.p25, styles.container]}
        >
            <FormField
                errors={errors}
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
                errors={errors}
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
                />
            </FormField>
            <FormField
                errors={errors}
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
                errors={errors}
                label="Experience Level"
                name="experienceYears"
                required
                containerStyle={globalStyles.pb25}
            >
                <Slider
                    thumbTitleValue="Beginner"
                    name="experienceYears"
                    control={control}
                    thumbTitleValueWidth={100}
                />
            </FormField>
            <FormField
                errors={errors}
                label="Current location"
                name="location"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    control={control}
                    name="location"
                    options={locationOptions}
                    placeholder="Option"
                />
            </FormField>
            <FormField
                errors={errors}
                label="Employment type"
                name="employmentTypes"
                required
                containerStyle={globalStyles.pb25}
            >
                <View
                    style={[
                        globalStyles.flexDirectionRow,
                        globalStyles.justifyContentSpaceBetween,
                        styles.employmentTypeContainer,
                    ]}
                >
                    <View style={globalStyles.flex1}>
                        {column1Options.map((option, index) => (
                            <Checkbox
                                key={option.label}
                                label={option.label}
                                name={`employmentTypes.${index}`}
                                control={control}
                            />
                        ))}
                    </View>
                    <View style={globalStyles.flex1}>
                        {column2Options.map((option, index) => (
                            <Checkbox
                                key={option.label}
                                label={option.label}
                                name={`employmentTypes.${
                                    column1Options.length + index
                                }`}
                                control={control}
                            />
                        ))}
                    </View>
                </View>
            </FormField>
            <FormField
                errors={errors}
                label="Briefly tell employers about your experience"
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
            <View style={globalStyles.flexDirectionRow}>
                <Button label="Back" disabled style={globalStyles.mr10} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { ProfileForm };
