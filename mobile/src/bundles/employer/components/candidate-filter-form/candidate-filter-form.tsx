import React from 'react';

import {
    AutocompleteMultiSelector,
    Button,
    CheckboxGroup,
    Divider,
    FormField,
    MaterialIcon,
    Pressable,
    Selector,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { TextCategory } from '~/bundles/common/enums/styles/styles';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import { type EmployeesFiltersForm } from '~/bundles/employer/types/types';

import {
    BSA_CHARACTERISTICS,
    BSA_PROJECTS,
    DEFAULT_VALUES,
    EMPLOYMENT_TYPE_OPTIONS,
    ENGLISH_LEVELS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
    SORT_VALUES,
    YEARS_EXPERIENCE,
} from './constants/constants';
import { styles } from './styles';

type CandidatesFilterFormProperties = {
    onSubmit: (dto: EmployeesFiltersForm) => void;
    onFilterClose: () => void;
};
const CandidatesFilterForm: React.FC<CandidatesFilterFormProperties> = ({
    onFilterClose,
    onSubmit,
}) => {
    const { control, reset, handleSubmit } = useAppForm<EmployeesFiltersForm>({
        defaultValues: DEFAULT_VALUES,
    });
    const { hardSkillsData } = useCommonData();
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
                name="isSearchActiveCandidatesOnly"
            >
                <Switch
                    name="searchType"
                    control={control}
                    label="Active searching talents only"
                />
            </FormField>
            <FormField
                label="Sort by"
                name="sortBy"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    control={control}
                    name="sortBy"
                    placeholder="Choose sort by value"
                    options={SORT_VALUES}
                />
            </FormField>
            <FormField
                label="Job title"
                name="jobTitle"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={JOB_TITLE_OPTIONS}
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
                    items={YEARS_EXPERIENCE}
                    control={control}
                    name="yearsOfExperience"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                containerStyle={globalStyles.pb25}
                label="Hard Skills"
                name="hardSkills"
            >
                <AutocompleteMultiSelector
                    items={hardSkillsData?.items}
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
                    items={BSA_PROJECTS}
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
                    items={LOCATION_OPTIONS}
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
                    options={ENGLISH_LEVELS}
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
                    options={EMPLOYMENT_TYPE_OPTIONS}
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
