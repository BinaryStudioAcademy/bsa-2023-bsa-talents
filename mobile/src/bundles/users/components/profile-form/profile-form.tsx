import React from 'react';
import { ScrollView } from 'react-native';

import {
    Button,
    CurrencyInput,
    FormField,
    Input,
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
        },
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            contentContainerStyle={[
                globalStyles.p25,
                { backgroundColor: '#FFFFFF', flexGrow: 1 },
            ]}
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
                <CurrencyInput
                    control={control}
                    name="salaryExpectations"
                    placeholder="0000"
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
