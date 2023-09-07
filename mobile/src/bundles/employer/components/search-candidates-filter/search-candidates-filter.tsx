import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
    Button,
    Checkbox,
    FormField,
    Pressable,
    ScreenLineSeparator,
    ScrollView,
    Selector,
    Text,
    View,
} from '~/bundles/common/components/components';
import { Color, CountryList, IconName } from '~/bundles/common/enums/enums';
import { TextCategory } from '~/bundles/common/enums/styles/styles';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import {
    BSA_BADGES,
    BSA_CHARACTERISTICS,
    BSA_PROJECT,
    YEARS_EXPERIENCE,
} from '~/bundles/employer/components/search-candidates-filter/constants/constants';
import { JOB_TITLE_OPTIONS } from '~/bundles/talent/components/profile-form/constants/constants';

import { styles } from './styles';

type Properties = {
    onSubmit: (payload: unknown) => void;
};

const defaultValues = {
    activeTalentsOnly: true,
    jobTitle: '',
    englishLevel: '',
    experienceYears: '',
    employmentType: {
        fullTime: true,
        partTime: false,
        freelance: false,
        partTime2: false,
        remotely: false,
        relocation: false,
    },
};

const locationOptions = Object.values(CountryList).map((country) => ({
    value: country,
    label: country,
}));
const SearchCandidatesFilter: React.FC<Properties> = ({ onSubmit }) => {
    const { control, handleSubmit } = useAppForm({ defaultValues });
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
                    globalStyles.pt25,
                    globalStyles.ph25,
                    { backgroundColor: '#fff' },
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
                    />
                </Pressable>
            </View>
            <ScreenLineSeparator />
            <ScrollView
                style={[
                    globalStyles.defaultScreenPadding,
                    globalStyles.borderRadius10,
                    globalStyles.width100,
                    styles.container,
                ]}
            >
                <Checkbox
                    label="Active searching talents only"
                    name="activeTalentsOnly"
                    control={control}
                />
                <FormField
                    label="Job title"
                    name="jobTitle"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={JOB_TITLE_OPTIONS} />
                </FormField>
                <FormField
                    label="Years of experience"
                    name="experienceYears"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={YEARS_EXPERIENCE} />
                </FormField>
                <FormField
                    label="Hard Skills"
                    name="hardSkills"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={YEARS_EXPERIENCE} />
                </FormField>
                <FormField
                    label="BSA characteristics"
                    name="BSACharacteristics"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={BSA_CHARACTERISTICS} />
                </FormField>
                <FormField
                    label="BSA badges"
                    name="BSABadges"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={BSA_BADGES} />
                </FormField>
                <FormField
                    label="BSA project name"
                    name="BSAProjectName"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={BSA_PROJECT} />
                </FormField>
                <FormField
                    label="Location"
                    name="location"
                    containerStyle={globalStyles.pb25}
                >
                    <Selector options={locationOptions} />
                </FormField>
                <FormField
                    label="Location"
                    name="englishLevel"
                    containerStyle={globalStyles.pb25}
                >
                    <Checkbox
                        label="Relocation to another country"
                        name="englishLevel"
                        control={control}
                    />
                </FormField>

                <FormField
                    label="Employment type"
                    name="employmentType"
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
                            <Checkbox
                                label="Full time"
                                name="employmentType.fullTime"
                                control={control}
                            />
                            <Checkbox
                                label="Part-time"
                                name="employmentType.partTime"
                                control={control}
                            />
                            <Checkbox
                                label="Freelance (projects)"
                                name="employmentType.freelance"
                                control={control}
                            />
                        </View>
                        <View style={globalStyles.flex1}>
                            <Checkbox
                                label="Part-time 2"
                                name="employmentType.partTime2"
                                control={control}
                            />
                            <Checkbox
                                label="Remotely"
                                name="employmentType.remotely"
                                control={control}
                            />
                            <Checkbox
                                label="Relocation to another country"
                                name="employmentType.relocation"
                                control={control}
                            />
                        </View>
                    </View>
                </FormField>
                <Button
                    style={[globalStyles.mb25, globalStyles.pv15]}
                    label="Show results"
                    onPress={handleFormSubmit}
                />
            </ScrollView>
        </>
    );
};

export { SearchCandidatesFilter };
