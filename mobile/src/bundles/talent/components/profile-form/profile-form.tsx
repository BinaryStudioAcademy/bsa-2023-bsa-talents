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

import { TALENT_PROFILE_DEFAULT_VALUES } from './constants/constants';
import { EmploymentTypes } from './employment-types';
import { styles } from './styles';

const jobTitleOptions = Object.values(JobTitle);
const locationOptions = Object.values(CountryList);
const employmentTypeOptions = Object.values(EmploymentType);

type Properties = {
    profileStepData: ProfileStepDto | null;
    onSubmit: (payload: ProfileStepDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ profileStepData, onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: profileStepData ?? TALENT_PROFILE_DEFAULT_VALUES,
        validationSchema: ProfileStepValidationSchema,
    });

    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            onSubmit({ ...data, salaryExpectation: +data.salaryExpectation });

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
                errorMessage={errors.location?.message}
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
                errorMessage={errors.employmentTypes?.message}
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
                errorMessage={errors.description?.message}
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
