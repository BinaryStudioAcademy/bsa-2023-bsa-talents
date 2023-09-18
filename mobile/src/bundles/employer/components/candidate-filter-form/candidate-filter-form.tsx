import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    AutocompleteMultiSelector,
    Button,
    CheckboxGroup,
    Divider,
    FormField,
    Pressable,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from '~/bundles/common/components/components';
import { Color, IconName } from '~/bundles/common/enums/enums';
import { TextCategory } from '~/bundles/common/enums/styles/styles';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/employer/enums/enums';
import { type EmployeesFiltersDto } from '~/bundles/employer/types/types';

import {
    BSA_BADGES,
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    ENGLISH_LEVEL,
    HARD_SKILLS,
    YEARS_EXPERIENCE,
} from './constants/constants';
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

type CandidatesFilterFormProperties = {
    onSubmit: (dto: EmployeesFiltersDto) => void;
    onFilterClose: () => void;
};
const CandidatesFilterForm: React.FC<CandidatesFilterFormProperties> = ({
    onFilterClose,
    onSubmit,
}) => {
    const { control, reset, handleSubmit } = useAppForm<EmployeesFiltersDto>({
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
                    <Icon
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
                name="activeTalentsOnly"
            >
                <Switch
                    name="activeTalentsOnly"
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
                name="experienceYears"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={YEARS_EXPERIENCE}
                    control={control}
                    name="experienceYears"
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
                name="BSACharacteristics"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={BSA_CHARACTERISTICS}
                    control={control}
                    name="BSACharacteristics"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="BSA badges"
                name="BSABadges"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    items={BSA_BADGES}
                    control={control}
                    name="BSABadges"
                    placeholder="Start typing and choose option"
                />
            </FormField>
            <FormField
                label="BSA project name"
                name="BSAProjectName"
                containerStyle={globalStyles.pb25}
            >
                <AutocompleteMultiSelector
                    placeholder="Start typing and choose option"
                    control={control}
                    name="BSAProjectName"
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
                name="employmentTypes"
                containerStyle={globalStyles.pb25}
            >
                <CheckboxGroup
                    control={control}
                    name="employmentTypes"
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
