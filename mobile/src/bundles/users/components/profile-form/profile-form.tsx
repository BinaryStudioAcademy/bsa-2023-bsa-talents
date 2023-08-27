import React from 'react';

import {
    Button,
    FlatList,
    FormField,
    Input,
    Selector,
    View,
} from '~/bundles/common/components/components';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

type Properties = {
    onSubmit: () => void;
};
const ProfileForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: {
            profileName: '',
            salaryExpectations: 0,
            jobTitle: '',
            currentLocation: '',
            experience: '',
        },
    });

    const jobTitleOptions = [
        { label: 'Job Title 1', value: 'job1' },
        { label: 'Job Title 2', value: 'job2' },
        { label: 'Job Title 3', value: 'job3' },
    ];

    const currentLocationOptions = [
        { label: 'Location 1', value: 'location1' },
        { label: 'Location 2', value: 'location2' },
        { label: 'Location 3', value: 'location3' },
    ];

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <FlatList
            contentContainerStyle={[
                globalStyles.p25,
                { backgroundColor: '#FFFFFF', flexGrow: 1 },
            ]}
            ListHeaderComponent={
                <>
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
                        <Selector options={jobTitleOptions} />
                    </FormField>
                    <FormField
                        errors={errors}
                        label="Current location"
                        name="currentLocation"
                        required
                        containerStyle={globalStyles.pb25}
                    >
                        <Selector options={currentLocationOptions} />
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
                </>
            }
            ListFooterComponent={
                <View style={globalStyles.flexDirectionRow}>
                    <Button label="Back" disabled style={globalStyles.mr10} />
                    <Button label="Next" onPress={handleFormSubmit} />
                </View>
            }
            data={[null]}
            renderItem={null}
            keyExtractor={(item, index): string => `form-field-${index}`}
        />
    );
};

export { ProfileForm };
