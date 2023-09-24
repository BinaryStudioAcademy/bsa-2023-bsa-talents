import React from 'react';

import {
    Button,
    FormField,
    Loader,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import { DataStatus } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
} from '~/bundles/common/hooks/hooks';
import { globalStyles } from '~/bundles/common/styles/styles';
import { useCommonData } from '~/bundles/common-data/hooks/hooks';
import {
    BADGES_STEP_DEFAULT_VALUES,
    UNCONTROLLED_BADGES,
} from '~/bundles/talent/components/badges-form/constants/constants';
import { OnboardingBackButton } from '~/bundles/talent/components/components';
import {
    type BadgesFormDto,
    type BsaBadgesStepTypes,
} from '~/bundles/talent/types/types';
import { BsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { BadgesGroup } from './badges-group/badges-group';
import { styles } from './styles';

type Properties = {
    onSubmit: (payload: BsaBadgesStepTypes) => void;
    currentStep: number;
};

const BsaBadgesForm: React.FC<Properties> = ({ onSubmit, currentStep }) => {
    const { onboardingData } = useAppSelector(({ talents }) => talents);
    const { badgesData, dataStatus } = useCommonData();

    const onboardingDataValues: BadgesFormDto | undefined = useMemo(() => {
        if (onboardingData?.badges) {
            return { badges: onboardingData.badges };
        }
    }, [onboardingData]);

    const badgesDataValues: BadgesFormDto = useMemo(() => {
        if (badgesData?.items) {
            const badges = badgesData.items.map((badge) => ({
                ...badge,
                isChecked: UNCONTROLLED_BADGES.includes(badge.name),
            }));
            return { badges };
        }
        return BADGES_STEP_DEFAULT_VALUES;
    }, [badgesData]);

    const { control, errors, handleSubmit, reset } = useAppForm({
        defaultValues: BADGES_STEP_DEFAULT_VALUES,
        validationSchema: BsaBadgesStepValidationSchema,
    });

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    const isFullDataLoading = dataStatus === DataStatus.FULFILLED;
    const isDataLoading = dataStatus === DataStatus.PENDING;

    const badgesFormData: BadgesFormDto =
        onboardingDataValues ?? badgesDataValues;

    useEffect(() => {
        if (isFullDataLoading) {
            reset(badgesFormData);
        }
    }, [badgesFormData, isFullDataLoading, reset]);

    return (
        <ScrollView
            style={[globalStyles.ph25, styles.container]}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[globalStyles.pv15, styles.description]}>
                Choose BSA badges you want to show in your profile
            </Text>
            {isDataLoading ? (
                <Loader />
            ) : (
                <FormField
                    errorMessage={errors.badges?.message}
                    name="badges"
                    required
                    containerStyle={globalStyles.pb25}
                >
                    <BadgesGroup name="badges" control={control} />
                </FormField>
            )}

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
