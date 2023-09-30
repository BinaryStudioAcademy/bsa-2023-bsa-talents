import React from 'react';
import { type ProfileStepDto } from 'shared/build/bundles/talent-onboarding/types/profile-step/profile-step-dto';

import {
    AutocompleteSelector,
    CheckboxGroup,
    FormField,
    Input,
    Selector,
    Slider,
} from '~/bundles/common/components/components';
import {
    Country,
    EmploymentType,
    JobTitle,
} from '~/bundles/common/enums/enums';
import { useFormController } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type Control, type FieldErrors } from '~/bundles/common/types/types';
import { ProfileStepValidationRule } from '~/bundles/talent/enums/enums';

import { EXPERIENCE_YEARS } from './constants/constants';

type Properties = {
    control: Control<ProfileStepDto>;
    errors: FieldErrors<ProfileStepDto>;
    isEditable: boolean;
};

const jobTitleOptions = Object.values(JobTitle);
const locationOptions = Object.values(Country);
const employmentTypeOptions = Object.values(EmploymentType);

const ProfileFormData: React.FC<Properties> = ({
    control,
    errors,
    isEditable,
}) => {
    const { field } = useFormController({ name: 'salaryExpectation', control });
    const { value: salaryExpectation } = field;

    return (
        <>
            <FormField
                errorMessage={errors.profileName?.message}
                label="Profile name"
                name="profileName"
                required={isEditable}
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
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="salaryExpectation"
                    placeholder="0000"
                    keyboardType="numeric"
                    marker="$"
                    defaultValue={
                        salaryExpectation ? salaryExpectation.toString() : '0'
                    }
                    value={undefined}
                />
            </FormField>
            <FormField
                errorMessage={errors.jobTitle?.message}
                label="Job title"
                name="jobTitle"
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    options={jobTitleOptions}
                    control={control}
                    name="jobTitle"
                    placeholder="Option"
                    isIconShown={isEditable}
                />
            </FormField>
            <FormField
                errorMessage={errors.experienceYears?.message}
                label="Experience"
                name="experienceYears"
                required={isEditable}
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
                required={isEditable}
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteSelector
                    control={control}
                    name="location"
                    items={locationOptions}
                    placeholder="Option"
                    isIconShown={isEditable}
                />
            </FormField>
            <FormField
                errorMessage={errors.employmentType?.message}
                label="Employment type"
                name="employmentType"
                required={isEditable}
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
                required={isEditable}
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
        </>
    );
};

export { ProfileFormData };
