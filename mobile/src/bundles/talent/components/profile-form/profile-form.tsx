import React from 'react';

import {
    AutocompleteSelector,
    CheckboxGroup,
    FormField,
    Input,
    ScrollView,
    Selector,
    Slider,
} from '~/bundles/common/components/components';
import {
    useAppForm,
    useCallback,
    useEffect,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { type ValueOf } from '~/bundles/common/types/types';
import {
    ProfileFormType,
    ProfileStepValidationRule,
} from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { profileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { OnboardingButtons, ProfileScreenButtons } from '../components';
import {
    EMPLOYMENT_TYPE_OPTIONS,
    EXPERIENCE_YEARS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
    TALENT_PROFILE_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    usersData: ProfileStepDto | null;
    onSubmit: (payload: ProfileStepDto) => void;
    formType: ValueOf<typeof ProfileFormType>;
    isFormEditable?: boolean;
};

const ProfileForm: React.FC<Properties> = ({
    usersData,
    onSubmit,
    formType,
    isFormEditable = true,
}) => {
    const [isEditable, setIsEditable] = useState(isFormEditable);

    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: usersData ?? TALENT_PROFILE_DEFAULT_VALUES,
        validationSchema: profileStepValidationSchema,
    });

    useEffect(() => {
        usersData && reset(usersData);
    }, [usersData, reset]);

    const handleFormSubmit = useCallback(() => {
        void handleSubmit((data) => {
            onSubmit({
                ...data,
                salaryExpectation: +data.salaryExpectation,
            });
        })();
    }, [handleSubmit, onSubmit]);

    const handleFormReset = (): void => {
        reset(usersData as ProfileStepDto);
        setIsEditable(false);
    };

    const handleFormEdit = (): void => {
        setIsEditable(true);
    };

    const isOnboardingScreen = formType === ProfileFormType.ONBOARDING;

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
                    defaultValue={usersData?.salaryExpectation.toString()}
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
                    options={JOB_TITLE_OPTIONS}
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
                    items={LOCATION_OPTIONS}
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
                    options={EMPLOYMENT_TYPE_OPTIONS}
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

            {isOnboardingScreen ? (
                <OnboardingButtons
                    currentStep={0}
                    onFormSubmit={handleFormSubmit}
                />
            ) : (
                <ProfileScreenButtons
                    onFormEdit={handleFormEdit}
                    isEditable={isEditable}
                    onFormReset={handleFormReset}
                    onFormSubmit={handleFormSubmit}
                />
            )}
        </ScrollView>
    );
};

export { ProfileForm };
