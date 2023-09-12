import { type NavigationProp } from '@react-navigation/native';
import React from 'react';

import {
    Button,
    FormField,
    ScrollView,
    Text,
    View,
} from '~/bundles/common/components/components';
import {
    ButtonType,
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
import { BADGES_STEP_DEFAULT_VALUES } from '~/bundles/talent/components/badge/constants/constants';
import { BsaBadgeStepBadgesTitle } from '~/bundles/talent/enums/enums';
import { type BsaBadgesStepDto } from '~/bundles/talent/types/types';
import { BsaBadgesStepValidationSchema } from '~/bundles/talent/validation-schemas/validation-schemas';

import { BadgesGroup } from './badges-group';
import { styles } from './styles';

type Properties = {
    badgesStepData: BsaBadgesStepDto | null;
    onSubmit: (payload: BsaBadgesStepDto) => void;
};

const BsaBadgesForm: React.FC<Properties> = ({ badgesStepData, onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm({
        defaultValues: badgesStepData ?? BADGES_STEP_DEFAULT_VALUES,
        validationSchema: BsaBadgesStepValidationSchema,
    });
    const { navigate } =
        useNavigation<
            NavigationProp<TalentOnboardingNavigationParameterList>
        >();

    const handlePreviousPress = useCallback((): void => {
        navigate(TalentOnboardingScreenName.PROFILE, {
            stepState: TalentOnboardingStepState.FOCUSED,
        });
    }, [navigate]);

    const handleFormSubmit = useCallback((): void => {
        void handleSubmit(onSubmit)();
    }, [handleSubmit, onSubmit]);

    const options = Object.values(BsaBadgeStepBadgesTitle);

    return (
        <ScrollView style={[globalStyles.ph25, styles.container]}>
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
                <Button
                    style={globalStyles.mr10}
                    label="Back"
                    buttonType={ButtonType.OUTLINE}
                    onPress={handlePreviousPress}
                />
                <Button label="Next" onPress={handleFormSubmit} />
            </View>
        </ScrollView>
    );
};

export { BsaBadgesForm };
