import React from 'react';

import { Button, Text, View } from '~/bundles/common/components/components';
import { TextCategory } from '~/bundles/common/enums/styles/styles';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';

import { styles } from './styles';

type Properties = {
    onSubmit: (payload: unknown) => void;
};

const defaultValues = {};

const SearchEmployerFilter: React.FC<Properties> = ({ onSubmit }) => {
    const { handleSubmit } = useAppForm({ defaultValues });
    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <View
            style={[
                globalStyles.defaultScreenPadding,
                globalStyles.justifyContentCenter,
                globalStyles.borderRadius10,
                globalStyles.width100,
                styles.container,
            ]}
        >
            <Text
                category={TextCategory.H4}
                style={[globalStyles.pb25, globalStyles.alignSelfCenter]}
            >
                Hi! Login to your Account
            </Text>
            <View style={styles.formWrapper}>
                <Button
                    style={[globalStyles.mb25, globalStyles.pv15]}
                    label="Show results"
                    onPress={handleFormSubmit}
                />
            </View>
        </View>
    );
};

export { SearchEmployerFilter };
