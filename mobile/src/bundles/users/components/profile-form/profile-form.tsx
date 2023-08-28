import React from 'react';

import {
    Button,
    Checkbox,
    FormField,
    Input,
    ScrollView,
    Selector,
    View,
} from '~/bundles/common/components/components';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import {
    CURRENT_LOCATION_OPTIONS,
    JOB_TITLE_OPTIONS,
    USER_PROFILE_DEFAULT_VALUES,
} from './constants/constants';
import { styles } from './styles';

type Properties = {
    onSubmit: () => void;
};

const ProfileForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: USER_PROFILE_DEFAULT_VALUES,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

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
                name="salaryExpectations"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="salaryExpectations"
                    placeholder="0000"
                    inputType="number"
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
                <Selector options={JOB_TITLE_OPTIONS} />
            </FormField>
            <FormField
                errors={errors}
                label="Current location"
                name="currentLocation"
                required
                containerStyle={globalStyles.pb25}
            >
                <Selector options={CURRENT_LOCATION_OPTIONS} />
            </FormField>
            <FormField
                errors={errors}
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
            <FormField
                errors={errors}
                label="Briefly tell employers about your experience"
                name="experience"
                required
                containerStyle={globalStyles.pb25}
            >
                <Input
                    control={control}
                    name="experience"
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
