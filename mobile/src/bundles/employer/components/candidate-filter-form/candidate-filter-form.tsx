import React from 'react';

import {
    AutocompleteMultiSelector,
    Button,
    CheckboxGroup,
    Divider,
    FormField,
    MaterialIcon,
    Pressable,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import {
    Color,
    CountryList,
    EmploymentType,
    IconName,
    JobTitle,
    TextCategory,
} from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { ExperienceYears } from '~/bundles/employer/enums/enums';
import {
    type EmployeesFiltersForm,
    type UserDetailsSearchUsersRequestDto,
} from '~/bundles/employer/types/types';

import { DEFAULT_VALUES, HARD_SKILLS } from './constants/constants';
import { styles } from './styles';

const jobTitleOptions = Object.entries(JobTitle).map(([value, label]) => ({
    value,
    label,
}));
const locationOptions = Object.entries(CountryList).map(([value, label]) => ({
    value,
    label,
}));
const employmentTypeOptions = Object.values(EmploymentType);

const experienceYears = Object.entries(ExperienceYears).map(
    ([value, label]) => ({
        value,
        label,
    }),
);

type CandidatesFilterFormProperties = {
    onSubmit: (dto: UserDetailsSearchUsersRequestDto) => void;
    onFilterClose: () => void;
};
const CandidatesFilterForm: React.FC<CandidatesFilterFormProperties> = ({
    onFilterClose,
    onSubmit,
}) => {
    const { control, reset, handleSubmit } = useAppForm<EmployeesFiltersForm>({
        defaultValues: DEFAULT_VALUES,
    });

    const handleClearFilters = (): void => {
        reset();
    };

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.justifyContentSpaceBetween,
                    globalStyles.alignItemsFlexStart,
                ]}
            >
                <Text
                    category={TextCategory.H5}
                    style={[globalStyles.pb25, globalStyles.alignSelfCenter]}
                >
                    Filters
                </Text>
                <TouchableOpacity onPress={handleClearFilters}>
                    <Text
                        category={TextCategory.LABEL}
                        style={[
                            globalStyles.mt5,
                            globalStyles.ml25,
                            styles.resetFilter,
                        ]}
                    >
                        Clear filters
                    </Text>
                </TouchableOpacity>
                <Pressable>
                    <MaterialIcon
                        name={IconName.CLOSE}
                        size={25}
                        color={Color.PRIMARY}
                        onPress={onFilterClose}
                    />
                </Pressable>
            </View>
            <Divider containerStyle={globalStyles.mb25} />

            <FormField
                containerStyle={globalStyles.pb25}
                name="searchActiveCandidatesOnly"
            >
                <Switch
                    name="searchActiveCandidatesOnly"
                    control={control}
                    label="Active searching talents only"
                />
            </FormField>
            <FormField
                label="Job title"
                name="jobTitle"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={jobTitleOptions}
                    control={control}
                    name="jobTitle"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="Years of experience"
                name="yearsOfExperience"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={experienceYears}
                    control={control}
                    name="yearsOfExperience"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField label="Hard Skills" name="hardSkills">
                <AutocompleteMultiSelector
                    items={HARD_SKILLS}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="BSA characteristics"
                name="userBsaCharacteristics"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={BSA_CHARACTERISTICS}
                    control={control}
                    name="userBsaCharacteristics"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="BSA project name"
                name="userBsaProject"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    placeholder="Start typing and choose option"
                    control={control}
                    name="userBsaProject"
                    items={BSA_PROJECT}
                />
            </FormField>
            <FormField
                label="Location"
                name="location"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    control={control}
                    name="location"
                    items={locationOptions}
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="Level of English"
                name="englishLevel"
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="englishLevel"
                    options={ENGLISH_LEVEL}
                />
            </FormField>
            <FormField
                label="Employment type"
                name="employmentType"
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="employmentType"
                    options={employmentTypeOptions}
                />
            </FormField>
            <Button
                style={globalStyles.mb25}
                label="Show results"
                onPress={handleFormSubmit}
            />
            <View style={globalStyles.mb25} />
        </>
    );
};

export { CandidatesFilterForm };
