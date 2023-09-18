import React from 'react';

import { BADGES_STEP_DEFAULT_VALUES } from '~/bundles/common/components/badge/constants/constants';
import {
    Button,
    FormField,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { OnboardingBackButton } from '~/bundles/talent/components/components';
import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';
import { BsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { BadgesGroup } from './badges-group';
import { styles } from './styles';

type Properties = {
    badgesStepData: BsaBadgesStepDto | null;
    onSubmit: (payload: BsaBadgesStepDto) => void;
    currentStep: number;
};

const options = Object.values(BsaBadgeStepBadgesTitle);

const BsaBadgesForm: React.FC<Properties> = ({
    badgesStepData,
    onSubmit,
    currentStep,
}) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: badgesStepData ?? BADGES_STEP_DEFAULT_VALUES,
        validationSchema: BsaBadgesStepValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    return (
        <ScrollView
            style={[globalStyles.ph25, styles.container]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[globalStyles.pv15, styles.description]}>
                Choose BSA badges you want to show in your profile
            </Text>
            <FormField
                errorMessage={errors.badges?.message}
                name="badges"
                required
                containerStyle={globalStyles.pb25}
            >
                <BadgesGroup
                    name="badges"
                    control={control}
                    options={options}
                />
            </FormField>
            <View
                style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.mt10,
                    globalStyles.mb25,
                ]}
            >
                <OnboardingBackButton currentStep={currentStep} />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { BsaBadgesForm };
