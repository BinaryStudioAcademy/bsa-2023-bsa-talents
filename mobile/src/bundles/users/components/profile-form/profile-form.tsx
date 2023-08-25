import React from 'react';

import {
    Button,
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
        },
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <View
            style={{
                backgroundColor: '#FFFFFF',
                ...globalStyles.p10,
                ...globalStyles.flex1,
            }}
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
            <View style={globalStyles.flexDirectionRow}>
                <Button label="Back" disabled style={globalStyles.mr10} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </View>
    );
};

export { ProfileForm };
