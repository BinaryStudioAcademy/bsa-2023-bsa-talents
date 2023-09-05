import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
    Button,
    FormField,
    Input,
    ScrollView,
    Selector,
    Slider,
    View,
} from '~/bundles/common/components/components';
import {
    TalentOnboardingScreenName,
    TalentOnboardingStepState,
} from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useNavigation,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type TalentOnboardingNavigationParameterList } from '~/bundles/common/types/types';
import {
    CountryList,
    EmploymentType,
    JobTitle,
} from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { ProfileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { EmploymentTypes } from './employment-types';
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

type Properties = {
    data: ProfileStepDto;
    onSubmit: (payload: ProfileStepDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ data, onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: data,
        validationSchema: ProfileStepValidationSchema,
    });

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            data.salaryExpectation = Number(data.salaryExpectation);
            onSubmit(data);

            navigate(TalentOnboardingScreenName.BSA_BADGES, {
                stepState: TalentOnboardingStepState.FOCUSED,
            });
        })();
    }, [handleSubmit, onSubmit, navigate]);

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
                <EmploymentTypes
                    control={control}
                    name="employmentTypes"
                    options={employmentTypeOptions}
                />
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
