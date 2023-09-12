import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    AutocompleteMultiSelector,
    Button,
    FormCheckbox,
    FormField,
    Pressable,
    ScreenLineSeparator,
    ScrollView,
    Selector,
    Text,
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
import { CheckboxGroup } from '~/bundles/talent/components/checkbox-group/checkbox-group';

import {
    BSA_BADGES,
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    DEFAULT_VALUES,
    ENGLISH_LEVEL,
    YEARS_EXPERIENCE,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: unknown) => void;
    onFilterClose: () => void;
};

const jobTitleOptions = Object.values(JobTitle);
const locationOptions = Object.values(CountryList);
const employmentTypeOptions = Object.values(EmploymentType);

const SearchCandidatesFilter: React.FC<Properties> = ({
    onSubmit,
    onFilterClose,
}) => {
    const { control, handleSubmit } = useAppForm({
        defaultValues: DEFAULT_VALUES,
    });
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            style={[
                globalStyles.defaultScreenPadding,
                globalStyles.borderRadius10,
                globalStyles.width100,
                globalStyles.height100,
                styles.container,
            ]}
        >
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
                <Pressable>
                    <Icon
                        name={IconName.CLOSE}
                        size={25}
                        color={Color.PRIMARY}
                        onPress={onFilterClose}
                    />
                </Pressable>
            </View>
            <ScreenLineSeparator containerStyle={globalStyles.mb25} />
            <FormField
                containerStyle={globalStyles.pb25}
                name="activeTalentsOnly"
            >
                <FormCheckbox
                    label="Active searching talents only"
                    name="activeTalentsOnly"
                    control={control}
                />
            </FormField>
            <FormField
                label="Job title"
                name="jobTitle"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name={'jobTitle'}
                    options={jobTitleOptions}
                />
            </FormField>
            <FormField
                label="Years of experience"
                name="experienceYears"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name={'experienceYears'}
                    options={YEARS_EXPERIENCE}
                />
            </FormField>
            <FormField label="Hard Skills" name="hardSkills">
                <AutocompleteMultiSelector
                    items={jobTitleOptions}
                    control={control}
                    name="hardSkills"
                    placeholder="Start typing and select skills"
                />
            </FormField>
            <FormField
                label="BSA characteristics"
                name="BSACharacteristics"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name="BSACharacteristics"
                    options={BSA_CHARACTERISTICS}
                />
            </FormField>
            <FormField
                label="BSA badges"
                name="BSABadges"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name="BSABadges"
                    options={BSA_BADGES}
                />
            </FormField>
            <FormField
                label="BSA project name"
                name="BSAProjectName"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name="BSAProjectName"
                    options={BSA_PROJECT}
                />
            </FormField>
            <FormField
                label="Location"
                name="location"
                containerStyle={globalStyles.pb25}
            >
                <Selector
                    placeholder="Option"
                    control={control}
                    name="location"
                    options={locationOptions}
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
        </ScrollView>
    );
};

export { SearchCandidatesFilter };
