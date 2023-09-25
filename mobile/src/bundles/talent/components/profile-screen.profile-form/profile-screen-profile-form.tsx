import React from 'react';

import { logout } from '~/bundles/auth/store/actions';
import {
    AutocompleteSelector,
    Button,
    CheckboxGroup,
    FormField,
    Input,
    Pressable,
    ScrollView,
    Selector,
    Slider,
    View,
} from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import {
    useAppDispatch,
    useAppForm,
    useState,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { EXPERIENCE_YEARS } from '~/bundles/talent/components/profile-form/constants/constants';
import { ProfileStepValidationRule } from '~/bundles/talent/enums/enums';
import { type ProfileStepDto } from '~/bundles/talent/types/types';
import { ProfileStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import {
    EMPLOYMENT_TYPE_OPTIONS,
    JOB_TITLE_OPTIONS,
    LOCATION_OPTIONS,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: ProfileStepDto) => void;
    userData: ProfileStepDto;
};

const ProfileScreenProfileForm: React.FC<Properties> = ({
    onSubmit,
    userData,
}) => {
    const [isEditable, setIsEditable] = useState(false);
    const dispatch = useAppDispatch();
    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: userData,
        validationSchema: ProfileStepValidationSchema,
    });

    const handleLogout = (): void => {
        void dispatch(logout());
    };

    const handleFormSubmit = (): void => {
        if (isEditable) {
            void handleSubmit((data) => {
                onSubmit({
                    ...data,
                    salaryExpectation: +data.salaryExpectation,
                });
            })();
            setIsEditable(false);
        }
    };

    const handleFormEdit = (): void => {
        setIsEditable(true);
    };

    const handleFormReset = (): void => {
        setIsEditable(false);
        reset(userData);
    };

    return (
        <ScrollView
            contentContainerStyle={[
                globalStyles.defaultScreenPadding,
                styles.container,
            ]}
            showsVerticalScrollIndicator={false}
        >
            <Pressable pointerEvents={isEditable ? 'auto' : 'none'}>
                <FormField
                    errorMessage={errors.profileName?.message}
                    label="Profile name"
                    name="profileName"
                    required={isEditable}
                    containerStyle={globalStyles.pb25}
                >
                    <Input control={control} name="profileName" />
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
                        keyboardType="numeric"
                        marker="$"
                        defaultValue={userData.salaryExpectation.toString()}
                        value={undefined}
                    />
                </FormField>
                <FormField
                    label="Job title"
                    name="jobTitle"
                    required={isEditable}
                    containerStyle={globalStyles.pb25}
                >
                    <Selector
                        options={JOB_TITLE_OPTIONS}
                        control={control}
                        name="jobTitle"
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
                    errorMessage={errors.description?.message}
                    label="Tell employers about your experience"
                    name="description"
                    required={isEditable}
                    containerStyle={globalStyles.pb25}
                >
                    <Input
                        control={control}
                        name="description"
                        numberOfLines={5}
                        multiline={true}
                    />
                </FormField>
                <FormField
                    label="Current location"
                    name="location"
                    required={isEditable}
                    containerStyle={globalStyles.pb25}
                >
                    <AutocompleteSelector
                        control={control}
                        name="location"
                        items={LOCATION_OPTIONS}
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
                        options={EMPLOYMENT_TYPE_OPTIONS}
                    />
                </FormField>
            </Pressable>

            <View style={globalStyles.flexDirectionRow}>
                <Button
                    label="Save"
                    style={globalStyles.mv10}
                    onPress={handleFormSubmit}
                />

                {isEditable ? (
                    <Button
                        label="Cancel"
                        onPress={handleFormReset}
                        buttonType={ButtonType.GHOST}
                    />
                ) : (
                    <Button
                        label="Edit"
                        onPress={handleFormEdit}
                        buttonType={ButtonType.GHOST}
                    />
                )}
            </View>
            <Button
                label="Logout"
                buttonType={ButtonType.OUTLINE}
                style={[globalStyles.mv10, styles.logout]}
                onPress={handleLogout}
            />
        </ScrollView>
    );
};

export { ProfileScreenProfileForm };
